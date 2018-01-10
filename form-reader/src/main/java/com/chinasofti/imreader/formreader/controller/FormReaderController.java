package com.chinasofti.imreader.formreader.controller;

import com.chinasofti.imreader.formreader.service.TencentOcr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController()
@RequestMapping("/imreader/api/v0.1/image")
public class FormReaderController {

    @Autowired
    TencentOcr tencentOcr;

    @RequestMapping(value = "", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public @ResponseBody
    String uploadImage(@RequestParam("image") MultipartFile uploadfile) throws Exception {
        return recognizeText(uploadfile);
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public @ResponseBody
    String test() throws Exception {
        return tencentOcr.test();
    }

    //save file
    private String recognizeText(MultipartFile file) throws Exception {
        byte[] bytes = file.getBytes();
        String text = tencentOcr.sendGeneralTextImage(bytes, file.getContentType(), file.getOriginalFilename());
        return text;
    }
}
