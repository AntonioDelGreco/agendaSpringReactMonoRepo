import { useAtom, useSetAtom } from 'jotai'
import { dateAtom, turnoDetailAtom } from '../utils/atom.js'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import dayjs from 'dayjs'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Turno = () => {
  const [date] = useAtom(dateAtom)
  const formattedDateForDB = useRef(dayjs(date).format('YYYY-MM-DD'))
  const [turnosDelDia, setTurnosDelDia] = useState([])
  const [alerta, setAlerta] = useState('')
  const setTurnoDetail = useSetAtom(turnoDetailAtom)

  const handleTurnoView = (idTurno) => {
    const turno = turnosDelDia.filter((turno) => turno.id === idTurno)
    setTurnoDetail(turno)
  }

  const fetchData = useCallback(async (dateSelect) => {
    try {
      const URL = 'http://localhost:8080/api/agenda/turnos-dia?dia='
      const response = await axios.get(`${URL}${dateSelect}`)
      const data = response.data
      setTurnosDelDia(data)
      setAlerta('')
    } catch (err) {
      setTurnosDelDia([])
      setAlerta(err.response.data.errorMessage)
    }
  }, [])

  const deleteData = useCallback(async (dateSelect) => {
    try {
      const URL = 'http://localhost:8080/api/agenda/deleteOldTurnos'
      const response = await axios.delete(URL)
      if (!response) {
        throw new Error()
      }
      setAlerta(response.data)
    } catch (err) {
      setAlerta(err.response.data.errorMessage)
    }
  }, [])

  useEffect(() => {
    fetchData(formattedDateForDB)
  }, [fetchData])

  useEffect(() => {
    const newFormattedDateForDB = dayjs(date).format('YYYY-MM-DD')
    if (newFormattedDateForDB !== formattedDateForDB.current) {
      setTurnosDelDia([])
      formattedDateForDB.current = newFormattedDateForDB
      fetchData(newFormattedDateForDB)
    }
  }, [date, fetchData])

  const handleDeleteOld = () => deleteData()

  const sortedTurnos = turnosDelDia.sort((a, b) => a.hora.localeCompare(b.hora))

  return (
    <div className='w-6/12 h-96 bg-fondoPrincipal rounded-lg flex flex-col justify-between'>
      <h2 className='bg-resaltado rounded-lg text-light text-center uppercase text-2xl p-2'>
        {turnosDelDia.length === 1
          ? `${turnosDelDia.length} Turno`
          : `${turnosDelDia.length} Turnos`}
      </h2>
      <div className='overflow-y-auto h-64'>
        {alerta
          ? (
            <p className='text-center'>{alerta}</p>
            )
          : (
              turnosDelDia.length > 0 &&
          sortedTurnos.map((turno, index) => (
            <div className='flex flex-col m-4' key={index}>
              <Link
                to='turno-detail'
                onClick={() => handleTurnoView(turno.id)}
                className='flex gap-2 items-center rounded-lg p-3 justify-between cursor-pointer hover:bg-dark hover:text-light transition-all'
              >
                <span>{turno.nombre}</span>
                <span>{turno.hora}</span>
              </Link>
            </div>
          ))
            )}
      </div>
      <Link
        to='/add-turno'
        className='bg-resaltado w-full rounded-lg text-light text-center text-2xl p-2'
      >
        Agregar Turno
      </Link>
      <button onClick={handleDeleteOld} className='mt-4 bg-rojo2 w-full rounded-lg text-light text-center text-md p-2'>Eliminar turnos 6 meses atras</button>
    </div>
  )
}

export default Turno
