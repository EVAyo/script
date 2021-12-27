﻿using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using CefSharp;
using HtmlAgilityPack;
using Newtonsoft.Json;
using RestSharp;

namespace JdLoginTool.Wpf
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Browser.TitleChanged += Browser_TitleChanged;
            Browser.KeyUp += TryGetUserInputPhone;
            this.Loaded += (o, e) =>
            {
                Browser.Address = "m.jd.com";
            };

        }

        private async void TryGetUserInputPhone(object sender, KeyEventArgs e)
        {
            string script = "function get_phone(){\r\n" +
                            "return document.querySelector('#app>div>div:nth-child(3)>p:nth-child(1)>input').value;\r\n" +
                            "}\r\n" +
                            "get_phone();";
            await Browser.EvaluateScriptAsync(script).ContinueWith(new Action<Task<JavascriptResponse>>((respA) =>
            {
                var resp = respA.Result;    //respObj此时有两个属性: name、age
                dynamic respObj = resp.Result;
                PhoneNumber = (string)resp.Result;
            }));
        }
        public String PhoneNumber { get; set; }
        private void Browser_TitleChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            string ck = "";
            this.Browser.Dispatcher.Invoke(new Action(() =>
            {
                ICookieManager cm = Browser.WebBrowser.GetCookieManager();
                var visitor = new TaskCookieVisitor();
                cm.VisitAllCookies(visitor);
                var cks = visitor.Task.Result;

                foreach (var cookie in cks)
                {
                    Regex reg = new Regex(@"[\u4e00-\u9fa5]");
                    if (reg.IsMatch(cookie.Value))
                    {
                        if (cookie.Name == "pt_key" || cookie.Name == "pt_pin") ck = ck + $"{cookie.Name}={System.Web.HttpUtility.UrlEncode(cookie.Value)};";

                    }
                    else
                    {
                        if (cookie.Name == "pt_key" || cookie.Name == "pt_pin") ck = ck + $"{cookie.Name}={cookie.Value};";
                    }

                }

                if (ck.Contains("pt_key") && ck.Contains("pt_pin"))
                {
                    Clipboard.SetText(ck);
                    UploadToServer(ck);
                    UploadToQingLong(ck);
                    cm.DeleteCookies(".jd.com", "pt_key");
                    cm.DeleteCookies(".jd.com", "pt_pin");
                    Browser.Address = "m.jd.com";
                }
                //todo:检测当前页面内容,如果存在
            }));
        }

        private string qlToken = "";
        private void UploadToQingLong(string ck)
        {
            var qlUrl = ConfigurationManager.AppSettings["qlUrl"];
            if (string.IsNullOrWhiteSpace(qlUrl)) return;
            try
            {
                if (string.IsNullOrWhiteSpace(qlToken))
                {
                    GetQingLongToken();
                }
                if (string.IsNullOrWhiteSpace(qlToken))
                {
                    MessageBox.Show("登陆青龙失败:获取Token失败");
                    return;
                }
                var jck = JDCookie.parse(ck);
                var input = new InputWindow();
                string remarks = PhoneNumber ?? jck.ptPin;//正常应该就是手机号了,如果开发的有问题,拿错手机号会用ptPin
                input.Remarkers = remarks;
                if (input.ShowDialog() == true)
                {
                    remarks = input.Remarkers;
                }
                var client = new RestClient($"{qlUrl}/open/envs") { Timeout = -1 };
                var request = new RestRequest();
                request.AddHeader("Authorization", $"Bearer {qlToken}");
                request.AddHeader("Content-Type", "application/json");
                request.AddParameter("t", DateTimeOffset.Now.ToUnixTimeMilliseconds());
                var body = $"[{{\"name\":\"JD_COOKIE\",\"value\":\"{ck}\",\"remarks\":\"{remarks}\"}}]";
                if (CheckIsNewUser(qlUrl, ck, out var _eid))
                {
                    request.Method = Method.POST;
                }
                else
                {
                    body = $"{{\"name\":\"JD_COOKIE\",\"value\":\"{ck}\",\"remarks\":\"{remarks}\",\"_id\":\"{_eid}\"}}";
                    request.Method = Method.PUT; 
                }

                request.AddParameter("application/json", body, ParameterType.RequestBody);
                var response = client.Execute(request);
                Console.WriteLine(response.Content);
                MessageBox.Show(response.Content, "上传青龙成功(Cookie已复制到剪切板)");
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message, "上传青龙失败,Cookie已复制到剪切板,请自行添加处理");
            }
        }
        private bool CheckIsNewUser(string qlUrl, string ck, out string _eid)
        {
            var newCk = JDCookie.parse(ck);
            var client = new RestClient($"{qlUrl}/open/envs");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Authorization", $"Bearer {qlToken}");
            request.AddHeader("Content-Type", "application/json");
            var response = client.Execute(request);
            var result = JsonConvert.DeserializeObject<GetCookiesResult>(response.Content);
            if (result == null)
            {
                _eid = "";
                return true;
            }
            if (result.code != 200)
            {
                throw new Exception($"请求返回失败,代码:{result.code}");
            }
            if (result.data.Any(jck => JDCookie.parse(jck.value).ptPin == newCk.ptPin))
            {
                _eid = result.data.FirstOrDefault(jck => JDCookie.parse(jck.value).ptPin == newCk.ptPin)?._id;
                return false;
            }
            _eid = "";
            return true;
        }

        private void GetQingLongToken()
        {
            var qlUrl = ConfigurationManager.AppSettings["qlUrl"];
            var qlClientID = ConfigurationManager.AppSettings["qlClientID"];
            var qlClientSecret = ConfigurationManager.AppSettings["qlClientSecret"];
            var client = new RestClient($"{qlUrl}/open/auth/token?client_id={qlClientID}&client_secret={qlClientSecret}");
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            IRestResponse response = client.Execute(request);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                var result = JsonConvert.DeserializeObject<QLTokenResult>(response.Content);
                qlToken = result.data.token;
                //todo:保存 qlToken,下次运行先拿,并判断是否过期,过期删除,重新获取,后面再实现,目前应用场景影响不大.
            }
        }

        private static void UploadToServer(string ck)
        {
            var upload = ConfigurationManager.AppSettings["upload"] == "true";
            var ckServer = ConfigurationManager.AppSettings["server"];
            if (upload && !string.IsNullOrWhiteSpace(ckServer))
            {
                var method = ConfigurationManager.AppSettings["method"];
                try
                {
                    var client = new RestClient(ckServer + ck)
                    {
                        Timeout = -1
                    };
                    var request = new RestRequest(method == "post" ? Method.POST : Method.GET);
                    var response = client.Execute(request);
                    Console.WriteLine(response.Content);
                    MessageBox.Show(ck, "Cookie已上传服务器");
                }
                catch (Exception e)
                {
                    MessageBox.Show(e.Message);
                }
            }
        }
    }

    public class QLTokenResult
    {
        public int code { get; set; }
        public Data data { get; set; }
    }

    public class Data
    {
        public string token { get; set; }
        public string token_type { get; set; }
        public int expiration { get; set; }
    }
    public class JDCookie
    {
        public String ptPin { get; set; }
        public String ptKey { get; set; }

        public static JDCookie parse(String ck)
        {
            JDCookie jdCookie = new JDCookie();
            try
            {

                String[] split = ck.Split(";");
                foreach (var s in split)
                {
                    if (s.StartsWith("pt_key"))
                    {
                        jdCookie.ptKey = (s.Split("=")[1]);
                    }
                    if (s.StartsWith("pt_pin"))
                    {
                        jdCookie.ptPin = (s.Split("=")[1]);
                    }
                }
                return jdCookie;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                jdCookie = new JDCookie();
            }
            return jdCookie;
        }


        public override String ToString()
        {
            return "pt_key=" + ptKey + ";pt_pin=" + ptPin + ";";
        }
    }

    public class GetCookiesResult
    {
        public int code { get; set; }
        public Datum[] data { get; set; }
    }






    public class Datum
    {
        public string value { get; set; }
        public string _id { get; set; }
        public long created { get; set; }
        public int status { get; set; }
        public string timestamp { get; set; }
        public float position { get; set; }
        public string name { get; set; }
        public string remarks { get; set; }
    }

}
