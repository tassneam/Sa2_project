package com.example.product.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length = 11, nullable = false)
    private Integer ID;
    @Column(nullable = false)
    private String Name;
    @Column(columnDefinition = "TEXT")
    private String Description;
    @Column(nullable = false, length = 11)
    private Integer Stock;

}
