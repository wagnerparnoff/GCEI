import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from './components/Sidebar'
import Clientes from './pages/Clientes';
import Home from './pages/Home';
import Produtos from './pages/Produtos';

export default function Routes() {
    return (
        <BrowserRouter>
            <div className="window-container">
                <Sidebar />
                <Switch>
                    <Route exact path={["/", ""]} component={Home} />
                    <Route path="/clientes" component={Clientes} />
                    <Route path="/produtos" component={Produtos} />
                </Switch>
                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                
            </div>
        </BrowserRouter>

    )
}