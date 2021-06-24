import styles from './styles.module.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <button
      type="button"
      className={styles['room-code']}
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src="/images/copy.svg" alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}
