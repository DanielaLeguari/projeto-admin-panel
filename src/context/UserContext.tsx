import { api } from "../utils/api";
import { createContext } from "react";
import { INovoUsuarioContext, IChildren, INovoUsuario } from '../utils/interfaces';
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({} as any);

export const UserProvider = ({ children }: IChildren) => {

    const navigate = useNavigate();

    const novoUsuario = async (usuario: INovoUsuarioContext) => {
        try {
            await api.post("/dados-pessoais", usuario);
            console.log("sucesso");
        } catch (error) {
            console.log("Houve algum erro, tente novamente!");
        }
    }

    

    return (
        <UserContext.Provider value={{ novoUsuario }}>
            {children}
        </UserContext.Provider>
    )
}

