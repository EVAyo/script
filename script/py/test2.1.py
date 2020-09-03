from __future__ import print_function

import json,re
import sys
import errno
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from argparse import ArgumentParser
from argparse import RawTextHelpFormatter
from base64 import b64decode
from random import choice
from json import loads
from time import sleep
from glob import glob
import os, pickle

SCOPES = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/cloud-platform','https://www.googleapis.com/auth/iam']
project_create_ops = []
current_key_dump = []
sleep_time = 30

class G:
    n = 1      # 项目变量
    x = 1      # 邮箱变量
    pp = None  # 项目前缀
    sp = None  # sa邮箱前缀
    sq = 100   # 项目中sa个数

# 在项目中创建计数SA
def _create_accounts(service,project,count):
    batch = service.new_batch_http_request(callback=_def_batch_resp)
    for i in range(count):
        aid = _x_id()
        batch.add(service.projects().serviceAccounts().create(name='projects/' + project, body={ 'accountId': aid, 'serviceAccount': { 'displayName': aid }})) 
        sleep(sleep_time/100)
    batch.execute()

# 创建填充项目所需的帐户
def _create_remaining_accounts(iam,project):
    print('在%s中创建帐户' % project)
    sa_count = len(_list_sas(iam,project))
    _create_accounts(iam,project,G.sq - sa_count)

# 生成项目id序号
def _generate_id():
    G.n += 1
    return G.pp + ''.join(str(G.n))

# 邮箱序号  
def _x_id():
    G.x += 1
    return G.sp + str(G.x)

# 随机序号
def _rand_id(prefix='saf-'):
    chars = '-abcdefghijklmnopqrstuvwxyz1234567890'
    return prefix + ''.join(choice(chars) for _ in range(25)) + choice(chars[1:])

# 列出使用服务的项目
def _get_projects(service):
    return [i['projectId'] for i in service.projects().list().execute()['projects']]

# 默认批处理回调处理程序
def _def_batch_resp(id,resp,exception):
    if exception is not None:
        if str(exception).startswith('<HttpError 429'):
            sleep(sleep_time/100)
        else:
            print(str(exception))

# 项目创建批处理程序
def _pc_resp(id,resp,exception):
    global project_create_ops
    if exception is not None:
        print(str(exception))
    else:
        for i in resp.values():
            project_create_ops.append(i)

# 项目创建
def _create_projects(cloud,count):
    global project_create_ops
    batch = cloud.new_batch_http_request(callback=_pc_resp)
    new_projs = []
    for i in range(count):
        if G.pp is None:
            new_proj = _rand_id()
        else:
            new_proj = _generate_id()
        new_projs.append(new_proj)
        batch.add(cloud.projects().create(body={'project_id':new_proj}))
    batch.execute()

    for i in project_create_ops:
        while True:
            resp = cloud.operations().get(name=i).execute()
            if 'done' in resp and resp['done']:
                break
            sleep(3)
    return new_projs

# 为项目中的项目启用Ste服务
def _enable_services(service,projects,ste):
    batch = service.new_batch_http_request(callback=_def_batch_resp)
    for i in projects:
        for j in ste:
            batch.add(service.services().enable(name='projects/%s/services/%s' % (i,j)))
    batch.execute()

# 列出项目中的SA
def _list_sas(iam,project):
    resp = iam.projects().serviceAccounts().list(name='projects/' + project,pageSize=G.sq).execute()
    if 'accounts' in resp:
        return resp['accounts']
    return []
    
# 创建密钥批处理程序
def _batch_keys_resp(id,resp,exception):
    global current_key_dump
    if exception is not None:
        current_key_dump = None
        sleep(sleep_time/100)
    elif current_key_dump is None:
        sleep(sleep_time/100)
    else:
        current_key_dump.append((
            resp['name'][resp['name'].rfind('/'):],
            b64decode(resp['privateKeyData']).decode('utf-8')
        ))

