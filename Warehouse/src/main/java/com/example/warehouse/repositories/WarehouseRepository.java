package com.example.warehouse.repositories;

import com.example.warehouse.models.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {
    List<Warehouse> findByUserId(Integer userId);
    Warehouse findByName(String Name);

}
