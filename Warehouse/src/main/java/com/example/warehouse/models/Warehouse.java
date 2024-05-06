package com.example.warehouse.models;

import com.example.warehouse.enums.Status;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, length = 11)
    private Integer ID;
    @Column(nullable = false)
    private String name;
    @Column(unique = true)
    private String Location;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.Inactive;
    @Column(length = 11)
    private Integer Capacity;
    @Column(nullable = false)
    private Integer userId;
}
