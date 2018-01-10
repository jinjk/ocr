package com.chinasofti.imreader.formreader.service;

import com.qcloud.image.sign.Credentials;
import com.qcloud.image.sign.Sign;
import org.apache.http.HttpHeaders;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.nio.charset.Charset;
import java.time.Duration;

@Service
public class TencentOcr {
    Logger logger = LoggerFactory.getLogger(TencentOcr.class);
    @Value("${tencent.ocr.url}")
    private String ocrUrl;
    @Value("${tencent.ocr.projectId}")
    private long projectId;
    @Value("${tencent.ocr.appId}")
    private int appId;
    @Value("${tencent.ocr.bucket}")
    private String bucket;
    @Value("${tencent.ocr.secretId}")
    private String secretId;
    @Value("${tencent.ocr.secretKey}")
    private String secretKey;
    @Value("${tencent.ocr.generalOcrAPi}")
    private String generalOcrAPi;

    private Credentials credentials = null;

    @PostConstruct
    public void init() {
        credentials = new Credentials(appId, secretId, secretKey);
    }

    public String sendGeneralTextImage(byte[] bytes, String mimeType, String fileName) throws Exception {

        String auth = Sign.appSign(credentials, bucket, Duration.ofMinutes(30).getSeconds());

        org.apache.http.HttpEntity entity = MultipartEntityBuilder.create()
                .setMode(HttpMultipartMode.BROWSER_COMPATIBLE)
                .addTextBody("appid", String.valueOf(appId))
                .addTextBody("bucket", bucket)
                .addBinaryBody("image", bytes, ContentType.create(mimeType), fileName)
                .build();

        String text = Request.Post(ocrUrl + generalOcrAPi)
                .setHeader(HttpHeaders.AUTHORIZATION, auth)
                .body(entity)
                .execute().returnContent().asString();


        return text;
    }


    public String test() throws Exception {
        String body = "{\n" +
                "  \"appid\":\"" + appId + "\",\n" +
                "  \"bucket\":\"" + bucket + "\",\n" +
                "  \"url\":\"http://formreader-1255863570.cos.ap-shanghai.myqcloud.com/test.png\"\n" +
                "  }";

        String auth = Sign.appSign(credentials, bucket, Duration.ofMinutes(30).getSeconds());


        String text = Request.Post(ocrUrl + generalOcrAPi)
                .setHeader(HttpHeaders.AUTHORIZATION, auth)
                .bodyString(body, ContentType.APPLICATION_JSON)
                .execute().returnContent().asString();
        return text;
    }
}
