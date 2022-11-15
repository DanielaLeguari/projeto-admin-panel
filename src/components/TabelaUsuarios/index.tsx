import { INovoUsuario } from '../../utils/interfaces';
import styles from './TabelaUsuarios.module.scss';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { MdDelete, MdEdit } from 'react-icons/md';

interface TabelaProps {
    cabecalho: string[],
    dados: INovoUsuario[],
    exibeAddUsuario?: boolean
}
const Tabela = ({ cabecalho, dados, exibeAddUsuario }: TabelaProps) => {
    const navigate = useNavigate();
    const { deletarUsuario } = useContext(UserContext);
    const deletar = async (cpf: string) => {
        await deletarUsuario(cpf);
    }
    return (
        <div className={styles.containerTabela}>
            {exibeAddUsuario ? <div className={styles.containerlinhaTabela}>
                <h2>Usuários</h2>
                <button className={styles.btnUsuario} onClick={() => navigate("/usuario")}>Adicionar usuário</button>
            </div> : <></>}
            <table>
                <thead className={styles.tabelaHeader}>
                    <tr>
                        {cabecalho.map(item => {
                            return <th>{item}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {dados.length === 0 ? <tr><td colSpan={9}>Nenhum resultado encontrado</td></tr> :
                        dados.map(usuario => {
                            return <tr >
                                <td>{usuario.nome}</td>
                                <td>{usuario.cpf}</td>
                                <td>{usuario.rg}</td>
                                <td>{usuario.cnh}</td>
                                <td>{usuario.nomeMae}</td>
                                <td>{usuario.nomePai}</td>
                                <td>{usuario.tituloEleitor}</td>
                                <td>{usuario.sexo}</td>
                                <td className={styles.acoes}>
                                    <button className={styles.btnUsuario} onClick={() => navigate(`/usuario/${usuario.cpf}`)}>
                                        <MdEdit />
                                    </button>
                                    <button className={styles.btnUsuario} onClick={() => deletar(usuario.cpf)}>
                                        <MdDelete />
                                    </button>

                                </td>
                            </tr>;
                        })}

                </tbody>
            </table>
        </div>
    )
}

export default Tabela;