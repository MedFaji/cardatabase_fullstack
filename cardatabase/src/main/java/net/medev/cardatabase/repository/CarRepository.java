package net.medev.cardatabase.repository;

import net.medev.cardatabase.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="vehicles")
public interface CarRepository extends JpaRepository<Car, Long> {
}
