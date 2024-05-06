package com.example.warehouse.services;

import com.example.warehouse.models.Warehouse;
import com.example.warehouse.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {
    @Autowired
    private WarehouseRepository warehouseRepository;

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    public void createWarehouse(Warehouse newWarehouse) {
        warehouseRepository.save(newWarehouse);
    }

    public void updateWarehouse(Warehouse updatedWarehouse) {
        warehouseRepository.save(updatedWarehouse);
    }

    public void deleteWarehouse(Integer ID) {
        warehouseRepository.deleteById(ID);
    }

    public List<Warehouse> getWarehousesByUserId(Integer userId) {
        return warehouseRepository.findByUserId(userId);
    }
    public Warehouse getWarehouseById(Integer ID) {
        return warehouseRepository.findById(ID).orElse(null);
    }


    public Warehouse getWarehouseByName(String Name) {
        return warehouseRepository.findByName(Name);
    }
}
