import { useRouter } from 'next/router';

import { FormEvent, useState } from 'react';
import styles from '../styles/auth.module.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../lib/firebase';

export default function Home() {
  const router = useRouter();

  const { user, signInWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    router.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    router.push(`/rooms/${roomCode}`);
  }

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
          <button
            type="button"
            onClick={handleCreateRoom}
            className={styles['create-room']}
          >
            <img src="images/google-icon.svg" alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className={styles.separator}>ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              value={roomCode}
              onChange={e => setRoomCode(e.target.value)}
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
