import React from 'react'
import DateBoxes from './DateBoxes'

const Habbit = ({habbit}) => {
  return (
    <div className='List'>
     <li> {habbit.task}
     {/* <button onClick={del(habbit?.id)}>deletwe</button> */}
     </li>
    </div>
  )
}

export default Habbit
