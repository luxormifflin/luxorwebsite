import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { editarUsuario } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState ([]);
  //   const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  //   const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
      
  //     rol: producto.rol,
  //     estado: producto.estado,
  // });
    useEffect(() => {
       const traerUsuarios = async() =>{
           await obtenerUsuarios(
               (respuesta)=> {
                console.log('usuarios', respuesta.data);
                setUsuarios(respuesta.data);
              },
              (err) => {
                console.log(err);
           }
           );
       };
       traerUsuarios()
    }, []);


    //estado para guardar usuario

    // const guardarUsuario = async () => {
    //   //enviar la info al backend

    //   await editarUsuario(
    //       usuario._id,
    //       {
    //           rol: infoNuevoUsuario.rol,
    //           estado: infoNuevoUsuario.estado,
    //       },
    //       (response) => {
    //           console.log(response.data);
    //           toast.success('Usuario modificado con éxito');
    //           setEdit(false);
    //           setEjecutarConsulta(true);
    //       },
    //       (error) => {
    //           toast.error('Error modificando el usuario');
    //           console.error(error);
    //       }
    //     );
    // };

//termina estado para guardar usuario

    return (
        <div>
          <div className='text-3xl font-extrabold text-gray-900'>Administración de usuarios</div>
          <table className='tabla'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Rol</th>
                <th>Acciones</th>

              </tr>
            </thead>
            <tbody>
              {usuarios.map((user) => {
                return (
                  <tr key={nanoid()}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <EstadoUsuario user={user} />
                    </td>
                    <td>
                      <RolesUsuario user={user} />
                    </td>

{/* columna de acciones */}

                    {/* <td>
                        <div className='flex w-full justify-around'>
                            {edit ? (
                                <>
                                    <Tooltip title='Confirmar Edición' arrow>
                                        <i
                                            onClick={() => guardarUsuario()}
                                            className='fas fa-check text-green-700 hover:text-green-500'
                                        />
                                    </Tooltip>            
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </div>  
                    </td> */}

{/* se termina columna de acciones */}

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    };

const RolesUsuario = ({ user }) => {
    const [rol, setRol] = useState(user.rol);
    
    useEffect(() => {
        const editUsuario = async () => {
        await editarUsuario(
            user._id,
            { rol },
            (res) => {
            console.log(res);
            },
            (err) => {
            console.error(err);
            }
        );
    };
        if (user.rol !== rol) {
        editUsuario();
        }
    }, [rol, user]);
    
    return (
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value='' disabled>
                Seleccione un rol
            </option>
            <option value='admin'>Admin</option>
            <option value='vendedor'>Vendedor</option>
            <option value='sin rol'>Sin rol</option>
        </select>
    );
};

const EstadoUsuario = ({ user }) => {
    const [estado, setEstado] = useState(user.estado ?? '');
  
    useEffect(() => {
      const editUsuario = async () => {
        await editarUsuario(
          user._id,
          { estado },
          (res) => {
            console.log(res);
          },
          (err) => {
            console.error(err);
          }
        );
      };
      if (user.estado !== estado) {
        editUsuario();
      }
    }, [estado, user]);

    return (
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value='' disabled>
            Seleccione un estado
          </option>
          <option value='autorizado' className='text-green-500'>
            Autorizado
          </option>
          <option value='pendiente' className='text-yellow-500'>
            Pendiente
          </option>
          <option value='rechazado' className='text-red-500'>
            Rechazado
          </option>
        </select>
      );
    };
      
export default Usuarios;
