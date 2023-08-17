package com.example.P1B.config;

import com.example.P1B.config.validator.ETagValidationFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.ShallowEtagHeaderFilter;

@Configuration
public class EtagConfig {
    @Bean
    // 빈 등록. 이 필터는 응답에 ETag를 생성하고, 관리해주는 역할을 한다.
    public ShallowEtagHeaderFilter shallowEtagHeaderFilter() {
        return new ShallowEtagHeaderFilter();
    }
    @Bean
    // 빈 등록. 이 필터는 클라이언트가 보낸 ETag와 서버에서 생성한 ETag를 비교하여
    // 일치하면 304 응답을 보내고, 일치하지 않으면 서버에서 생성한 ETag를 응답에 추가한다.

    public FilterRegistrationBean<ETagValidationFilter> etagValidationFilter() {
        FilterRegistrationBean<ETagValidationFilter> filterRegistrationBean
                = new FilterRegistrationBean<>(new ETagValidationFilter());

        // 필터를 적용할 URL: /, /mainpage, /loginpage, /api/todos/**
        // 회원가입, 로그인 등의 비동기통신은 정확한 데이터가 오가야 하기에, 필터를 통해 Etag 검증을 진행하지 않는다.
        filterRegistrationBean.addUrlPatterns("/", "/mainpage", "/loginpage", "/api/todos/**");
        return filterRegistrationBean;
    }
}