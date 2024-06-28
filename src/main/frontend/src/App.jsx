import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeAgenda from './components/HomeAgenda'
import TurnoDetail from './components/TurnoDetail'
import AddTurno from './components/AddTurno'

function App () {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeAgenda />} />
          <Route path='turno-detail' element={<TurnoDetail />} />
          <Route path='add-turno' element={<AddTurno />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
