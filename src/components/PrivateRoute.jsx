import React, {useEffect} from 'react';
import { useUser } from 'context/userContext';

const PrivateRoute = ({ roleList, children }) => {
    
    const {userData} = useUser();
   
    if (roleList.includes(userData.rol)) {
        return children;
    }
    return <div className='text-3xl text-green-500 '>No estás autorizado para ver este sitio, solicita acceso al administrador.</div>;
};


export default PrivateRoute;
