package com.dieco.go_back.mapper;

import com.dieco.go_back.dto.TurnoDTO;
import com.dieco.go_back.model.Turno;

public class TurnoMapper {

    public static Turno turnoDTOTOTurno(TurnoDTO turnoDTO){
        Turno t = new Turno();
        t.setId(turnoDTO.getId());
        t.setNombre(turnoDTO.getNombre());
        t.setObra_social(turnoDTO.getObra_social());
        t.setTelefono(turnoDTO.getTelefono());
        t.setTratamiento(turnoDTO.getTratamiento());
        t.setImporte(turnoDTO.getImporte());
        t.setDia(turnoDTO.getDia());
        t.setHora(turnoDTO.getHora());
        t.setPagado(turnoDTO.getPagado());
        return t;
    }

    public static TurnoDTO turnoToTurnoDTO(Turno turno){
        TurnoDTO tDTO = new TurnoDTO();
        tDTO.setId(turno.getId());
        tDTO.setNombre(turno.getNombre());
        tDTO.setObra_social(turno.getObra_social());
        tDTO.setTelefono(turno.getTelefono());
        tDTO.setTratamiento(turno.getTratamiento());
        tDTO.setImporte(turno.getImporte());
        tDTO.setDia(turno.getDia());
        tDTO.setHora(turno.getHora());
        tDTO.setPagado(turno.getPagado());
        return tDTO;
    }
}
