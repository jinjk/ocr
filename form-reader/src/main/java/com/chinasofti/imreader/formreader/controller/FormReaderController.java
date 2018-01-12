package com.chinasofti.imreader.formreader.controller;

import com.chinasofti.imreader.formreader.service.TencentOcr;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController()
@RequestMapping(value = "/imreader/api/v0.1/image", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class FormReaderController {

    @Autowired
    TencentOcr tencentOcr;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public @ResponseBody
    String uploadImage(@RequestParam("image") MultipartFile uploadfile, @RequestParam("api") String api) throws Exception {
        return recognizeText(uploadfile, api);
    }

    @RequestMapping(value = "/sample/{id}", method = RequestMethod.GET)
    public @ResponseBody
    String readSample(@PathVariable("id") String id, @RequestParam("api") String api) throws Exception {
        String text = tencentOcr.testSample(id, api);
        JSONObject object = new JSONObject(text);
        JSONObject wrapper = new JSONObject();
        wrapper.put("imageUrl", "/" + id + ".png");
        wrapper.put("ocr", object);
        return wrapper.toString();
    }

    //save file
    private String recognizeText(MultipartFile file, String api) throws Exception {
        byte[] bytes = file.getBytes();
        String text = tencentOcr.sendGeneralTextImage(bytes, file.getContentType(), file.getOriginalFilename(), api);
        return text;
    }
}
