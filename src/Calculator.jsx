import { useState } from "react";
import styles from "./App.module.css";

const NUMS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const OPERATIONS = ["+", "-", "=", "C"];

export default function Calculator() {
  const [operand1, setOperand1] = useState("");
  const [operator1, setOperator1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [result, setResult] = useState("");

  const output = operand1 + operator1 + operand2;
  const resultClassName = result ? styles.green : "";

  function onClickNumber(num) {
    if (result) {
      return;
    }
    if (operator1 === "") {
      setOperand1(operand1 + num);
    }
    if (operator1) {
      setOperand2(operand2 + num);
    }
  }

  function reset() {
    setOperand1("");
    setOperator1("");
    setOperand2("");
  }

  function onClickOperators(operator) {
    if (operand1 && (operator === "+" || operator === "-")) {
      setOperator1(operator);
    }

    if (operator === "C") {
      reset();
      setResult("");
    }

    if (operator === "=") {
      if (!operand1 && !operator1 && !operand2) {
        return;
      }
      if (operator1 === "+") {
        setResult(+operand1 + +operand2);
      }
      if (operator1 === "-") {
        setResult(+operand1 - +operand2);
      }
      reset();
    }
  }

  return (
    <div className={styles.app}>
      <div className={styles.screen + " " + resultClassName}>
        {result || output || "0"}
      </div>
      <div className={styles.buttons}>
        <div className={styles.leftGroup}>
          {NUMS.map((num, index) => {
            return (
              <button
                className={styles.button}
                key={index}
                onClick={() => onClickNumber(num)}
              >
                {num}
              </button>
            );
          })}
        </div>

        <div className={styles.rightGroup}>
          {OPERATIONS.map((operator, index) => {
            return (
              <button
                className={styles.button}
                key={index}
                onClick={() => onClickOperators(operator)}
              >
                {operator}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
