package com.dieco.go_back.persistence;

import com.dieco.go_back.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TurnosRepository extends JpaRepository<Turno, Long> {
    @Query("SELECT t FROM Turno t WHERE t.dia = :dia")
    List<Turno> findByDate(@Param("dia") LocalDate dia);

    boolean existsByDiaAndHora(LocalDate dia, Time hora);

    @Query("SELECT t.dia, COUNT(t) FROM Turno t GROUP BY t.dia")
    List<Object[]> countTurnosByDay();

    @Modifying
    @Query("DELETE FROM Turno t WHERE t.dia <= :fecha")
    int deleteOldTurnos(@Param("fecha") LocalDate fecha);
}
