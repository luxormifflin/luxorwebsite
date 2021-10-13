import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {nanoid} from 'nanoid';
import {Dialog, Tooltip} from '@material-ui/core';
import { obtenerProductos } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';


const Productos = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [productos, setProductos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');
    const [colorBoton, setColorBoton] = useState('indigo');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);


    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerProductos(setProductos, setEjecutarConsulta);
        }
    }, [ejecutarConsulta]);

    useEffect(() => {
        //obtener lista de productos desde el backend//
        if (mostrarTabla) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTabla]);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear Nuevo Producto');
            setColorBoton("green")
        } else {
            setTextoBoton('Mostrar todos los Productos');
            setColorBoton("gray")
        }

    }, [mostrarTabla])

    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col w-full'>
                <h2 className='text-3xl font-extrabold text-gray-900'>
                    Página de administración de productos
                </h2>
                <button
                    onClick={() => {
                        setMostrarTabla(!mostrarTabla);
                    }}
                    className={`text-white bg-${colorBoton}-400 p-5 rounded-full m-4 w-28 self-end`}
                >
                    {textoBoton}
                </button>
            </div>
            {mostrarTabla ? (
                <TablaProductos listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta} />
            ) : (
                <FormularioCreacionProductos
                    setMostrarTabla={setMostrarTabla}
                    listaProductos={productos}
                    setProductos={setProductos}
                />
            )}
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>
    );
};

