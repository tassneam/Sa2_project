package com.example.product.errorHandling;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class recordNotFoundException extends RuntimeException {

    public recordNotFoundException(String msg) {
        super(msg);
    }

}