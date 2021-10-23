import axios from 'axios';

//const baseURL = "http://localhost:5000"
const baseURL = "https://sheltered-depths-75968.herokuapp.com"

const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`;
};

export const obtenerProductos = async (successCallback, errorCallback) => {
    const options = { 
        method: 'GET', 
        url: `${baseURL}/productos/`,
        headers: {
        Authorization: getToken(),
    },
};
    await axios.request(options).then(successCallback).catch(errorCallback); 
};

export const crearProducto = async (data, successCallback, errorCallback) => {
    const options = {
        method: 'POST',
        url: `${baseURL}/productos/`,
        headers: {'Content-Type': 'application/json', Authorization: getToken()},   
        data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarProducto = async (id, data, successCallback, errorCallback) => {
    console.log("editar producto", id, data)
    const options = { 
        method: 'PATCH',
        url: `${baseURL}/productos/${id}/`,
        headers: {'Content-Type':'aplication/json', Authorization: getToken() },
        data,
    };
    console.log('opcionesssssssssssss', options)
    await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarProducto = async (id, successCallback, errorCallback) => {
    const options = {
        method: 'DELETE',
        url: `${baseURL}/productos/${id}/`,
        headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD PARA USUARIOS

export const obtenerUsuarios = async (successCallback, errorCallback) => {
    const options = { 
        method: 'GET', 
        url: `${baseURL}/usuarios/`,
        headers: {
            Authorization: getToken(),
        } };
    await axios.request(options).then(successCallback).catch(errorCallback);
};
export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
    const options = { 
        method: 'GET', 
        url: `${baseURL}/usuarios/self/`, //ruta dummie, mi ruta, info personal
        headers: {
            Authorization: getToken(), //3. Enviarle el token al backend
        } };
    await axios.request(options).then(successCallback).catch(errorCallback);
};
export const editarUsuario = async (id, data, successCallback, errorCallback) => {
    const options = { 
        method: 'PATCH',
        url: `${baseURL}/usuarios/${id}/`,
        headers: {'Content-Type':'aplication/json', Authorization: getToken() },
        data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};
// CRUD DE VENTAS

export const crearVenta = async (data, successCallback, errorCallback) => {
    const options = {
        method: 'POST',
        url: `${baseURL}/ventas/git a`,
        headers: { 'Content-Type': 'application/json' },
        data,
    };
    await axios.request(options).then(successCallback).catch(errorCallback);
};

  // export const obtenerUsuarios = async (setVehiculos, setEjecutarConsulta = () => {}) => {
  //   const options = { method: 'GET', url: `${baseURL}/usuarios/` };
  //   await axios
  //     .request(options)
  //     .then(function (response) {
  //       setVehiculos(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  //   setEjecutarConsulta(false);
  // };
