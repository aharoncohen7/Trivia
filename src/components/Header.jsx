import React, { useState } from 'react'

const Header = () => {
    const [color, setColor]= useState("text-blue-800")
    const links = [
        { id: 1, name: 'Home', href: '/' },
        { id: 2, name: 'About', href: '/about' },
        { id: 3, name: 'Contact', href: '/contact' },
    ]


    return (
        <header className='h-16 bg-white-700 text-white flex justify-center items-center shadow-md'>
            <span  className={`${color} font-bold text-2xl p-3`}>Tri<span  className='text-black'>via</span></span>
            <div className='container h-full mx-auto flex items-center justify-between'>
                <nav>
                    <ul className='flex gap-4'>
                        {links.map((link) => 
                            <li key={link.id}>
                                <a className='font-semibold text-black hover:text-yellow-300' href={link.href}>{link.name}</a>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
