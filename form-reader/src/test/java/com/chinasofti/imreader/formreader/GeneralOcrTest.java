package com.chinasofti.imreader.formreader;

import com.chinasofti.imreader.formreader.service.TencentOcr;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultHandler;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.InputStream;

import static org.hamcrest.CoreMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest()
@ActiveProfiles("token01")
public class GeneralOcrTest {
    @Autowired
    TencentOcr tencentOcr;
    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .build();
    }

    @Test
    public void postImageTest() throws Exception {
        InputStream inputStream = this.getClass().getResourceAsStream("/test02.jpg");
        MockMultipartFile firstFile = new MockMultipartFile("file", "test02.jpg", "image/jpeg", inputStream);

        mockMvc.perform(MockMvcRequestBuilders.fileUpload("/imreader/api/v0.1/image")
                .file(firstFile))
                .andExpect(status().is(200))
                .andDo(new ResultHandler() {
                    @Override
                    public void handle(MvcResult mvcResult) throws Exception {
                        String text = mvcResult.getResponse().getContentAsString();
                        JSONObject object = new JSONObject(text);
                        int code = object.getInt("code");
                        if (code != 0) {
                            throw new Exception(object.getString("message"));
                        }

                        JSONArray array = object.getJSONObject("data").getJSONArray("items");
                        for (int i = 0; i < array.length(); i++) {
                            JSONObject obj = array.getJSONObject(i);
                            String itemstring = obj.getString("itemstring");
                            System.out.println(itemstring);
                        }

                    }
                })
        ;
    }

}
