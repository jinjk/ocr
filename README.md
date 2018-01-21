# ocr
### 项目结构
表单识别分为两个部分[web server](form-reader)和[web client](imreader-client)

#### web server
服务器部分是一个spring boot web app，它基本上是一个腾讯ocr api的代理，通过调用腾讯ocr api来识别图片并返回数据给客户端
主要的配置信息都保存在[application.yml](form-reader/src/main/resources/application.yml)
```
tencent.ocr:
# ocr api url
  url: http://recognition.image.myqcloud.com/ocr
# tencent project id
  projectId: 1255863570
# tencent appid
  appId: 1255863570
# tencent bucket for image api
  bucket: formreader
# your secretId for this project on tencent cloud
  secretId: AKID0yplW9BP5oZOHF7y8A1rX6VikcWMB1qT
# secretKey
  secretKey: c2KRN7f1DD2f9Xky4ziIgw46xeAVfeS5
# api relative path for general ocr
  generalOcrAPi: /general
# api relative path for handwriting ocr
  handwritingApi: /handwriting
```
api配置的更多信息请参考
- [OCR鉴权](https://cloud.tencent.com/document/product/641/12409)
- [OCR计费](https://cloud.tencent.com/document/product/641/12399)

### web client
客户端我们采用了anguar 4.0框架并结合了jquery和bootstrap，其中大部分前端功能集中在了[ImageViewerComponent](imreader-client/src/app/image-viewer)里
#### 前端视图结构
- [form-viewer](imreader-client/src/app/form-viewer)
  form-viewer提供了上传图片并返回识别结果的功能
- [sample](imreader-client/src/app/sample)
  sample component用来显示上传好的sample数据展示
form-viewer和sample都是用image-viewer来时展示识别结果的，所以他们都包含了image-viewer component.
