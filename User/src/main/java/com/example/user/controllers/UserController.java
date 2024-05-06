package com.example.user.controllers;

import com.example.user.dto.LoginDto;
import com.example.user.dto.UserDto;
import com.example.user.models.User;
import com.example.user.response.LoginMessage;
import com.example.user.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000") // Allow frontend URL
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/admin/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    @PostMapping("/Register")
    public LoginMessage Register(@RequestBody UserDto newUser) {
        return userService.Register(newUser);

    }

    @PutMapping("/admin/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
        userService.updateUser(updatedUser);
        return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/admin/deleteUser")
    public String deleteUser(@RequestParam Integer ID) {
        userService.deleteUser(ID);
        return "deleted in beeesho docker";
    }

    @PostMapping("/Login")
    public LoginMessage Login(@RequestBody LoginDto loginDTO) {
        return userService.loginUser(loginDTO);

    }
}
