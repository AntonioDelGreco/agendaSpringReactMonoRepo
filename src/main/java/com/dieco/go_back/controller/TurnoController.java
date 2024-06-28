package com.dieco.go_back.controller;

import com.dieco.go_back.dto.TurnoDTO;
import com.dieco.go_back.exceptionsControl.exceptions.ResourceDuplicateException;
import com.dieco.go_back.exceptionsControl.exceptions.ResourceNotFoundException;
import com.dieco.go_back.service.TurnoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/agenda")
@Validated
public class TurnoController {

    @Autowired
    private TurnoService turnoService;

    @PostMapping
    public ResponseEntity<TurnoDTO> createTurno(@RequestBody @Valid TurnoDTO tDTO) throws ResourceDuplicateException {
        TurnoDTO turnoSaved = turnoService.createTurno(tDTO);
        return new ResponseEntity<>(turnoSaved, HttpStatus.CREATED);
    }

    @GetMapping("/turnos-dia")
    public ResponseEntity<List<TurnoDTO>> turnosDelDia(
            @RequestParam("dia")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dia) throws ResourceNotFoundException {
        List<TurnoDTO> turnosDelDia = turnoService.turnosDelDia(dia);
        return ResponseEntity.ok(turnosDelDia);
    }

    @PutMapping("{id}")
    public ResponseEntity<TurnoDTO> updateTurno(
            @PathVariable("id") Long turnoId,
            @RequestBody @Valid TurnoDTO tDTO
    ) throws ResourceDuplicateException, ResourceNotFoundException {
        TurnoDTO turnoUpdated = turnoService.updateTurno(turnoId, tDTO);
        return ResponseEntity.ok(turnoUpdated);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTurno(@PathVariable("id") Long turnoId) throws ResourceNotFoundException {
        turnoService.deleteTurno(turnoId);
        return ResponseEntity.ok("Turno borrado correctamente.");
    }

    @DeleteMapping("/deleteOldTurnos")
    public ResponseEntity<String> deleteOldTurnos() throws ResourceNotFoundException {
        turnoService.deleteOldTurnos();
        return ResponseEntity.ok("Todos los turnos de hace 6 meses fueron borrados exitosamente.");
    }

    @GetMapping("/cant-mes")
    public ResponseEntity<Map<String, String>> cantTurnosDelMes() {
        Map<String, String> turnosDelMes = turnoService.cantTurnosDelMes();
        return ResponseEntity.ok(turnosDelMes);
    }
}

