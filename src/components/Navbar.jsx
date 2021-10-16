import React from 'react';
import Logo from 'media/logo.png';
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <nav className='bg-white'>
        <div className='flex w-full mx-auto justify-between my-3 items-center'>
            <ul className='flex justify-between items-start'>
            <li className='bg-gray-200 p-0 m-1 rounded-t-lg'><a href='/'>Principal</a></li>
            <li className='bg-gray-200 p-0 m-1 rounded-t-lg'><a href='/admin/ventas'>Gestión de Ventas</a></li>
            <li className='bg-gray-200 p-0 m-1 rounded-t-lg'><a href='/admin/productos'>Gestión de Productos</a></li>
            <li className='bg-gray-200 p-0 m-1 rounded-t-lg'><a href='/admin/usuarios'>Gestión de Usuarios & Roles</a></li>
            <li className='px-3'>
                <div className='flex flex-end w-full items-end'>
                <button 
                onClick={() => loginWithRedirect()}
                className='bg-gray-600 p-1 text-white rounded-lg shadow-md hover:bg-green-200'>
                Iniciar Sesión
                </button>
                </div>
            </li>
            </ul>
        </div>
            <div className='flex mx-auto bg-center bg-gray-200 justify-between border border-gray-300' >
                <h1 className=' text-3xl bg-center mt-2 mx-10'>[<span className="text-green-300">L</span>] Luxor Mifflin Inc.</h1>
                <img src={Logo} alt='Logo' className='h-20 w-30' />
            </div>
        </nav>
    );
};

export default Navbar;
