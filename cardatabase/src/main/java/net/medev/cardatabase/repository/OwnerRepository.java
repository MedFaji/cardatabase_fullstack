package net.medev.cardatabase.repository;

import net.medev.cardatabase.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
}
