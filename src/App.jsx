
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

function App() {
    return (
        <Auth0Provider
            domain='misiontic-luxorwebsite.us.auth0.com'
            clientId='GnHNtwNGmXTgSZhJevVQySD6P7fvhAWi'
            redirectUri='http://localhost:3000/admin'
            audience='api-autenticacion-luxorwebsite-mintic'
            >
        <Router>
            <Switch>
                <Route path={['/admin', '/admin/productos', '/admin/usuarios']}>
                    <PrivateLayout>
                        <Switch>
                        <Route path='/admin/usuarios'>
                                <Usuarios/>
                            </Route>
                            <Route path='/admin/productos'>
                                <Productos/>
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
        </Auth0Provider>
    );
}

export default App;
