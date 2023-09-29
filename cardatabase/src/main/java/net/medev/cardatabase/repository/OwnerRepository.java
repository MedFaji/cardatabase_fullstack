package net.medev.cardatabase.repository;

import net.medev.cardatabase.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerRepository extends JpaRepository<Owner, Long> {

    Optional<Owner> findByFirstname(String firstName);
}
