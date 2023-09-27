package net.medev.cardatabase.repository;

import net.medev.cardatabase.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Long> {
}
