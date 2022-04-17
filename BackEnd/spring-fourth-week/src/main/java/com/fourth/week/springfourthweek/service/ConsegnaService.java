package com.fourth.week.springfourthweek.service;

import com.fourth.week.springfourthweek.domain.Consegna;
import com.fourth.week.springfourthweek.repository.ConsegnaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsegnaService {

    @Autowired
    ConsegnaRepository consegnaRepository;

    public Optional<Consegna> findById(String id) {
        return consegnaRepository.findById(id);
    }

    public List<Consegna> findAll() {
        return consegnaRepository.findAll();
    }

    public Consegna saveOne(Consegna consegna) {
        return consegnaRepository.save(consegna);
    }

    public void deleteOne(String id) {
        consegnaRepository.deleteById(id);
    }

}
