package com.example.product.controllers;

import com.example.product.models.Product;
import com.example.product.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000") // Allow frontend URL
@RestController
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/getAllProducts")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/admin/createProduct")
    public ResponseEntity<Product> createProduct(@RequestBody Product newProduct) {
        productService.createProduct(newProduct);
        return new ResponseEntity<Product>(newProduct, HttpStatus.OK);
    }

    @PutMapping("/admin/updateProduct")
    public ResponseEntity<Product> updateProduct(@RequestBody Product updatedProduct) {
        productService.updateProduct(updatedProduct);
        return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/admin/deleteProduct")
    public String deleteProduct(@RequestParam Integer ID) {
        productService.deleteProduct(ID);
        return "deleted successfully";
    }
}
