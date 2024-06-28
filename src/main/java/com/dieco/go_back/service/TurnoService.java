package com.dieco.go_back.service;

import com.dieco.go_back.dto.TurnoDTO;
import com.dieco.go_back.exceptionsControl.exceptions.ResourceDuplicateException;
import com.dieco.go_back.exceptionsControl.exceptions.ResourceNotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface TurnoService {

    TurnoDTO createTurno(TurnoDTO turnoDTO) throws ResourceDuplicateException;

    List<TurnoDTO> turnosDelDia(LocalDate dia) throws ResourceNotFoundException;

    TurnoDTO updateTurno(Long turnoId, TurnoDTO tDTO) throws ResourceDuplicateException, ResourceNotFoundException;

    void deleteTurno(Long turnoId) throws ResourceNotFoundException;

    Map<String, String> cantTurnosDelMes();

    void deleteOldTurnos() throws ResourceNotFoundException;
}
