package com.dieco.go_back.service.impl;

import com.dieco.go_back.dto.TurnoDTO;
import com.dieco.go_back.exceptionsControl.exceptions.ResourceNotFoundException;
import com.dieco.go_back.exceptionsControl.exceptions.ResourceDuplicateException;
import com.dieco.go_back.mapper.TurnoMapper;
import com.dieco.go_back.model.Turno;
import com.dieco.go_back.persistence.TurnosRepository;
import com.dieco.go_back.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TurnoServiceImpl implements TurnoService {

    @Autowired
    private TurnosRepository turnosRepository;

    @Override
    public TurnoDTO createTurno(TurnoDTO turnoDTO) throws ResourceDuplicateException {
        Turno turno = TurnoMapper.turnoDTOTOTurno(turnoDTO);

        if (turnosRepository.existsByDiaAndHora(turno.getDia(), turno.getHora())) {
            throw new ResourceDuplicateException("Ya existe un turno para ese día y hora.");
        }

        Turno turnoSaved = turnosRepository.save(turno);
        return TurnoMapper.turnoToTurnoDTO(turnoSaved);
    }

    @Override
    public List<TurnoDTO> turnosDelDia(LocalDate dia) throws ResourceNotFoundException {
        List<Turno> turnos = turnosRepository.findByDate(dia);

        if (turnos.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron turnos para este día.");
        }

        return turnos.stream()
                .map(TurnoMapper::turnoToTurnoDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TurnoDTO updateTurno(Long turnoId, TurnoDTO tDTO) throws ResourceNotFoundException, ResourceDuplicateException {
        Turno turnoFromDTO = TurnoMapper.turnoDTOTOTurno(tDTO);
        Turno t = turnosRepository
                .findById(turnoId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("No existe el turno buscado. Imposible actualizar.")
                );

        if (turnosRepository.existsByDiaAndHora(turnoFromDTO.getDia(), turnoFromDTO.getHora())) {
            throw new ResourceDuplicateException("Ya existe un turno para ese día y hora. Pruebe con otro horario.");
        }

        t.setNombre(turnoFromDTO.getNombre());
        t.setObra_social(turnoFromDTO.getObra_social());
        t.setTelefono(turnoFromDTO.getTelefono());
        t.setTratamiento(turnoFromDTO.getTratamiento());
        t.setImporte(turnoFromDTO.getImporte());
        t.setDia(turnoFromDTO.getDia());
        t.setHora(turnoFromDTO.getHora());
        t.setPagado(turnoFromDTO.getPagado());

        Turno turnoUpdatedObj = turnosRepository.save(t);
        return TurnoMapper.turnoToTurnoDTO(turnoUpdatedObj);
    }

    @Override
    public void deleteTurno(Long turnoId) {
        turnosRepository
                .findById(turnoId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("No existe el turno buscado. Imposible Borrar.")
                );

        turnosRepository.deleteById(turnoId);
    }

    @Override
    public Map<String, String> cantTurnosDelMes() {
        List<Object[]> results = turnosRepository.countTurnosByDay();
        Map<String, String> turnosPorDia = new HashMap<>();

        for (Object[] result : results) {
            String color;
            LocalDate dia = (LocalDate) result[0];
            String formattedDate = dia.toString();
            Long count = (Long) result[1];
            if (count > 0) {
                if (count > 2 && count < 7) {
                    color = "naranja";
                } else if (count <= 2) {
                    color = "amarillo";
                } else {
                    color = "rojo";
                }
                turnosPorDia.put(formattedDate, color);
            }
        }

        return turnosPorDia;
    }




    @Override
    @Transactional
    public void deleteOldTurnos() throws ResourceNotFoundException {
        LocalDate sixMonthsAgo = LocalDate.now().minusMonths(6);
        int deletedCount = turnosRepository.deleteOldTurnos(sixMonthsAgo);
        if (deletedCount <= 0){
            throw new ResourceNotFoundException("No se encontraron turnos para borrar.");
        }
    }
}
