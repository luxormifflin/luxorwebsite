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

//api usuarios xD

export const obtenerUsuarios = async (successCallback, errorCallback) => {
    const options = { method: 'GET', url: 'http://localhost:5000/usuarios/' };
    await axios.request(options).then(successCallback).catch(errorCallback);
};  