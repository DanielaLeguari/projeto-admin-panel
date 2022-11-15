import styles from './MenuLateral.module.scss';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FiSearch} from 'react-icons/fi';

//removendo sublinhado link
const linkStyle = {
    textDecoration: "none"
}

const MenuLateral = () => {
    return (
        <>
            <main className={styles.container}>
                <div className={styles.cabecalho}>
                    <img src={logo} alt="logo" />
                    <h1>Admin Panel</h1>
                </div>
                <div className={styles.menu}>
                    <h2>Menu</h2>
                    <div className={styles.links}>
                        <Link style={linkStyle} to={"/"}><span><FaUserCircle style={{margin:"0.4rem"}}/>Lista de usuários</span></Link>
                        <Link style={linkStyle}  to={"/pesquisa"}><span><FiSearch style={{margin:"0.4rem"}}/>Pesquisar por CPF</span></Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default MenuLateral;