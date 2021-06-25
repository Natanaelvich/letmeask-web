import { ReactNode } from 'react';

import styles from './styles.module.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isAnswered?: boolean;
  isHighlighted?: boolean;
  children?: ReactNode;
};

export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <div
      className={`${styles.question} ${isAnswered && styles.answered} ${
        isHighlighted && !isAnswered && styles.highlighted
      }`}
    >
      <p>{content}</p>
      <footer>
        <div className={styles['user-info']}>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
