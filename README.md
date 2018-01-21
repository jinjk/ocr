# ocr
### 项目结构
表单识别分为两个部分[web server](form-reader)和[web client](imreader-client)

#### web server
服务器部分是一个spring boot web app，它基本上是一个腾讯ocr api的代理，通过调用腾讯ocr api来识别图片并返回数据给客户端
主要的配置信息都保存在[application.yml](form-reader/src/main/resources/application.yml)
```
tencent.ocr:
  url: http://recognition.image.myqcloud.com/ocr
  projectId: 1255863570
  appId: 1255863570
  bucket: formreader
  secretId: AKID0yplW9BP5oZOHF7y8A1rX6VikcWMB1qT
  secretKey: c2KRN7f1DD2f9Xky4ziIgw46xeAVfeS5
  generalOcrAPi: /general
  handwritingApi: /handwriting
```
