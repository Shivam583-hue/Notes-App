import axios from 'axios';
import React from 'react'

function Categories({categs} : any) {

    async function clickHandler(){
        const response = await axios.get('/api/notes')
        
    }

    return (
        <div className='pl-7 pt-2 cursor-pointer'>
            <button className='font-mono hover:text-[#176f5e] text-[#009378] font-bold text-lg' onClick={clickHandler}>‣ {categs}</button>
        </div>
  )
}
export default Categories;
