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

function App() {
    return (
        <Router>
            <Switch>
                <Route path={['/admin', '/admin/productos']}>
                    <PrivateLayout>
                        <Switch>
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
    );
}

export default App;
