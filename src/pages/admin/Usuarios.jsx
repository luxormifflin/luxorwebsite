import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { crearVenta } from 'utils/api';
import { obtenerVehiculos } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';

const Usuarios = () => {
  const form = useRef(null);
  const [email, setEmail] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosTabla, setUsuariosTabla] = useState([]);
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);

  useEffect(() => {
    // const fetchVendedores = async () => {
    //   await obtenerUsuarios(
    //     (response) => {
    //       console.log('respuesta de usuarios', response);
    //       setVendedores(response.data);
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // };
    const traerUsuarios = async () => {
      await obtenerUsuarios(
        (response) => {
          setUsuarios(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    //fetchVendores();
    traerUsuarios();
  }, []);

  useEffect(() => {
    console.log('usuarios seleccionados', usuariosSeleccionados);
  }, [usuariosSeleccionados]);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    console.log('form data', formData);

    // const listaUsuarios = Object.keys(formData)
    //   .map((k) => {
    //     if (k.includes('usuario')) {
    //       return usuariosTabla.filter((v) => v._id === formData[k])[0];
    //     }
    //     return null;
    //   })
    //   .filter((v) => v);

    // console.log('lista antes de cantidad', listaUsuarios);

    // Object.keys(formData).forEach((k) => {
    //   if (k.includes('cantidad')) {
    //     const indice = parseInt(k.split('_')[1]);
    //     listaVehiculos[indice]['cantidad'] = formData[k];
    //   }
    };

    // console.log('lista despues de cantidad', listaVehiculos);

    // const datosVenta = {
    //   vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
    //   cantidad: formData.valor,
    //   vehiculos: listaVehiculos,
    // };

    //console.log('lista usuarios', listaUsuarios);

    // await crearVenta(
    //   datosVenta,
    //   (response) => {
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <form ref={form} onSubmit={submitForm} className='flex flex-col h-full'>
        <h1 className='text-3xl font-extrabold text-gray-900 my-3'>Gestión de Usuarios</h1>
        <label className='flex flex-col' htmlFor='vendedor'>
          <span className='text-1xl font-gray-900'>Correo Electrónico</span>
           {email.map((el) => {
              return <option key={nanoid()} value={el._id}>{`${el.nombre} ${el.apellido} ${el.correo}`}</option>;
            })}
        </label>

        <TablaUsuarios
          usuarios={usuarios}
          setUsuarios={setUsuarios}
          setUsuariosTabla={setUsuariosTabla}
        />
        
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar Cambios
        </button>

      {usuariosSeleccionados.map((DropDownUsuario, index) => {
      return (
        <div className='flex'>
          <DropDownUsuario key={nanoid()} usuarios={usuarios} nombre={`usuario_${index}`} />
        </div>
      );
    })}
      </form>
    </div>

  );
};   


const TablaUsuarios = ({ usuarios, setUsuarios, setUsuariosTabla }) => {
  const [usuarioAAgregar, setUsuarioAAgregar] = useState({});
  const [filasTabla, setFilasTabla] = useState([]);

  useEffect(() => {
    console.log(usuarioAAgregar);
  }, [usuarioAAgregar]);

  useEffect(() => {
    console.log('filasTabla', filasTabla);
    setUsuariosTabla(filasTabla);
  }, [filasTabla, setUsuariosTabla]);

  const buscarUsuario = () => {
    setFilasTabla([...filasTabla, usuarioAAgregar]);
    setUsuarios(usuarios.filter((v) => v._id !== usuarioAAgregar._id));
    setUsuarioAAgregar({});
  };

  // const eliminarVehiculo = (vehiculoAEliminar) => {
  //   setFilasTabla(filasTabla.filter((v) => v._id !== vehiculoAEliminar._id));
  //   setVehiculos([...vehiculos, vehiculoAEliminar]);
  // };

  return (
    <div>
      <div className='flex '>
        <label className='flex flex-col' htmlFor='usuario'>
            <input
                className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                type='email'
                name='correo'
                placeholder="usuario@gmail.com"
                required
            />
            </label>
        <button
          type='button'
          onClick={() => buscarUsuario()}
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Buscar Usuario
        </button>
      </div>
      <table className='tabla'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th className='hidden'>Input</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((el, index) => {
            return (
              <tr key={nanoid()}>
                <td>{el._id}</td>
                <td>{el.nombre}</td>
                <td>{el.apellido}</td>
                <td>{el.correo}</td>
                <td>
                <label className='flex flex-col' htmlFor='marca'>
                    <select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='estado'
                        required
                        defaultValue={0}
                    >
                        <option hidden selected>Selecciona un rol</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </label>
                </td>
                <td>
                  
                  <label className='flex flex-col' htmlFor='marca'>
                    <select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='estado'
                        required
                        defaultValue={0}
                    >
                        <option hidden selected>Selecciona un estado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Autorizado">Autorizado</option>
                        <option value="NoAutorizado">No Autorizado</option>
                    </select>
                </label>
                </td>
                <input hidden defaultValue={el._id} name={`vehiculo_${index}`} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;