import { useContext, useState } from "react";
import { INovoUsuario, IPesquisarUsuario } from "../../utils/interfaces";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { toastConfig } from '../../utils/toast';
import MenuLateral from '../../components/MenuLateral';
import Conteudo from '../../components/Conteudo';
import Tabela from '../../components/TabelaUsuarios';
import styles from './Pesquisa.module.scss';

export const Pesquisa = () => {
    const { register, handleSubmit } = useForm<INovoUsuario>();
    const [usuarios, setUsuarios] = useState<Array<INovoUsuario>>([]);
    const { pesquisarUsuario } = useContext(UserContext);
    const cabecalho = ["Nome", "CPF", "RG", "CNH", "Nome da mãe", "Nome do pai"
        , "Título de eleitor", "Sexo", "Ações"];

    const carregaUsuario = async (cpf: string) => {
        let u = await pesquisarUsuario(cpf);
        if (u) {
            setUsuarios([u]); //adiciona o usuario apenas de não for nulo ou undefined
        }

        if (!u) {
            toast.error("Usuário não encontrado.", toastConfig);
        }
    }

    //pesquisar por cpf
    const processaForm = async (data: IPesquisarUsuario) => {
        if(data !== undefined && data.cpf){
           await carregaUsuario(data.cpf); 
        } else {
            toast.error('Informe um CPF.', toastConfig);
        }
        
    }

    return (
        <>
            <MenuLateral />
            <Conteudo>
                <h2 className={styles.titulo}>Pesquisar por CPF</h2>
                <form onSubmit={handleSubmit(processaForm)}>
                    <label htmlFor="">Digite o CPF:</label>
                    <input type="number" {...register("cpf")} />
                    <input className={styles.btnEncontrar} type="submit" value="Encontrar" />
                </form>
                <Tabela cabecalho={cabecalho} dados={usuarios} />

            </Conteudo>
        </>
    )
}