import React, { useEffect, useState, useRef } from 'react'
import { obtenerUsuarios, editarUsuario } from 'utils/api';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Usuarios = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [Usuarios, setUsuarios] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Consultar usuario');
    const [colorBoton, setColorBoton] = useState('indigo'); //cambiar color
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
    //const [rolUsuario, setRolUduario] = useState(true);
    
    useEffect(() => {
        console.log('consultaUsuario', ejecutarConsulta);
        if (ejecutarConsulta) {
          obtenerUsuarios(
            (response) => {
              console.log('la respuesta que se recibió fue', response);
              setUsuarios(response.data);
            },
            (error) => {
              console.error('Error al consultar usuario:', error);
            }
          );
          setEjecutarConsulta(false);
        }
      }, [ejecutarConsulta]);

    useEffect(() => {
    //obtener lista de usuarios desde el backend
    if (mostrarTabla) {
        setEjecutarConsulta(true);
    }
    }, [mostrarTabla]);
    
    useEffect(() => {
        if (mostrarTabla) {
          setTextoBoton('Buscar usuario'); //aquí debería estar al lado el input del correo 
          setColorBoton('indigo');
        } else {
          setTextoBoton('Mostrar Todos los usuarios');
          setColorBoton('green');
        }
      }, [mostrarTabla]);
    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col w-full'>
                <h2 className='text-3xl font-extrabold text-gray-900'>
                    Gestión de usuarios
                </h2>
                <button
                    onClick={() => {
                        setMostrarTabla(!mostrarTabla);
                    }}
                    className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}//el color está definido arriba
                >   
                    {textoBoton}
                </button>
            </div>
            {mostrarTabla ? (
            <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} />
            ) : (
            <FormularioCreacionUsuarios
                setMostrarTabla={setMostrarTabla}
                listaUsuarios={usuarios}
                setUsuarios={setUsuarios}
            />
            )}
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>
    )
};

const TablaUsuarios = ({ listaUsuarios, setEjecutarConsulta }) => {
    const [busquedaUsuario, setBusquedaUsuario] = useState('');
    const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);
    
    useEffect(() => {
        setUsuariosFiltrados(
          listaUsuarios.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busquedaUsuario.toLowerCase());
          })
        );
      }, [busquedaUsuario, listaUsuarios]);
return (
    <div className='flex flex-col items-center justify-center w-full'>
      <input
        value={busquedaUsuario}
        onChange={(e) => setBusquedaUsuario(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
      />
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los usuarios</h2>
      <div className='hidden md:flex w-full'>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo electrónico</th>
            </tr>
            </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => {
              return (
                <FilaUsuario
                  key={nanoid()}
                  usuario={usuario}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
          </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {usuariosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.nombre}</span>
              <span>{el.apellidos}</span>
              <span>{el.correo}</span>
            </div>
          );
        })}
      </div>
    </div>
);
};
export default Usuarios;