const TablaProductos = ({ listaProductos, setEjecutarConsulta }) => {
    const [busqueda, setBusqueda] = useState('');
    const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

    useEffect(() => {
        setProductosFiltrados(
            listaProductos.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
            })
        );
    }, [busqueda, listaProductos]);

    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder='Buscar'
                className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
            />
            <h2 className='text-2xl font-extrabold text-gray-800'>Todos los Productos</h2>
            <div className='hidden md:flex w-full'>
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Código Producto</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Valor</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map((Producto) => {
                            return (
                                <FilaProducto
                                    key={nanoid()}
                                    producto={Productos}
                                    setEjecutarConsulta={setEjecutarConsulta}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='flex flex-col w-full m-2 md:hidden'>
                {productosFiltrados.map((el) => {
                    return (
                        <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
                            <span>{el.codigo}</span>
                            <span>{el.nombre}</span>
                            <span>{el.cantidad}</span>
                            <span>{el.valor}</span>
                            <span>{el.estado}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const FilaProducto = ({ producto, setEjecutarConsulta }) => {
    const [edit, setEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [infoNuevoProducto, setInfoNuevoProducto] = useState({
        _id: producto._id,
        codigo: producto.codigo,
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        valor: producto.valor,
        estado: producto.estado,
    });

    const actualizarProducto = async () => {
        console.log(infoNuevoProducto);
        //enviar la info al backend
        const options = {
            method: 'PATCH',
            url: `http://localhost:5000/productos/${producto._id}/`,
            headers: { 'Content-Type': 'application/json' },
            data: { ...infoNuevoProducto },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Producto modificado con éxito');
                setEdit(false);
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                toast.error('Error modificando el producto');
                console.error(error);
            });
    };

    const eliminarProducto = async () => {
        const options = {
            method: 'DELETE',
            url: 'http://localhost:5000/productos/eliminar/',
            headers: { 'Content-Type': 'application/json' },
            data: { id: producto._id },
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Producto eliminado con éxito');
                setEjecutarConsulta(true);
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error eliminando el producto');
            });
        setOpenDialog(false);
    };

    return (
        <tr>
            {edit ? (
                <>
                    <td>{infoNuevoProducto._id}</td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoProducto.codigo}
                            onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, codigo: e.target.value })}
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoProducto.nombre}
                            onChange={(e) =>
                                setInfoNuevoProducto({ ...infoNuevoProducto, nombre: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoProducto.cantidad}
                            onChange={(e) =>
                                setInfoNuevoProducto({ ...infoNuevoProducto, cantidad: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoProducto.valor}
                            onChange={(e) =>
                                setInfoNuevoProducto({ ...infoNuevoProducto, valor: e.target.value })
                            }
                        />
                    </td>
                    <td>
                        <input
                            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                            type='text'
                            value={infoNuevoProducto.estado}
                            onChange={(e) =>
                                setInfoNuevoProducto({ ...infoNuevoProducto, estado: e.target.value })
                            }
                        />
                    </td>
                </>
            ) : (
                <>
                    <td>{producto._id.slice(20)}</td>
                    <td>{producto.codigo}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.valor}</td>
                    <td>{producto.estado}</td>
                </>
            )}
            <td>
                <div className='flex w-full justify-around'>
                    {edit ? (
                        <>
                            <Tooltip title='Confirmar Edición' arrow>
                                <i
                                    onClick={() => actualizarProducto()}
                                    className='fas fa-check text-green-700 hover:text-green-500'
                                />
                            </Tooltip>
                            <Tooltip title='Cancelar edición' arrow>
                                <i
                                    onClick={() => setEdit(!edit)}
                                    className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip title='Editar Producto' arrow>
                                <i
                                    onClick={() => setEdit(!edit)}
                                    className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                                />
                            </Tooltip>
                            <Tooltip title='Eliminar Producto' arrow>
                                <i
                                    onClick={() => setOpenDialog(true)}
                                    className='fas fa-trash text-red-700 hover:text-red-500'
                                />
                            </Tooltip>
                        </>
                    )}
                </div>
                <Dialog open={openDialog}>
                    <div className='p-8 flex flex-col'>
                        <h1 className='text-gray-900 text-2xl font-bold'>
                            ¿Está seguro de querer eliminar el producto?
                        </h1>
                        <div className='flex w-full items-center justify-center my-4'>
                            <button
                                onClick={() => eliminarProducto()}
                                className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
                            >
                                Sí
                            </button>
                            <button
                                onClick={() => setOpenDialog(false)}
                                className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
                            >
                                No
                            </button>
                        </div>
                    </div>
                </Dialog>
            </td>
        </tr>
    );
};

const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoProducto = {};
        fd.forEach((value, key) => {
            nuevoProducto[key] = value;
        });

        const options = {
            method: 'POST',
            url: 'http://localhost:5000/productos/nuevo/',
            headers: { 'Content-Type': 'application/json' },
            data: { codigo: nuevoProducto.codigo, nombre: nuevoProducto.nombre, cantidad: nuevoProducto.cantidad, valor: nuevoProducto.valor, estado:nuevoProducto.estado},
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                toast.success('Producto agregado con éxito');
            })
            .catch(function (error) {
                console.error(error);
                toast.error('Error creando un Produto');
            });

        setMostrarTabla(true);
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-800'>Crear Nuevo Producto</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label className='flex flex-col' htmlFor='codigo'>
                    Código del producto
                    <input
                        name='codigo'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='LPZ05'
                        required
                    />
                </label>
                <label className='flex flex-col' htmlFor='nombre'>
                    Nombre del Producto
                    <input
                        name='nombre'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='text'
                        placeholder='Lapiz'
                        required />
                </label>
                <label className='flex flex-col' htmlFor='cantidad'>
                    Cantidad
                    <input
                        name='cantidad'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='number'
                        min={0}
                        max={10000}
                        placeholder='100'
                        required />
                </label>
                <label className='flex flex-col' htmlFor='valor'>
                    Valor del Producto
                    <input
                        name='valor'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type='number'
                        min={0}
                        max={200000}
                        placeholder='1500'
                        required
                    />
                </label>
                <label className='flex flex-col' htmlFor='estado'>
                    Dispinibilidad del Producto
                    <select
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        name='estado'
                        required
                        defaultValue={0}
                    >
                        <option hidden selected>Selecciona una opción</option>
                        <option value="Disponible">Disponible</option>
                        <option value="No Disponible">No Disponible</option>
                    </select>
                </label>
                <button
                    type='submit'
                    className='col-span-2 bg-gray-700 p-2 rounded-full shadow-md hover:bg-green-900 text-white'
                >
                    Guardar Producto
                </button>
            </form>
        </div>
    );
};

export default Productos;
