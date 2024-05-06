package com.example.user.services;

import com.example.user.dto.LoginDto;
import com.example.user.dto.UserDto;
import com.example.user.models.User;
import com.example.user.repositories.UserRepository;
import com.example.user.response.LoginMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public LoginMessage Register(UserDto userDto) {
        User user = new User(
                userDto.getUsername(),
                userDto.getEmail(),
                userDto.getPassword(),
                userDto.getPhone(),
                userDto.getType(),
                userDto.getStatus()
        );
        userRepository.save(user);
        return new LoginMessage("signed up!", true,null);
    }

    public LoginMessage loginUser(LoginDto loginDto) {
        User user = findUserByEmail(loginDto.getEmail());
        if (user == null) {
            return new LoginMessage("Email doesn't exist!", false,null);
        }

        if (!passwordMatches(loginDto.getPassword(), user.getPassword())) {
            return new LoginMessage("Password doesn't match!", false,null);
        }

        Optional<User> authenticatedUser = authenticateUser(loginDto.getEmail(), user.getPassword());
        if (authenticatedUser.isPresent()) {
            return new LoginMessage("Logged in!", true, authenticatedUser.get().getID());
        } else {
            return new LoginMessage("Login failed!", false,null);
        }
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private boolean passwordMatches(String loginDtoPassword, String userPassword) {
        return loginDtoPassword.equals(userPassword);
    }

    private Optional<User> authenticateUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }


    public void updateUser(User updatedUser) {
        userRepository.save(updatedUser);


    }

    public void deleteUser(Integer ID) {
        userRepository.deleteById(ID);
    }


}

