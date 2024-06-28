package com.dieco.go_back.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;
import java.time.LocalDate;


@Data
@Entity
@Table(name = "turnos")
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;
    private String obra_social;
    private String telefono;
    private String tratamiento;
    private Double importe;
    @Column(nullable = false)
    private LocalDate dia;
    @Column(nullable = false)
    private Time hora;
    private Boolean pagado = false;
}
