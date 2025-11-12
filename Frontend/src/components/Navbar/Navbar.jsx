import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar h-100 py-3'>
      <div id='title-name' className='text-4xl font-bold ps-4'>Manora</div>
      <div className='flex'>
        <ul className='my-auto flex gap-4'>
          <li><Link className='text-black font-semibold text-lg' to='/'>Home</Link></li>
          <li><Link className='text-black font-semibold text-lg' to={'/lost-and-found'}>Lost & Found</Link></li>
          <li><Link className='text-black font-semibold text-lg' to={'/contest'}>Contest</Link></li>
          <li><Link className='text-black font-semibold text-lg' to={'/winners'}>Winners</Link></li>
          <li><Link className='text-black font-semibold text-lg' to={'/reviews'}>Reviews</Link></li>
        </ul>
      </div>
      <div className='search-bar flex gap-2 px-4'>
        <input type="text" className='border bg-white w-110' placeholder='  Search'/>
        <button className='border border-black px-3 py-1 font-bold text-gray-500'>Search</button>
      </div>
    </div>
  )
}

export default Navbar
