import React, {useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';
import { obtenerDatosUsuario } from 'utils/api';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();


    useEffect(() => {
        const fetchAuth0Token = async () => {
            // si se quieren hacer validaciones con el token:
            // if (localStorage.getItem('token')) {
            // validar fecha de expiracion del token
            // } else {
            // pedir token
            // }

            //1. pedir token a auth0
            const accessToken = await getAccessTokenSilently({
                audience: `api-autenticacion-luxorwebsite-mintic`,
            });
            // 2. RECIBIR TOKEN DE AUTH0
            localStorage.setItem('token', accessToken);
            console.log(accessToken)
            //3. Enviarle el token al backend
            await obtenerDatosUsuario(
                (response) => {
                console.log('response', response);
            },
            (err) => {
                console.log('err', err);
            }

            );
            
        };
        if (isAuthenticated) {
            fetchAuth0Token();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading) return <ReactLoading type='cylon' color='#abc123' height={667} width={375} />;

    if (!isAuthenticated) {
        return loginWithRedirect();
    }

    return <>{children}</>;
};
//   return isAuthenticated ? (
//     <>{children}</>
//   ) : (
//     <div>
//       <div className='text-9xl text-red-500 '>No estas autorizado para ver este sitio.</div>
//       <Link to='/'>
//         <span className='text-blue-500 font-bold'>Llévame al home</span>
//       </Link>
//     </div>
//   );
// };

export default PrivateRoute;