# 创建密钥
def _create_sa_keys(iam,projects,path,naming_rules):
    global current_key_dump
    for i in projects:
        
        if args.download_keys in ['~','*']:
            c = G.sq
        else:     
            c = len(_list_sas(iam,args.download_keys))
        if args.sa_quantity == 101:
            down_count = c
        elif G.sq > c:
            print('%s 中有 %s 个sa\n输入的 --sa-quantity 参数值大于 %s 中的sa数量。'%(args.download_keys,c,args.download_keys))
            while G.sq > c:
                G.sq = int(input('请重新输入'))
            down_count = G.sq
        else:
            down_count = G.sq
            
        global current_key_dump    
        current_key_dump = []
        print('从 %s 下载密钥' % i)
        while current_key_dump is None or len(current_key_dump) < down_count:
            batch = iam.new_batch_http_request(callback=_batch_keys_resp)
            total_sas = _list_sas(iam,i)
            for j in total_sas:
                batch.add(iam.projects().serviceAccounts().keys().create(
                    name='projects/%s/serviceAccounts/%s' % (i,j['uniqueId']),
                    body={
                        'privateKeyType':'TYPE_GOOGLE_CREDENTIALS_FILE',
                        'keyAlgorithm':'KEY_ALG_RSA_2048'
                    }
                ))
            batch.execute()
            if current_key_dump is None:
                print('从 %s 重新下载密钥' % i)
                current_key_dump = []
            else:
                for j in current_key_dump:
                    
                    client_email_sa = json.loads(list(j)[1])['client_email']
                    client_email_sa_prefix = ''.join(re.findall(re.compile(r'(.*)[@]'),json.loads(list(j)[1])['client_email']))
                    project_id_sa = json.loads(list(j)[1])['project_id']
                    
                    if naming_rules == 1:
                        json_name = client_email_sa
                    elif naming_rules == 2:
                        json_name = client_email_sa_prefix
                    elif naming_rules == 3:
                        name_list = []
                        name_list.append(project_id_sa)
                        name_list.append(client_email_sa_prefix)
                        json_name = '-'.join(name_list)
                        
                    with open('%s/%s.json' % (path,json_name),'w+') as f:
                        f.write(j[1])

# 删除服务帐户
def _delete_sas(iam,project):
    sas = _list_sas(iam,project)
    batch = iam.new_batch_http_request(callback=_def_batch_resp)
    for i in sas:
        batch.add(iam.projects().serviceAccounts().delete(name=i['name']))
    batch.execute()

