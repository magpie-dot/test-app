import { useRef, useState } from "react";
import classnames from "classnames";

import Next from "../icons/next.svg";
import Plus from "../icons/plus.svg";
import Check from "../icons/check.svg";

import modalStyles from "../styles/Modal.module.scss";
import styles from "../styles/Home.module.scss";

const Home = () => {
  const [isOpen, setOpen] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [tasks, setTasks] = useState<
    { id: number; value: string; done: boolean }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);

  if (isOpen) {
    return (
      <div className={modalStyles.modal}>
        <h1 className={modalStyles.title}>
          Welcome in
          <span className={modalStyles.highlighted}> "to do test app"</span>!
        </h1>
        <p>If you want to use it, please write your name below.</p>
        <div className={modalStyles.form}>
          <button
            disabled={!name}
            className={modalStyles.button}
            onClick={() => setOpen(false)}
          >
            Zatwierdź
            <Next />
          </button>
          <input
            className={modalStyles.input}
            id="name"
            placeholder="Your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label
            htmlFor="name"
            className={classnames(modalStyles.label, name && modalStyles.show)}
          >
            Your name:
          </label>
        </div>
      </div>
    );
  }

  const onAddToDoItem = () => {
    if (inputRef.current && inputRef.current?.value.length) {
      const newTask = inputRef.current?.value as string;
      const id = Math.floor(Math.random() * 9999);
      setTasks((prev) => [...prev, { id, value: newTask, done: false }]);
      inputRef.current.value = "";
    }
  };

  const markAsDone = (id: number) => {
    const newTaskList = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(newTaskList);
  };

  const removeToDoItem = (id: number) => {
    const newTaskList = tasks.filter((task) => task.id !== id);
    setTasks(newTaskList);
  };

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
        <button className={styles.button} onClick={onAddToDoItem}>
          Add new task <Plus className={styles.icon} />
        </button>
      </div>
      <div className={styles.listContainer}>
        {!tasks.length ? (
          <p>You haven't added any task yet. </p>
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
