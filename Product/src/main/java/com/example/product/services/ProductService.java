package com.example.product.services;

import com.example.product.models.Product;
import com.example.product.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void  createProduct(Product newproduct) {
        productRepository.save(newproduct);
    }

    public void updateProduct(Product updatedproduct) {
        productRepository.save(updatedproduct);
    }

    public void deleteProduct(Integer ID) {
        productRepository.deleteById(ID);
    }

    public Product getProductById(Integer ID) {
        return productRepository.findById(ID).orElse(null);
    }

    public Product getProductByName(String Name) {
        return productRepository.findByName(Name);
    }

}
