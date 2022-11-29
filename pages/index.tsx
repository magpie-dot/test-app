import { useRef, useState } from "react";
import classnames from "classnames";

import Plus from "../icons/plus.svg";
import Check from "../icons/check.svg";
import WelcomeModal from "../components/WelcomeModal";

import styles from "../styles/Home.module.scss";
import { useToDoItems } from "../utils/useToDoItems";

const Home = () => {
  const [isOpen, setOpen] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { addToDoItem, markAsDone, removeToDoItem, tasks } = useToDoItems();
  
  if (isOpen) {
    return (
      <WelcomeModal
        name={!!name}
        onClose={() => setOpen(false)}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.welcome}>
        Hi, <span className={styles.highlighted}>{name}</span>! You can start
        adding your tasks.
      </h2>
      <div className={styles.form}>
        <label htmlFor="toDo" className={styles.label}>
          To do:
        </label>
        <input className={styles.input} id="toDo" ref={inputRef} />
        <button
          className={styles.button}
          onClick={() => addToDoItem(inputRef)}
        >
          Add new task
        </button>
      </div>
      <div className={styles.listContainer}>
        {!tasks.length ? (
          <p className={styles.center}>You haven't added any task yet. </p>
        ) : (
          <ul className={styles.list}>
            {tasks.map(({ id, value, done }) => (
              <li
                className={classnames(styles.listItem, done && styles.done)}
                key={id}
              >
                {done && <Check className={styles.doneIcon} />}
                {value}
                <div className={styles.action}>
                  <button
                    className={styles.done}
                    onClick={() => markAsDone(id)}
                  >
                    {done ? "Undone" : "Done"}
                  </button>
                  <button
                    className={styles.remove}
                    onClick={() => removeToDoItem(id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
