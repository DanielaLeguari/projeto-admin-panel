import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { INovoUsuario } from "../../utils/interfaces";
import { useNavigate } from 'react-router-dom';
import MenuLateral from "../../components/MenuLateral";
import Conteudo from "../../components/Conteudo";
import styles from "./Home.module.scss";
import Tabela from "../../components/TabelaUsuarios";

export const Home = () => {

    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState<Array<INovoUsuario>>([]);
    const { listarUsuarios, deletarUsuario } = useContext(UserContext);
    const cabecalho = ["Nome", "CPF", "RG", "CNH", "Nome da mãe", "Nome do pai"
        , "Título de eleitor", "Sexo", "Ações"];
    const listar = async () => {
        setUsuarios(await listarUsuarios());
        console.log(usuarios);
    }

    useEffect(() => {
        listar();
    }, []);
    return (
        <main className={styles.containerHome}>

            <MenuLateral />
            <Conteudo>
                <h2>Lista de Usuários</h2>
                <Tabela exibeAddUsuario={true} cabecalho={cabecalho} dados={usuarios} />
            </Conteudo>

        </main>
    )
}