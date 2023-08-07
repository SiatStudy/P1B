package com.example.P1B.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry){
        registry.addViewController("/P1F/{spring:\\w+}")
                .setViewName("forward:/P1F");
        registry.addViewController("/P1F/**/{spring:\\w+}")
                .setViewName("forward:/P1F");
        registry.addViewController("/P1F/{spring:\\w+}/**{spring:?!(\\.js|\\.css|\\.json)$}")
                .setViewName("forward:/P1F");
    }

}