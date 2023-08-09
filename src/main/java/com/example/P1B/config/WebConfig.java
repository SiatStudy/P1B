package com.example.P1B.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry){
        registry.addViewController("/mainpage/{spring:\\w+}")
                .setViewName("forward:/mainpage");
        registry.addViewController("/mainpage/**/{spring:\\w+}")
                .setViewName("forward:/mainpage");
        registry.addViewController("/mainpage/{spring:\\w+}/**{spring:?!(\\.js|\\.css|\\.json)$}")
                .setViewName("forward:/mainpages");
        registry.addViewController("/loginpage/{spring:\\w+}")
                .setViewName("forward:/loginpage");
        registry.addViewController("/loginpage/**/{spring:\\w+}")
                .setViewName("forward:/loginpage");
        registry.addViewController("/loginpage/{spring:\\w+}/**{spring:?!(\\.js|\\.css|\\.json)$}")
                .setViewName("forward:/loginpage");
    }

}