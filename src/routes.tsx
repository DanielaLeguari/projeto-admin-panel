import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Home } from './pages/Home';
import { Pesquisa } from './pages/Pesquisa';
import { Usuario } from './pages/Usuario';


export const Router = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/usuario" element={<Usuario/>}/>
                    <Route path="/pesquisa" element={<Pesquisa/>}/>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    )
}