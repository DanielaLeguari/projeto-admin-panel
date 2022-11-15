import styles from './Conteudo.module.scss';
interface ConteudoProps {
    children: React.ReactNode
}
const Conteudo = ({ children }: ConteudoProps) => {
    return (
        <main className={styles.containerConteudo}>
            {children}
        </main>
    )
}

export default Conteudo;