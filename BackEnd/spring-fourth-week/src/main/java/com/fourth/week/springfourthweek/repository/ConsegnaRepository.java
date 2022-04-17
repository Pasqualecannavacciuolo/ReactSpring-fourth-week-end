package com.fourth.week.springfourthweek.repository;

import com.fourth.week.springfourthweek.domain.Consegna;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsegnaRepository extends JpaRepository<Consegna, String> {
}
