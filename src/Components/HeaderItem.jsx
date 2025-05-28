import React from 'react'

function HeaderItem({name, Icon}) {
  return (
    <div className='ml-4 text-white flex items-center gap-4
    text-[15px] font-semibold cursor-pointer hover:underline
    underline-offset-8 mb-2'>
        <Icon/>
        <h2 className=''>{name}</h2>
    </div>
  )
}

export default HeaderItem