package com.fourth.week.springfourthweek.service;

import com.fourth.week.springfourthweek.domain.Consegna;
import com.fourth.week.springfourthweek.domain.Ordine;
import com.fourth.week.springfourthweek.repository.ConsegnaRepository;
import com.fourth.week.springfourthweek.repository.OrdineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrdineService {
    @Autowired
    OrdineRepository ordineRepository;

    public Optional<Ordine> findById(String id) {
        return ordineRepository.findById(id);
    }

    public List<Ordine> findAll() {
        return ordineRepository.findAll();
    }

    public Ordine saveOne(Ordine ordine) {
        return ordineRepository.save(ordine);
    }

    public void deleteOne(String id) {
        ordineRepository.deleteById(id);
    }
}
