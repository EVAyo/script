[![Build Status](https://drone2.scjtqs.com:8443/api/badges/scjtqs/jd_cookie/status.svg)](https://drone2.scjtqs.com:8443/scjtqs/jd_cookie)
# 说明
京东的cookie 本地提取工具(小白专用) 

双击exe文件，运行服务，后用本地的浏览器打开 http://127.0.0.1:29099

来辅助提取你的cookie

## 编译方法
```bash
#安装编译工具，用于打包html到二进制
go get -u github.com/gobuffalo/packr/v2/packr2
#build和go build一样，交叉编译的方式也是一样的
CGO_ENABLED=0 GOOS=linux GOARCH=arm packr2 build  -o jdcookie
#简单点的
packr2 build  -o jdcookie
# 编译windows x86版本
CGO_ENABLED=0 GOOS=windows GOARCH=386 packr2 build  -o jdcookie_windows_x86.exe
# 编译windows x64版本
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 packr2 build  -o jdcookie_windows_x64.exe
# 编译mac arm64 (m1)版本
CGO_ENABLED=0 GOOS=darwin GOARCH=arm64 packr2 build  -o jdcookie_darwin_arm64
# 编译mac amd64 x64版本
CGO_ENABLED=0 GOOS=darwin GOARCH=amd64 packr2 build  -o jdcookie_darwin_x64
```