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


    /// 저장하고 사용자 이메일 인증 정보를 설정하여 이메일 저장
    public void join(UserDTO userDTO) {


        // 1. dto -> entity 변환
        // 2. repository의 join 메서드 호출
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
        // repository의 join메서드 호출 (조건. entity객체를 넘겨줘야 함)
    }



    // 전체 사용자 리스트 조회
    // List로 반환
    public List<UserDTO> findAll() {
        List<User> userList = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();
        for (User user : userList) {
            userDTOList.add(UserDTO.toUserDTO(user));
        }
        return userDTOList;
    }

    // 아이디 찾기
    public UserDTO findById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        // 특정 사용자를 조회
        if (optionalUser.isPresent()) {
            return UserDTO.toUserDTO(optionalUser.get());
        } else {
            return null;
        }

    }

    // 사용자 정보 수정 목적으로 기존 정보 조회 기능
    public UserDTO updateForm(String myEmail) {
        // 이메일 가지고 있는지 여부 확인
        Optional<User> result = userRepository.findByUsername(myEmail);
        if (result.isPresent()) {
            return UserDTO.toUserDTO(result.get());
        } else {
            return null;
        }
    }

    // 사용자 수정
    public void update(UserDTO userDTO) {

        // 전달받은 UserDTO 객체를 User 엔티티로 변환 후, 저장
        userRepository.save(User.toUpdateUser(userDTO));
    }

    // 사용자 삭제
    public void deleteById(Long id) {
        // 전달받은 ID 값을 조회하여 해당 사용자 삭제
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
    }


    // 이메일로 아이디 찾기 기능
    public Optional<String> findIdByEmail(String userEmail) {

        // 해당 이메일을 가지고 있는 사용자를 조회
        Optional<User> userOptional = userRepository.findByUserEmail(userEmail);

        // 아이디 반환
        return userOptional.map(User::getUsername);
    }


    /// 비밀번호 변경
    // 전달받은 아이디와 새 비밀번호를 사용하여 사용자의 비밀번호를 변경하고 저장
    public void changePassword(String username, String newPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("해당 아이디를 찾을 수 없습니다."));
        user.setUserPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }


    // 해당 아이디와 이메일을 가지고 있는 사용자를 조회하고, 아이디를 반환
    public String findUserByUsernameAndEmail(String username, String userEmail) {
        User user = userRepository.findByUsernameAndUserEmail(username, userEmail); // 수정된 부분

        if (user == null) {
            throw new UserNotFoundException("해당하는 아이디 또는 이메일이 존재하지 않습니다.");
        }

        return user.getUsername(); // 수정된 부분
    }
}