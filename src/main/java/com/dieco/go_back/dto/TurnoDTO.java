package com.dieco.go_back.dto;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.sql.Time;
import java.time.LocalDate;

@Data
public class TurnoDTO {
    private Long id;

    @Pattern(regexp = ".*\\p{L}.*", message = "El nombre debe contener al menos una letra.")
    private String nombre;
    @Pattern(regexp = ".*\\p{L}.*", message = "La obra social debe contener al menos una letra.")
    private String obra_social;
    @Pattern(regexp = "\\d+", message = "El teléfono debe contener solo números.")
    private String telefono;
    @Pattern(regexp = ".*[a-zA-Z0-9].*", message = "El tratamiento debe contener al menos una letra o un número.")
    private String tratamiento;
    @Digits(integer = 10, fraction = 2, message = "El importe debe tener como máximo 10 dígitos enteros y 2 decimales.")
    private Double importe;
    @NotNull(message = "El campo 'Dia' no puede quedar vacio")
    private LocalDate dia;
    @NotNull(message = "El campo 'Hora' no puede quedar vacio")
    private Time hora;
    @NotNull(message = "El campo 'Pagado?' no puede quedar vacio")
    private Boolean pagado;

}
