import Calendario from './Calendario'
import Turno from './Turno'

const HomeAgenda = () => {
  return (
    <div
      className='flex items-center justify-between flex-row shadow-xl bg-fondoPrincipal px-14 rounded-lg'
      style={{ width: '80vw', height: '80vh' }}
    >
      <Calendario />
      <Turno />
    </div>
  )
}

export default HomeAgenda
