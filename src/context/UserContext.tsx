import { api } from "../utils/api";
import { createContext } from "react";
import { INovoUsuarioContext, IChildren, INovoUsuario } from '../utils/interfaces';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import nProgress from "nprogress";
import { toastConfig } from '../utils/toast';

export const UserContext = createContext({} as any);

export const UserProvider = ({ children }: IChildren) => {

    const navigate = useNavigate();

    const novoUsuario = async (usuario: INovoUsuarioContext) => {
        try {
            nProgress.start();
            await api.post("/dados-pessoais", usuario);
            toast.success("Usuário cadastrado com sucesso!",toastConfig);
            navigate("/");
        } catch (error) {
            toast.error("Houve algum erro, tente novamente!",toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const editarUsuario = async (usuario: INovoUsuarioContext) => {
        try {
            nProgress.start();
            console.log(usuario);
            await api.put(`/dados-pessoais/${usuario.cpf}`, usuario);
            toast.success("Usuário editado com sucesso!",toastConfig);
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Houve algum erro, tente novamente!",toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const deletarUsuario = async (cpf:string) => {
        try {
            nProgress.start();
            await api.delete(`/dados-pessoais/${cpf}`);
            toast.success("Usuário excluído com sucesso!",toastConfig);
            navigate("/");
        } catch (error) {
            toast.error("Houve algum erro, tente novamente!",toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const listarUsuarios = async (): Promise<Array<INovoUsuario> | undefined> => {
        try {
            nProgress.start();
            const response = await api.get(`/dados-pessoais`);
            nProgress.done();
            return response.data;

        } catch (error) {
            toast.error("Houve algum erro, tente novamente!",toastConfig);
        } finally {
            nProgress.done();
        }
    }

    const pesquisarUsuario = async (cpf: string) : Promise<INovoUsuario | undefined> => {
        try {
            nProgress.start();
            const response = await api.get(`/dados-pessoais/${cpf}`);
            nProgress.done();
            return response.data;
        } catch (error) {
    
        } finally {
            nProgress.done();
        }
        return;
    }

    return (
        <UserContext.Provider value={{
            novoUsuario,
            editarUsuario,
            listarUsuarios,
            deletarUsuario,
            pesquisarUsuario
        }}>
            {children}
        </UserContext.Provider>
    )
}

