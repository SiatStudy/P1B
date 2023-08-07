package com.example.P1B.service;

import com.example.P1B.domain.Email;
import com.example.P1B.domain.User;
import com.example.P1B.dto.UserDTO;
import com.example.P1B.exception.UserNotFoundException;
import com.example.P1B.repository.EmailRepository;
import com.example.P1B.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final EmailRepository emailRepository;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder; // 빈으로 주입


    public void signUp(UserDTO userDTO) {
        // 1. dto -> entity 변환
        // 2. repository의 signUp 메서드 호출
        User user = User.toUser(userDTO);
        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        user.setRole(User.Role.USER);

        Email email = new Email();
        email.setUser(user);

        // 이메일 인증 시작시간을 현재 시간으로 설정
        LocalDateTime vrCreate = LocalDateTime.now();
        email.setVrCreate(vrCreate);

        // 이메일 인증 종료시간을 시작시간 기준 3분 후로 설정
        LocalDateTime vrExpire = vrCreate.plusMinutes(3);
        email.setVrExpire(vrExpire);

        userRepository.save(user);
        emailRepository.save(email);
        // repository의 signUp메서드 호출 (조건. entity객체를 넘겨줘야 함)
    }



    public List<UserDTO> findAll() {
        List<User> userList = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();
        for (User user : userList) {
            userDTOList.add(UserDTO.toUserDTO(user));
        }
        return userDTOList;
    }

    public UserDTO findById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return UserDTO.toUserDTO(optionalUser.get());
        } else {
            return null;
        }

    }

    public UserDTO updateForm(String myEmail) {
        Optional<User> result = userRepository.findByUsername(myEmail);
        if (result.isPresent()) {
            return UserDTO.toUserDTO(result.get());
        } else {
            return null;
        }
    }

    public void update(UserDTO userDTO) {
        userRepository.save(User.toUpdateUser(userDTO));
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    // 이메일 체크
    public boolean emailCheck(String userEmail) {
        Optional<User> result = userRepository.findByUsername(userEmail);
        if (result.isPresent()) {
            // 조회결과가 있다 -> 사용할 수 없다.
            return false;
        } else {
            // 조회결과가 없다 -> 사용할 수 있다.
            return true;
        }
        // 조회결과가 있다 -> 사용할 수 없다.
        // 조회결과가 없다 -> 사용할 수 있다.
        return result.isEmpty();
    }

    // 아이디 체크
    public boolean idCheck(String username) {
        Optional<User> result = userRepository.findByUsername(username);
        if (result.isPresent()) {
            // 조회결과가 있다 -> 사용할 수 없다.
            return false;
        } else {
            // 조회결과가 없다 -> 사용할 수 있다.
            return true;
        }
        // 조회결과가 있다 -> 사용할 수 없다.
        // 조회결과가 없다 -> 사용할 수 있다.
        return result.isEmpty();
    }


    public Optional<String> findIdByEmail(String userEmail) {
        Optional<User> userOptional = userRepository.findByUserEmail(userEmail);

        return userOptional.map(User::getUsername);
    }


    public void changePassword(String username, String newPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("해당 아이디를 찾을 수 없습니다."));
        user.setUserPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public String findUserByUsernameAndEmail(String username, String userEmail) {
        User user = userRepository.findByUsernameAndUserEmail(username, userEmail); // 수정된 부분

        if (user == null) {
            throw new UserNotFoundException("해당하는 아이디 또는 이메일이 존재하지 않습니다.");
        }

        return user.getUsername(); // 수정된 부분
    }
}