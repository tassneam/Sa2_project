package com.example.user.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginMessage {
    String message;
    Boolean status;
    Integer userId;  // Include user ID in the login message


}
