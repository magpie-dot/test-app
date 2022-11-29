import classnames from "classnames";

import styles from "./WelcomeModal.module.scss";
import { WelcomeModalInterface } from "./WelcomeModal.interface";


const WelcomeModal: React.FC<WelcomeModalInterface> = ({name, onClose, onChange}) =>   {  
    
    return (
    <div className={styles.modal}>
      <h1 className={styles.title}>
        Welcome in
        <span className={styles.highlighted}> "to do test app"</span>!
      </h1>
      <p>If you want to use it, please write your name below.</p>
      <div className={styles.form}>
        <button
          disabled={!name}
          className={styles.button}
          onClick={onClose}
          data-testid="button"
        >
          Zatwierdź

        </button>
        <input
          className={styles.input}
          id="name"
          type="text"
          placeholder="Your name"
          onChange={onChange}
        />
        <label
          htmlFor="name"
          className={classnames(styles.label, name && styles.show)}
        >
          Your name:
        </label>
      </div>
    </div>
  );}


export default WelcomeModal