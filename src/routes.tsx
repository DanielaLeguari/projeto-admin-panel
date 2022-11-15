import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext';
import { Home } from './pages/Home';
import { Pesquisa } from './pages/Pesquisa';
import { Usuario } from './pages/Usuario';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';


export const Router = () => {
    return (
        <BrowserRouter>
            <ToastContainer />
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/usuario" element={<Usuario />} />
                    <Route path="/usuario/:cpf" element={<Usuario />} />
                    <Route path="/pesquisa" element={<Pesquisa />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    )
}