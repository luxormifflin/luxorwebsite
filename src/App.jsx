import React, {useState, useEffect} from 'react';
import Registro from 'pages/auth/Registro';
import Admin from 'pages/admin/Index';
import Productos from 'pages/admin/Productos';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import 'styles/styles.css';
import Index from 'pages/Index';
import PublicLayout from 'layouts/PublicLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import AuthLayout from 'layouts/AuthLayout';
import Login from 'pages/auth/Login';
import { Auth0Provider } from "@auth0/auth0-react";
import Usuarios from 'pages/admin/Usuarios';
import Ventas from 'pages/admin/Ventas';
import {DarkModeContext} from 'context/darkMode';
import {UserContext} from 'context/userContext';
import PrivateRoute from 'components/PrivateRoute';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [userData, setUserData] = useState ({});
    useEffect(() => {
        console.log('modo dark:', darkMode);
    }, [darkMode]);

    return (
        <Auth0Provider
            domain='misiontic-luxorwebsite.us.auth0.com'
            clientId='GnHNtwNGmXTgSZhJevVQySD6P7fvhAWi'
            redirectUri='http://localhost:3000/admin'
            audience='api-autenticacion-luxorwebsite-mintic'
        >
        <div className= 'App'>
            <UserContext.Provider value = {{userData, setUserData}}>
                <DarkModeContext.Provider value ={{darkMode, setDarkMode}}>          
                    <Router>
                        <Switch>
                            <Route path={['/admin', '/admin/productos', '/admin/usuarios', 'admin/ventas']}>
                                <PrivateLayout>
                                    <Switch>
                                        <Route path='/admin/ventas'>
                                            <PrivateRoute roleList={['admin']}>
                                                <Ventas/>
                                            </PrivateRoute>
                                        </Route>
                                        <Route path='/admin/usuarios'>
                                            <PrivateRoute roleList={['admin']}>
                                                <Usuarios/>
                                            </PrivateRoute>
                                        </Route>
                                        <Route path='/admin/productos'>
                                            <PrivateRoute roleList={['admin']}>
                                                <Productos/>
                                            </PrivateRoute>
                                        </Route>
                                        <Route path='/admin'>
                                            <Admin />
                                        </Route>
                                    </Switch>
                                </PrivateLayout>
                            </Route>
                            <Route path={['/login', '/registro']}>
                                <AuthLayout>
                                    <Switch>
                                        <Route path='/login'>
                                            <Login/>
                                        </Route>
                                        <Route path='/registro'>
                                            <Registro/>
                                        </Route>
                                    </Switch>
                                </AuthLayout>
                            </Route>
                            <Route path={['/']}>
                                <PublicLayout>
                                        <Route path='/'>
                                            <Index />
                                        </Route>
                                </PublicLayout>
                            </Route>
                        </Switch>
                    </Router>
                </DarkModeContext.Provider>
            </UserContext.Provider>
        </div>
        </Auth0Provider>
    );
}

export default App;
