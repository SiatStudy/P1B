package com.example.P1B.config.validator;

import org.springframework.web.filter.GenericFilterBean;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
public class ETagValidationFilter extends GenericFilterBean {

    private final String generatedETag;

    // 생성자에서 ETag 값 생성
    // 컨트롤러에서 일일이 생성하는 것은 불필요한 연산을 초래하므로 좋지 않음.
    // 따라서 필터단에서 이 작업을 수행.
    public ETagValidationFilter() {
        generatedETag = generateRandomETag();
        System.out.println("Generated ETag: " + generatedETag);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        if (request instanceof HttpServletRequest && response instanceof HttpServletResponse) {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            HttpServletResponse httpResponse = (HttpServletResponse) response;

            // 클라이언트가 보낸 If-None-Match 헤더 확인
            String ifNoneMatchHeader = httpRequest.getHeader("If-None-Match");

            // If-None-Match 헤더와 생성된 ETag 비교
            if (ifNoneMatchHeader != null && ifNoneMatchHeader.equals(generatedETag)) {
                // ETag 값이 일치하면 304 응답
                httpResponse.setStatus(HttpServletResponse.SC_NOT_MODIFIED);
                return;
            } else {
                // ETag 값을 헤더에 추가하여 응답
                httpResponse.setHeader("ETag", generatedETag);
                chain.doFilter(request, response);
            }
        } else {
            // HTTP 요청 및 응답이 아닌 경우, 다음 필터로 전달
            chain.doFilter(request, response);
        }
    }

    private String generateRandomETag() {
        UUID uuid = UUID.randomUUID();
        return "\"" + uuid.toString() + "\""; // ETag 값은 큰 따옴표로 감싸야 함
    }
}
