import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAtom } from 'jotai'
import { dateAtom } from '../utils/atom.js'

const AddTurno = () => {
  const [date] = useAtom(dateAtom)
  const dia = date.format('YYYY-MM-DD')

  const [turnoCompleto, setTurnoCompleto] = useState({
    nombre: '',
    obra_social: '',
    telefono: '',
    tratamiento: '',
    importe: 0,
    dia: '',
    hora: '',
    pagado: false
  })
  const [alerta, setAlerta] = useState()

  const postData = useCallback(async (newTurno) => {
    newTurno.dia = dia

    console.log(newTurno)
    try {
      const response = await axios.post('http://localhost:8080/api/agenda', newTurno)
      if (!response) {
        throw new Error()
      }
      setAlerta({
        success: true,
        msg: 'El turno se agregó correctamente.'
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
        msg: err.response.data.errorMessage || 'Hubo un error al agregar el turno.'
      })
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    let inputValue = value

    if (type === 'checkbox') {
      inputValue = checked
    } else if (name === 'hora' && type === 'time') {
      inputValue = value.length === 5 ? `${value}:00` : value
    }

    // Actualizar el estado
    setTurnoCompleto((prevState) => ({
      ...prevState,
      [name]: inputValue
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postData(turnoCompleto)
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
              onChange={handleInputChange}
            />
          </label>

          <label className='font-bold'>
            Obra Social:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='text'
              name='obra_social'
              value={turnoCompleto.obra_social}
              onChange={handleInputChange}
            />
          </label>
          <label className='font-bold'>
            Teléfono:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='text'
              name='telefono'
              value={turnoCompleto.telefono}
              onChange={handleInputChange}
            />
          </label>
          <label className='font-bold'>
            Tratamiento:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='text'
              name='tratamiento'
              value={turnoCompleto.tratamiento}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
          </label>
          <label className='font-bold'>
            Hora:
            <input
              className='p-1 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='time'
              name='hora'
              value={turnoCompleto.hora}
              onChange={handleInputChange}
            />
          </label>
          <label className='font-bold flex items-center'>
            Pagado:
            <input
              className='p-1 h-5 w-5 text-center ml-5 border rounded-md shadow-sm sm:text-sm'
              type='checkbox'
              name='pagado'
              checked={turnoCompleto.pagado}
              onChange={handleInputChange}
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

export default AddTurno
