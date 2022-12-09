import { useAppDispatch, useAppSelector } from "~/state/hooks";
import { counterValueSelector } from "~/features/counter";
import { counterActions } from "~/features/counter";
import styles from "./Counter.module.css";
import { useCallback } from "react";

const { increment, decrement } = counterActions;

export const Counter = () => {
  const count = useAppSelector(counterValueSelector);
  const dispatch = useAppDispatch();

  const incrementHandler = useCallback(() => {
    dispatch(increment());
  }, [dispatch]);

  const decrementHandler = useCallback(() => {
    dispatch(decrement());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={incrementHandler}>
        +
      </button>
      <span className={styles.label}>{count}</span>
      <button className={styles.button} onClick={decrementHandler}>
        -
      </button>
    </div>
  );
};
