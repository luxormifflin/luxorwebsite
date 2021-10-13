import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { crearVenta } from 'utils/api';
import { obtenerVehiculos } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';

const Usuarios = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosTabla, setVehiculosTabla] = useState([]);

  useEffect(() => {
    const fetchVendores = async () => {
      await obtenerUsuarios(
        (response) => {
          console.log('respuesta de usuarios', response);
          setVendedores(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const fetchVehiculos = async () => {
      await obtenerVehiculos(
        (response) => {
          setVehiculos(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    fetchVendores();
    fetchVehiculos();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    console.log('form data', formData);

    const listaVehiculos = Object.keys(formData)
      .map((k) => {
        if (k.includes('vehiculo')) {
          return vehiculosTabla.filter((v) => v._id === formData[k])[0];
        }
        return null;
      })
      .filter((v) => v);

    console.log('lista antes de cantidad', listaVehiculos);

    Object.keys(formData).forEach((k) => {
      if (k.includes('cantidad')) {
        const indice = parseInt(k.split('_')[1]);
        listaVehiculos[indice]['cantidad'] = formData[k];
      }
    });

    console.log('lista despues de cantidad', listaVehiculos);

    const datosVenta = {
      vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
      cantidad: formData.valor,
      vehiculos: listaVehiculos,
    };

    console.log('lista vehiculos', listaVehiculos);

    await crearVenta(
      datosVenta,
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <form ref={form} onSubmit={submitForm} className='flex flex-col h-full'>
        <h1 className='text-3xl font-extrabold text-gray-900 my-3'>Gestión de Usuarios</h1>
        <label className='flex flex-col' htmlFor='vendedor'>
          <span className='text-1xl font-gray-900'>Correo Electrónico</span>
          
        </label>

        <TablaVehiculos
          vehiculos={vehiculos}
          setVehiculos={setVehiculos}
          setVehiculosTabla={setVehiculosTabla}
        />

        
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

const TablaVehiculos = ({ vehiculos, setVehiculos, setVehiculosTabla }) => {
  const [vehiculoAAgregar, setVehiculoAAgregar] = useState({});
  const [filasTabla, setFilasTabla] = useState([]);

  useEffect(() => {
    console.log(vehiculoAAgregar);
  }, [vehiculoAAgregar]);

  useEffect(() => {
    console.log('filasTabla', filasTabla);
    setVehiculosTabla(filasTabla);
  }, [filasTabla, setVehiculosTabla]);

  const agregarNuevoVehiculo = () => {
    setFilasTabla([...filasTabla, vehiculoAAgregar]);
    setVehiculos(vehiculos.filter((v) => v._id !== vehiculoAAgregar._id));
    setVehiculoAAgregar({});
  };

  const eliminarVehiculo = (vehiculoAEliminar) => {
    setFilasTabla(filasTabla.filter((v) => v._id !== vehiculoAEliminar._id));
    setVehiculos([...vehiculos, vehiculoAEliminar]);
  };

  return (
    <div>
      <div className='flex '>
        <label className='flex flex-col' htmlFor='vehiculo'>
            <input
                className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                type='number'
                name='valor'
                required
            />
            </label>
        <button
          type='button'
          onClick={() => agregarNuevoVehiculo()}
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
                        <option value="Pendiente">Pendiente</option>
                        <option value="Autorizado">Autorizado</option>
                        <option value="NoAutorizado">No Autorizado</option>
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
                        <option value="Disponible">Disponible</option>
                        <option value="No Disponible">No Disponible</option>
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