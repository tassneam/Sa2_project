package com.example.user.models;

import com.example.user.enums.Status;
import com.example.user.enums.Type;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, length = 11)
    private Integer ID;
    @Length(max = 15)
    @Column(unique = true)
    private String username;

    @Column(unique = true)
    @Email
    private String email;

    @Column(nullable = false)
    @Length(min = 8)
    private String password;
    @Length(min = 11)
    private String Phone;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status = Status.Inactive;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type= Type.Supervisor;


    public User(String username, String email, String password, String phone, Type type, Status status) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.Phone = phone;
        this.type = type;
        this.status = status;

    }


}
