package com.fourth.week.springfourthweek.repository;

import com.fourth.week.springfourthweek.domain.Ordine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdineRepository extends JpaRepository<Ordine, String> {
}
