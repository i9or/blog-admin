import { ReactIcon } from "~/assets";

import styles from "./App.module.css";
import {Counter} from "~/components/Counter";

export const App = () => (
  <div className={styles.container}>
    <h1 className={styles.heading}>Vite + React</h1>
    <section className={styles.icons}>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
      </a>
      <a href="https://reactjs.org" target="_blank">
        <img src={ReactIcon} className="logo react" alt="React logo" />
      </a>
    </section>
    <Counter />
  </div>
);
