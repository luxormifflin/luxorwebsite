import React, { useState, useEffect, useRef } from 'react';
import { editarUsuario } from 'utils/api';

const Usuarios =() => {
    const form =useRef(null);
    const [rol, setRol]=useState([])
    const [estado, setEstado]=useState([])
    const [usuariosTabla, setUsuariosTabla] = useState([]);
    



    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col w-full'>
                <h2 className='text-3xl font-extrabold text-gray-900'>
                    Gestión de Usuarios
                </h2>
            </div>

    
        </div>
    );    
    };


export default Usuarios;