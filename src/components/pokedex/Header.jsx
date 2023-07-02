import React from 'react'
import { setNameTrainer } from '../../store/slices/nameTrainer.slice'
import { useDispatch } from 'react-redux'

const Header = () => {

  const dispatch = useDispatch()

  const handleClickLogout = () => {
    dispatch(setNameTrainer(""))
  }

  return (
    <section className='relative '>

      {/*Sección superior */}
      <div className='bg-red-500 h-14 relative'>

        <div className='absolute left-6 -bottom-2'>
          <img className='max-h-14 md:h-auto md:w-40' src='/images/logo.png' alt='' />
        </div>


      </div>

      {/* Sectión negra*/}

      <div>
        <div className='bg-black h-10'></div>
      </div>


      {/* Botón POKEBALL*/}

      {/* Botón POKEBALL*/}
      <div className=" absolute p-0 right-1.5 -bottom-5">
        <div className="w-20 aspect-square">
          <button onClick={handleClickLogout} className="absolute left-10 top-1/2 transform translate-x-1 -translate-y-1/2 z-20" title='cerrar'>

            <img src="/images/pokebola.png" alt="X" className="w-auto h-8 scroll-py-6" />
          </button>
        </div>

      </div>








    </section >
  )
}

export default Header