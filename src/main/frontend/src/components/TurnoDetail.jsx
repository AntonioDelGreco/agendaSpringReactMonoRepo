import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { turnoDetailAtom } from '../utils/atom.js'
import { Link } from 'react-router-dom'
import axios from 'axios'

const TurnoDetail = () => {
  const [turno] = useAtom(turnoDetailAtom)
  const [turnoCompleto, setTurnoCompleto] = useState(turno[0])
  const [alerta, setAlerta] = useState()

  if (!turno || turno.length === 0) {
    return <div>No se encontró la información del turno.</div>
  }

  const putData = useCallback(async (turnoUpdated) => {
    try {
      const turnoPut = await axios.put(
        `http://localhost:8080/api/agenda/${turnoUpdated.id}`,
        turnoUpdated
      )

      if (!turnoPut) {
        throw new Error()
      }
      setAlerta({
        success: true,
        msg: 'Se actualizo correctamente el turno.'
      })
    } catch (err) {
      setAlerta({
        success: false,
        msg: err.response?.data?.errorMessage
      })
    }
  }, [])

  const deleteData = useCallback(async (id) => {
    try {
      const deleteTurno = await axios.delete(`http://localhost:8080/api/agenda/${id}`)

      if (!deleteTurno) {
        throw new Error()
      }

      setAlerta({
        success: true,
        msg: deleteTurno.data
      })
      setTurnoCompleto({
        nombre: '',
        obra_social: '',
        telefono: '',
        tratamiento: '',
        importe: 0,
        dia: '',
        hora: '',
        pagado: false
      })
    } catch (err) {
      setAlerta({
        success: false,
        msg: err.response.data.errorMessage
      })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    let formattedValue = value

    if (type === 'time') {
      formattedValue = `${value}:00`
    }

    setTurnoCompleto({
      ...turnoCompleto,
      [name]: type === 'checkbox' ? checked : formattedValue
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    putData(turnoCompleto)
  }

  const handleDelete = () => {
    deleteData(turnoCompleto.id)
  }

  return (
    <div className='grid place-content-center bg-fondoPrincipal p-8 rounded-lg shadow-xl gap-5'>
      <h1 className='text-center text-4xl'>Turno</h1>
      <form className='flex flex-row items-center gap-10' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3'>
          <label className='font-bold'>
            Nombre:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='text'
              name='nombre'
              value={turnoCompleto.nombre}
              onChange={handleChange}
            />
          </label>

          <label className='font-bold'>
            Obra Social:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='text'
              name='obra_social'
              value={turnoCompleto.obra_social}
              onChange={handleChange}
            />
          </label>
          <label className='font-bold'>
            Teléfono:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='text'
              name='telefono'
              value={turnoCompleto.telefono}
              onChange={handleChange}
            />
          </label>
          <label className='font-bold'>
            Tratamiento:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='text'
              name='tratamiento'
              value={turnoCompleto.tratamiento}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='flex flex-col gap-3'>
          <label className='font-bold'>
            Importe:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='number'
              name='importe'
              value={turnoCompleto.importe}
              onChange={handleChange}
            />
          </label>
          <label className='font-bold'>
            Día:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='date'
              name='dia'
              value={turnoCompleto.dia}
              onChange={handleChange}
            />
          </label>
          <label className='font-bold'>
            Hora:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='time'
              name='hora'
              value={turnoCompleto.hora}
              onChange={handleChange}
            />
          </label>
          <label className='font-bold flex items-center'>
            Pagado:
            <input
              className='p-1 h-5 w-5 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='checkbox'
              name='pagado'
              checked={turnoCompleto.pagado}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          className='bg-resaltado h-full rounded-lg text-light px-5 py-1 hover:bg-dark hover:text-light cursor-pointer transition-all'
          type='submit'
        >
          Guardar
        </button>
      </form>
      <div className='flex items-center justify-between'>
        <button
          onClick={handleDelete}
          className='bg-resaltado rounded-lg text-light px-7 py-1 hover:bg-dark hover:text-light cursor-pointer transition-all'
        >
          Eliminar
        </button>
        <Link
          className='bg-resaltado rounded-lg text-light px-7 py-1 hover:bg-dark hover:text-light cursor-pointer transition-all'
          to='/#'
        >
          Volver
        </Link>
      </div>
      {alerta
        ? (
          <h2
            className={`${alerta.success ? 'bg-resaltado' : 'bg-rojo'} text-center rounded-lg text-light p-2`}
          >
            {alerta.msg}
          </h2>
          )
        : (
            ''
          )}
    </div>
  )
}

export default TurnoDetail
