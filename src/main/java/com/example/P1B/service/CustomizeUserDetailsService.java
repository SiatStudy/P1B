package com.example.P1B.service;

import com.example.P1B.domain.User;
import com.example.P1B.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class CustomizeUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomizeUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("해당 아이디를 찾을 수 없습니다 : " + username)
        );
        System.out.println("출력된 아이디 값 : " + username);
        return new CustomizeUserDetails(user);
    }
}
