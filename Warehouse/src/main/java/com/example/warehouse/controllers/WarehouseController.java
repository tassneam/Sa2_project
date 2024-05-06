package com.example.warehouse.controllers;

import com.example.warehouse.models.Warehouse;
import com.example.warehouse.services.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000") // Allow frontend URL
@RestController
public class WarehouseController {
    @Autowired
    private WarehouseService warehouseService;

    @GetMapping("/getAllWarehouses")
    public List<Warehouse> getAllWarehouses() {
        return warehouseService.getAllWarehouses();
    }

    @PostMapping("/createWarehouse")
    public ResponseEntity<Warehouse> createWarehouse(@RequestBody Warehouse newWarehouse) {
        warehouseService.createWarehouse(newWarehouse);
        return new ResponseEntity<Warehouse>(newWarehouse, HttpStatus.OK);
    }

    @PutMapping("/updateWarehouse")
    public ResponseEntity<Warehouse> updateWarehouse(@RequestBody Warehouse updatedWarehouse) {
        warehouseService.updateWarehouse(updatedWarehouse);
        return new ResponseEntity<Warehouse>(updatedWarehouse, HttpStatus.OK);
    }

    @DeleteMapping("/deleteWarehouse")
    public String deleteWarehouse(@RequestParam Integer ID) {
        warehouseService.deleteWarehouse(ID);
        return "deleted successfully";
    }

    @GetMapping("/getWarehousesByUserId")
    public List<Warehouse> getWarehousesByUserId(@RequestParam Integer userId) {
        return warehouseService.getWarehousesByUserId(userId);
    }

    @GetMapping("/getById")
    public Warehouse getWarehouseById(@RequestParam Integer ID) {
        return warehouseService.getWarehouseById(ID);

    }

    @GetMapping("/getWarehouseByName")
    public ResponseEntity<Warehouse> getWarehouseByName(@RequestParam String Name) {
        Warehouse warehouse = warehouseService.getWarehouseByName(Name);
        return ResponseEntity.ok().body(warehouse);
    }
}
