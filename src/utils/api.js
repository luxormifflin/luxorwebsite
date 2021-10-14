import axios from 'axios';

export const obtenerProductos = async (setProductos, setEjecutarConsulta) => {
    const options = { method: 'GET', url: 'https://localhost:5000/productos/' };
    await axios
        .request(options)
        .then(function (response) {
            setProductos(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
    setEjecutarConsulta(false);
};

// CRUD PARA USUARIOS

export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/usuarios' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD DE VENTAS

export const crearVenta = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/ventas',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const obtenerVehiculos = async (successCallback, errorCallback) => {
    const options = { method: 'GET', url: 'http://localhost:5000/vehiculos/' };
    await axios.request(options).then(successCallback).catch(errorCallback);
  };
