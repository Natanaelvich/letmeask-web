import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Button } from '../../../components/Button';
import { Question } from '../../../components/Question';
import { RoomCode } from '../../../components/RoomCode';
import { useRoom } from '../../../hooks/useRoom';
import { database } from '../../../lib/firebase';
import '../../../styles/rooms.module.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom({ id }: RoomParams) {
  // const { user } = useAuth()
  const router = useRouter();
  const roomId = id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    router.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src="images/logo.svg" alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src="images/delete.svg" alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;

  return {
    props: {
      id,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