# 服务账号工厂
def serviceaccountfactory(
    credentials='credentials.json',
    token='token.pickle',
    path=None,
    list_projects=False,
    list_sas=None,
    create_projects=None,
    max_projects=200,
    enable_services=None,
    services=['iam','drive'],
    create_sas=None,
    delete_sas=None,
    download_keys=None,
    naming_rules=None,
    delete_allsa=False
    ):
    selected_projects = []
    proj_id = loads(open(credentials,'r').read())['installed']['project_id']
    creds = None
    if os.path.exists(token):
        with open(token, 'rb') as t:
            creds = pickle.load(t)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(credentials, SCOPES)

            # creds = flow.run_local_server(port=0)
            creds = flow.run_console()

        with open(token, 'wb') as t:
            pickle.dump(creds, t)

    cloud = build('cloudresourcemanager', 'v1', credentials=creds)
    iam = build('iam', 'v1', credentials=creds)
    serviceusage = build('serviceusage','v1',credentials=creds)

    projs = None
    while projs == None:
        try:
            projs = _get_projects(cloud)
        except HttpError as e:
            if loads(e.content.decode('utf-8'))['error']['status'] == 'PERMISSION_DENIED':
                try:
                    serviceusage.services().enable(name='projects/%s/services/cloudresourcemanager.googleapis.com' % proj_id).execute()
                except HttpError as e:
                    print(e._get_reason())
                    input('按Enter重试。')
    if list_projects:
        return _get_projects(cloud)
    if list_sas:
        return _list_sas(iam,list_sas)
    if create_projects:
        print("创建项目: {}".format(create_projects))
        if create_projects > 0:
            current_count = len(_get_projects(cloud))
            if current_count + create_projects <= max_projects:
                print('创建 %d 个项目' % (create_projects))
                nprjs = _create_projects(cloud, create_projects)
                selected_projects = nprjs
            else:
                sys.exit('No, 您无法创建 %d 个新项目.\n'
                      '请减少 --quick-setup 的值。\n'
                      '请记住，您可以完全创建 %d 个项目（已经有 %d 个）。\n'
                      '除非您知道自己在做什么，否则请不要删除现有项目' % (create_projects, max_projects, current_count))
        else:
            print('将覆盖现有项目中的所有服务帐户.\n'
                  '因此，请确保您已经有一些项目。')
            input("按Enter继续...")

    if delete_allsa:
        print('注意这会删除所有项目中的sa')
        input('按Enter继续......')
        projest_list = _get_projects(cloud)
        print('共计 %s 个项目' % len(projest_list))
        for p in projest_list:
            print('删除 %s 中的服务帐户' % p)
            _delete_sas(iam,p)
        sys.exit('删除 sa 完成')
    
    if enable_services:
        ste = []
        ste.append(enable_services)
        if enable_services == '~':
            ste = selected_projects
        elif enable_services == '*':
            ste = _get_projects(cloud)
        services = [i + '.googleapis.com' for i in services]
        print('启用服务')
        _enable_services(serviceusage,ste,services)
    if create_sas:
        stc = []
        stc.append(create_sas)
        if create_sas == '~':
            stc = selected_projects
        elif create_sas == '*':
            stc =  _get_projects(cloud)
        for i in stc:
            _create_remaining_accounts(iam,i)
    
    if download_keys:
        try:
            os.mkdir(path)
        except OSError as e:
            if e.errno == errno.EEXIST:
                pass
            else:
                raise
        std = []
        std.append(download_keys)
        if download_keys == '~':
            std = selected_projects
        elif download_keys == '*':
            std = _get_projects(cloud)
        _create_sa_keys(iam,std,path,naming_rules)
    if delete_sas:
        std = []
        std.append(delete_sas)
        if delete_sas == '~':
            std = selected_projects
        elif delete_sas == '*':
            std = _get_projects(cloud)
        for i in std:
            print('删除 %s 中的服务帐户' % i)
            _delete_sas(iam,i)

