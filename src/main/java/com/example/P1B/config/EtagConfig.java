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
    // 이 필터는 모든 요청에 대해 적용된다.
    // 요청에 따라 구분하는 것이 좋지만, 일단은 시간이 없는 관계로 모든 요청에 대해 적용한다.
    public FilterRegistrationBean<ETagValidationFilter> etagValidationFilter() {
        FilterRegistrationBean<ETagValidationFilter> filterRegistrationBean
                = new FilterRegistrationBean<>(new ETagValidationFilter());
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.setName("ETagValidationFilter");
        return filterRegistrationBean;
    }
}