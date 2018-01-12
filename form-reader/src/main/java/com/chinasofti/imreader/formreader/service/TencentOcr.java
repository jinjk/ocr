package com.chinasofti.imreader.formreader.service;

import com.chinasofti.imreader.formreader.WebConfig;
import com.google.common.io.ByteStreams;
import com.qcloud.image.sign.Credentials;
import com.qcloud.image.sign.Sign;
import org.apache.http.HttpHeaders;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.*;
import java.nio.file.Paths;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Service
public class TencentOcr {
    Logger logger = LoggerFactory.getLogger(TencentOcr.class);
    @Autowired
    WebConfig config;

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
    @Value("${tencent.ocr.handwritingApi}")
    private String handwritingApi;
    private String sampleDir;

    private Credentials credentials = null;

    @PostConstruct
    public void init() {
        credentials = new Credentials(appId, secretId, secretKey);
        sampleDir = config.getExtResouceDir();
    }

    public String sendGeneralTextImage(byte[] bytes, String mimeType, String fileName, String api) throws Exception {
        if (api == null) {
            api = generalOcrAPi;
        }
        else {
            api = "/" + api;
        }
        String auth = Sign.appSign(credentials, bucket, Duration.ofMinutes(30).getSeconds());

        org.apache.http.HttpEntity entity = MultipartEntityBuilder.create()
                .setMode(HttpMultipartMode.BROWSER_COMPATIBLE)
                .addTextBody("appid", String.valueOf(appId))
                .addTextBody("bucket", bucket)
                .addBinaryBody("image", bytes, ContentType.create(mimeType), fileName)
                .build();

        logger.info("Request API URL: {}", ocrUrl + api);
        long begin = System.currentTimeMillis();
        String text = Request.Post(ocrUrl + api)
                .setHeader(HttpHeaders.AUTHORIZATION, auth)
                .body(entity)
                .execute().returnContent().asString();
        logger.info("API {} Time consuming: {} s", api, TimeUnit.MILLISECONDS.toSeconds(System.currentTimeMillis() - begin));

        return text;
    }


    public String testSample(String id, String api) throws Exception {
        File f = Paths.get(sampleDir, id + ".png").toFile();
        InputStream input = new FileInputStream(f);
        byte[] bytes = ByteStreams.toByteArray(input);
        input.close();
        return sendGeneralTextImage(bytes, "image/png", id + ".png", api);
    }
}
