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

        // 이메일 인증 시작시간을 현재 시간으로 설정
        LocalDateTime vrCreate = LocalDateTime.now();
        email.setVrCreate(vrCreate);

        // 이메일 인증 종료시간을 시작시간 기준 3분 후로 설정
        LocalDateTime vrExpire = vrCreate.plusMinutes(3);
        email.setVrExpire(vrExpire);

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

    public User findByUser(String userEmail){
        Optional<User> user = userRepository.findByUserEmail(userEmail);
        return user.get();
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
        User result = userRepository.findByUsername(userEmail).get();
        if (result != null) {
            System.out.println("**************************"+result.getUserEmail());
            // 조회결과가 있다 -> 사용할 수 없다.
            return false;
        } else {
            System.out.println("**************************"+result.getUserEmail());
            // 조회결과가 없다 -> 사용할 수 있다.
            return true;
        }
    }

    // 아이디 체크

    public boolean idCheck(String username) {
        User result = userRepository.findByUsername(username).get();
        if (result != null) {
            System.out.println("**************************"+result.getUsername() + "있다!");
            // 조회결과가 있다 -> 사용할 수 없다.
            return false;
        } else {
            System.out.println("**************************"+result.getUsername() + "없다!");
            // 조회결과가 없다 -> 사용할 수 있다.
            return true;
        }
    }


    public Optional<String> findIdByEmail(String userEmail) {
        Optional<User> userOptional = userRepository.findByUserEmail(userEmail);

        return userOptional.map(User::getUsername);
    }


    public void changePassword(String useremail, String newPassword) {
        User user = userRepository.findByUserEmail(useremail).get();
//                .orElseThrow(() -> new UserNotFoundException("해당 아이디를 찾을 수 없습니다."));
        System.out.println("*************************user : " + user);
        user.setUserPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public Optional<String> findUserByUsernameAndEmail(String username, String userEmail) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        return userOptional.filter(user -> user.getUserEmail().equals(userEmail))
                .map(User::getUsername);
    }
}