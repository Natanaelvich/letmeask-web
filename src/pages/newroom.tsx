import Link from 'next/link';

import styles from '../styles/auth.module.scss';
import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth';

export default function NewRoom() {
  // const { user } = useAuth()

  return (
    <div className={styles['page-auth']}>
      <aside>
        <img
          src="images/illustration.svg"
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className={styles['main-content']}>
          <img src="images/logo.svg" alt="Letmeask" />

          <h2>Criar uma nova sala</h2>

          <form action="">
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?{' '}
            <Link href="/">
              <a>clique aqui</a>
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
