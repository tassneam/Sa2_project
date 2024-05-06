package com.example.user.dto;

import com.example.user.enums.Status;
import com.example.user.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Integer userid;
    private String username;
    private String email;
    private String password;
    private String Phone;
    private Type type;
    private Status status;

}
