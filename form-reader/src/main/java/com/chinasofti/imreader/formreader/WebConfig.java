package com.chinasofti.imreader.formreader;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.annotation.PostConstruct;

@Configuration
public class WebConfig {
    private String extResouceDir;

    @PostConstruct
    public void init() {
        extResouceDir = System.getProperty("user.home") + "/sample";
    }

    public String getExtResouceDir() {
        return extResouceDir;
    }

    @Bean
    WebMvcConfigurerAdapter enableCors() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**");
            }

            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                registry.addResourceHandler("/**").addResourceLocations("file:" + extResouceDir +"/");
            }
        };
    }

}