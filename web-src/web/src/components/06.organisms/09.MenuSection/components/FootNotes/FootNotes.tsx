import styles from './FootNotes.module.scss';

interface FootNotesProps {
  notes: string[];
}

export function FootNote({ notes }: FootNotesProps) {
  return (
    <div className={styles.footNotes}>
      {notes.map((note, i) => (
        <p key={i} className={styles.footNote}>{note}</p>
      ))}
    </div>
  );
}
