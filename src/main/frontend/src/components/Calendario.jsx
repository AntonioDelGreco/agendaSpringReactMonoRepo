import dayjs from 'dayjs'
import { useState, useEffect, useCallback } from 'react'
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr'
import { generateDate, months } from '../utils/calendar.js'
import cn from '../utils/cn.js'
import { dateAtom } from '../utils/atom.js'
import { useSetAtom } from 'jotai'
import axios from 'axios'

const Calendario = () => {
  const currentDate = dayjs()
  const days = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO']
  const [toggleOn, setToggleOn] = useState(true)
  const [today, setToday] = useState(currentDate)
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [data, setData] = useState({})
  const setDate = useSetAtom(dateAtom)

  const fetchData = useCallback(async (monthSelected) => {
    try {
      const URL = 'http://localhost:8080/api/agenda/cant-mes'
      const response = await axios.get(URL)
      const data = response.data
      setData(data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    fetchData(currentDate.month() + 1)
  }, [])

  useEffect(() => {
    setDate(selectedDate)
  }, [selectedDate])

  const handleToggleCountDates = () => setToggleOn((toggleOn) => !toggleOn)
  const handleInputClick = (e) => e.stopPropagation()

  return (
    <div className='w-5/12 h-96'>
      {/* fecha y botones de hoy y texto de mes */}
      <div className='flex items-center justify-between'>
        <h2 className='text-dark uppercase text-lg'>
          {months[today.month()]}, {today.year()}
        </h2>
        <label
          onClick={handleToggleCountDates}
          htmlFor='check'
          className='bg-resaltado w-20 h-9 relative rounded-full cursor-pointer'
        >
          <input onClick={handleInputClick} type='checkbox' id='check' className='sr-only peer' />
          <span className='w-2/5 h-4/5 bg-light absolute rounded-full left-1 top-1 peer-checked:bg-dark peer-checked:left-11 transition-all duration-500' />
        </label>
        <div className='flex items-center gap-5'>
          <GrCaretPrevious
            className='w-5 h-5 text-dark cursor-pointer'
            onClick={() => {
              setToday(today.month(today.month() - 1))
            }}
          />
          <h1
            className='bg-resaltado rounded-lg text-light px-5 py-1 hover:bg-dark hover:text-light cursor-pointer transition-all'
            onClick={() => {
              setSelectedDate(currentDate)
              setToday(currentDate)
            }}
          >
            Hoy
          </h1>
          <GrCaretNext
            className='w-5 h-5 text-dark cursor-pointer'
            onClick={() => {
              setToday(today.month(today.month() + 1))
            }}
          />
        </div>
      </div>

      {/* Dias de la semana */}
      <div className='w-full grid grid-cols-7'>
        {days.map((day, index) => {
          return (
            <h2 key={index} className='text-dark h-14 grid place-content-center text-sm'>
              {day}
            </h2>
          )
        })}
      </div>

      {/* Dias en numeros */}
      <div className='w-full grid grid-cols-7'>
        {generateDate(today.month(), today.year()).map((elem, index) => {
          return (
            <div key={index} className='h-14 border-dark border-t grid place-content-center'>
              <p
                className={cn(
                  'h-10 w-10 grid place-content-center rounded-full cursor-pointer transition-all',
                  elem.currentMonth ? 'text-dark' : 'text-offLight',
                  selectedDate.toDate().toDateString() === elem.date.toDate().toDateString()
                    ? 'bg-dark text-light'
                    : 'hover:bg-dark hover:text-light',
                  elem.today && 'bg-resaltado',
                  toggleOn &&
                    elem.date.format('YYYY-MM-DD') in data &&
                    data[elem.date.format('YYYY-MM-DD')] === 'naranja' &&
                    'bg-naranja',
                  toggleOn &&
                    elem.date.format('YYYY-MM-DD') in data &&
                    data[elem.date.format('YYYY-MM-DD')] === 'amarillo' &&
                    'bg-amarillo',
                  toggleOn &&
                    elem.date.format('YYYY-MM-DD') in data &&
                    data[elem.date.format('YYYY-MM-DD')] === 'rojo' &&
                    'bg-rojo'
                )}
                onClick={() => {
                  setSelectedDate(elem.date)
                }}
              >
                {elem.date.date()}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendario
