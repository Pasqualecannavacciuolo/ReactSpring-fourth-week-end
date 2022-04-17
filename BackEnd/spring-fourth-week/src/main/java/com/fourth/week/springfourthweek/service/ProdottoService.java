package com.fourth.week.springfourthweek.service;

import com.fourth.week.springfourthweek.domain.Prodotto;
import com.fourth.week.springfourthweek.repository.ProdottoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdottoService {

    @Autowired
    ProdottoRepository prodottoRepository;

    public Optional<Prodotto> findById(String id) {
        return prodottoRepository.findById(id);
    }

    public List<Prodotto> findAll() {
        return prodottoRepository.findAll();
    }

    public Prodotto saveOne(Prodotto prodotto) {
        return prodottoRepository.save(prodotto);
    }

    public void deleteOne(String id) {
        prodottoRepository.deleteById(id);
    }
}
