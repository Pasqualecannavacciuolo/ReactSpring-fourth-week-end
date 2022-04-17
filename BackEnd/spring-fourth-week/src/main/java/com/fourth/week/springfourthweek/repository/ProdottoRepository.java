package com.fourth.week.springfourthweek.repository;

import com.fourth.week.springfourthweek.domain.Prodotto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdottoRepository extends JpaRepository<Prodotto, String> {
}