if __name__ == '__main__':
    parse = ArgumentParser(description='创建Google服务帐户的工具。',formatter_class=RawTextHelpFormatter)
    parse.add_argument('--create-projects', default=None,  type=int,          help='\n最多创建N个项目。\n\n')
    parse.add_argument('--create-sas',      default=None,                     help='\n在项目中创建服务帐户。\n\n')
    parse.add_argument('--credentials',     default='credentials.json',       help='\n指定凭证文件路径。\n\n')
    parse.add_argument('--delete-sas',      default=None,                     help='\n删除项目中的服务帐户。')
    parse.add_argument('--delete-allsa',    default=False,action='store_true',help='\n删除所有项目的sa\n')
    parse.add_argument('--download-keys',   default=None,                     help='\n下载项目中所有服务帐户的密钥。\n\n')
    parse.add_argument('--enable-services', default=None,                     help='\n在项目上启用服务。 默认：IAM 和 Drive\n\n')
    parse.add_argument('--list-projects',   default=False,action='store_true',help='\n列出用户可见的项目。\n\n')
    parse.add_argument('--list-sas',        default=False,                    help='\n列出项目中的服务帐户。\n\n')
    parse.add_argument('--max-projects',    default=200,   type=int,          help='\n允许的最大项目量。默认值:200\n\n')
    parse.add_argument('--new-only',        default=False,action='store_true',help='\n不使用现有项目。\n\n')
    parse.add_argument('--path','-p',       default='accounts',               help='\n指定备用目录，以输出所述证书的文件。\n\n')
    parse.add_argument('--project-prefix',  default=None,  type=str,          help='\n批量建项目时的项目前缀，如:\nsa-xiangmu1,1前的为前缀。\n项目 ID 可以包含小写字母、数字或连字符，必须以小写字母开头并以字母或数字结尾。\n6-30字符之间\n使用前缀前请确保前缀能用，不是别人使用过的\n如不确定，请自行去API创建一个项目点修改项目ID，确定\n\n')
    parse.add_argument('--quick-setup',     default=None,  type=int,          help='\n创建项目，启用服务，创建服务帐户和下载密钥。\n\n')
    parse.add_argument('--sa-quantity',     default=101,    type=int,         help='\n每个项目中要创建的sa个数。同时可用于指定下载数量。默认：100\n\n')
    parse.add_argument('--sa-prefix',       default='sauser',  type=str,      help='\nsa邮箱前缀\n服务帐号ID的长度必须介于6和30个字符之间。\n服务帐号 ID 必须以小写字母开头，后跟一个或多个小写字母数字字符（可使用连字符分隔\n默认：sauser\n\n')
    parse.add_argument('--services',        default=['iam','drive'],nargs='+',help='\n指定要启用的另一组服务。 覆盖默认值。\n\n')
    parse.add_argument('--token',           default='token.pickle',           help='\n指定pickle令牌文件路径。\n\n')
    parse.add_argument('-n',                default=1,     type=int,          help='\n项目序号。默认：1\n\n')
    parse.add_argument('-x',                default=1,     type=int,          help='\n邮箱序号。默认：1\n\n')
    parse.add_argument('--email-name',      default=1,     type=int,          help='\n下载sa时json文件命名方式。默认：1 \(按邮箱命名\)\n1 邮箱\n2 邮箱前缀\(慎选\)\n3 项目-邮箱前缀\n\n')
    args = parse.parse_args()
    
    # 如果凭据文件无效，请搜索一个。
    G.x = args.x - 1
    G.n = args.n - 1
    G.pp = args.project_prefix
    G.sp = args.sa_prefix
    if args.sa_quantity==101:
        G.sq = args.sa_quantity - 1
    else:
        G.sq = args.sa_quantity
    
    if not os.path.exists(args.credentials):
        options = glob('*.json')
        print('找不到凭证 %s.请启用云端硬盘API:\n'
              'https://developers.google.com/drive/api/v3/quickstart/python\n'
              '并将json文件另存为certificate.json' % args.credentials)
        if len(options) < 1:
            exit(-1)
        else:
            i = 0
            print('在下面选择一个凭证文件。')
            inp_options = [str(i) for i in list(range(1,len(options) + 1))] + options
            while i < len(options):
                print('  %d) %s' % (i + 1,options[i]))
                i += 1
            inp = None
            while True:
                inp = input('> ')
                if inp in inp_options:
                    break
            if inp in options:
                args.credentials = inp
            else:
                args.credentials = options[int(inp) - 1]
            print('下次使用 --credentials %s 来使用此凭据文件。' % args.credentials)
    if args.quick_setup:
        if args.project_prefix is not None:
            opt = '*'
            if args.new_only:
                opt = '~'
            args.services = ['iam','drive']
            args.create_projects = args.quick_setup
            args.enable_services = opt
            args.create_sas = opt
            args.download_keys = opt
        else:
            print('没有 --project-prefix 参数，将启用随机项目名模式')
            input('按Enter继续...')
            opt = '*'
            if args.new_only:
                opt = '~'
            args.services = ['iam','drive']
            args.create_projects = args.quick_setup
            args.enable_services = opt
            args.create_sas = opt
            args.download_keys = opt
    resp = serviceaccountfactory(
        path=args.path,
        token=args.token,
        credentials=args.credentials,
        list_projects=args.list_projects,
        list_sas=args.list_sas,
        create_projects=args.create_projects,
        max_projects=args.max_projects,
        create_sas=args.create_sas,
        delete_sas=args.delete_sas,
        enable_services=args.enable_services,
        services=args.services,
        download_keys=args.download_keys,
        naming_rules=args.email_name,
        delete_allsa=args.delete_allsa
    )
    if resp is not None:
        if args.list_projects:
            if resp:
                print('项目 (%d):' % len(resp))
                for i in resp:
                    print('  ' + i)
            else:
                print('没有项目.')
        elif args.list_sas:
            if resp:
                print('服务帐户在 %s (%d):' % (args.list_sas,len(resp)))
                for i in resp:
                    print('  %s (%s)' % (i['email'],i['uniqueId']))
            else:
                print('没有服务帐户.')
