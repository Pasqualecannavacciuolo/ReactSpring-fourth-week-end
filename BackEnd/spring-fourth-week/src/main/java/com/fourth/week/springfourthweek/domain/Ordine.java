package com.fourth.week.springfourthweek.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "orders")
public class Ordine {

    @Id
    private String id;
    private String clientRef;

    public Ordine() {}

    public Ordine(String clientRef) {
        this.clientRef = clientRef;
    }

    public Ordine(String id, String clientRef) {
        this.id = id;
        this.clientRef = clientRef;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClientRef() {
        return clientRef;
    }

    public void setClientRef(String clientRef) {
        this.clientRef = clientRef;
    }
}
