import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { INovoUsuario } from "../../utils/interfaces";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { toastConfig } from '../../utils/toast';
import MenuLateral from '../../components/MenuLateral';
import Conteudo from '../../components/Conteudo';

export const Usuario = () => {
    const navigate = useNavigate();
    const { cpf } = useParams();
    const { register, handleSubmit, setValue } = useForm<INovoUsuario>();
    const [usuario, setUsuario] = useState<INovoUsuario | undefined>();
    const [edicao, setEdicao] = useState<boolean>(false);
    const { novoUsuario, editarUsuario, pesquisarUsuario } = useContext(UserContext);

    //pega usuario antes de editar
    const carregaUsuario = async () => {
        let u = await pesquisarUsuario(cpf);
        setUsuario(u);
        console.log(usuario);

        if (!u) {
            toast.error("Usuário não encontrado.", toastConfig);
            navigate("/");
            return;
        }

        setValue("nome", u.nome);
        setValue("cpf", u.cpf ?? '');
        setValue("rg", u.rg ?? '');
        setValue("cnh", u.cnh ?? '');
        setValue("nomeMae", u.nomeMae ?? '');
        setValue("nomePai", u.nomePai ?? '');
        setValue("tituloEleitor", u.tituloEleitor ?? '');
        setValue("sexo", u.sexo ?? 'F');
        setEdicao(true);

    }

    const processaForm = async (data: INovoUsuario) => {
        if (!edicao) {
            await novoUsuario(data);
        } else {
            await editarUsuario(data);
        }
        navigate("/");
    }

    useEffect(() => {
        //editar usuario
        if (cpf !== undefined) {
            carregaUsuario();
        } else {
            //criando novo usuario
            setEdicao(false);
        }
    }, []);


    return (
        <>
            <MenuLateral />
            <Conteudo>
                <h2>Lista de Usuários</h2>

                <form onSubmit={handleSubmit(processaForm)}>
                    <label htmlFor="nome">Nome Completo</label>
                    <input type="text" placeholder="Nome" required id="nome" {...register("nome")} />

                    <label htmlFor="cpf">CPF</label>
                    <input type="text" placeholder="CPF" required id="cpf" {...register("cpf")} />

                    <label htmlFor="rg">RG</label>
                    <input type="text" placeholder="RG" required id="rg" {...register("rg")} />

                    <label htmlFor="cnh">CNH</label>
                    <input type="text" placeholder="CNH" required id="cnh" {...register("cnh")} />

                    <label htmlFor="nomeMae">Nome da mãe</label>
                    <input type="text" placeholder="Nome da mãe" required id="nomeMae" {...register("nomeMae")} />

                    <label htmlFor="nomePai">Nome do pai</label>
                    <input type="text" placeholder="Nome do pai" required id="nomePai" {...register("nomePai")} />

                    <label htmlFor="tituloEleitor">Título de eleitor</label>
                    <input type="text" placeholder="Número do título" required id="tituloEleitor" {...register("tituloEleitor")} />

                    <label htmlFor="sexo">Sexo</label>
                    <select id="sexo" {...register("sexo")}>
                        <option value="F">Feminino</option>
                        <option value="M">Masculino</option>
                    </select>
                    <input type="submit" value={!edicao ? 'Adicionar Usuário' : 'Editar Usuário'} />
                </form>
            </Conteudo>
        </>
    )
}