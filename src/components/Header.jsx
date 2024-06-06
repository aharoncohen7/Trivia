import React, { useEffect, useState } from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTriviaStore } from '../stores';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const darkMode = useTriviaStore(state => state.darkMode);
    const setPrimaryColor = useTriviaStore(state => state.setPrimaryColor);
    const primaryColor = useTriviaStore(state => state.primaryColor);
    const setDarkMode = useTriviaStore(state => state.setDarkMode);
    const user = useTriviaStore(state => state.user)


    const links = [
        { id: 1, name: 'Home', href: '/home' },
        { id: 2, name: 'Favorites', href: '/favorites' },
        { id: 3, name: 'Play', href: '/play' },
        { id: 4, name: 'About', href: '/about' },
        { id: 5, name: 'Contact', href: '/contact' },
    ]

    useEffect(()=>{
        const elements = document.getElementsByTagName("li")
        for (const element of elements) {
            element.style.color = darkMode? "white": "black";
          }
    },[darkMode] )

    const changeColor = (e)=>{
        e.target.style.color = primaryColor;
    }
    const changeColorBack = (e)=>{
        e.target.style.color =darkMode? "white": "black"
    }
        


    return (
        <header className={`h-16 ${darkMode ? 'bg-black text-white' : 'bg-white-700 text-black'} flex justify-center items-center shadow-md`}>
            <span style={{ color: primaryColor }} className='font-bold text-2xl p-3'>Tri<span className={darkMode ? 'text-white' : 'text-black'}>via</span></span>
            <div className='container h-full mx-auto flex items-center justify-between'>
                <nav>
                    <ul className='flex gap-6 p-8'>
                        {links.map((link, i) =>
                            <NavLink key={i} to={link.href}> 
                                <li
                                name="link"
                                my-color={primaryColor} 
                                onMouseOver={changeColor}
                                onMouseOut={changeColorBack}
                                className={`links font-semibold hover:text-blue-300 h-full`} key={link.id}>
                                {link.name}

                            </li></NavLink>
                        )}
                    </ul>
                </nav>
            </div>
            <span className='w-56 flex items-center justify-center '>
                <div>{`${user.name}`}</div>
                <input className='border border-slate-300 m-4' type="color" value={primaryColor} onChange={(e) => {
                    console.log(e.target.value)
                    setPrimaryColor(e.target.value)
                }} />

                {darkMode ? <MdOutlineLightMode size={30} onClick={setDarkMode} /> : <MdDarkMode onClick={setDarkMode} size={30} />}

            </span>
        </header>
    )
}

export default Header
