import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("0");
  const [prevResult, setPrevResult] = useState(null);
  const [newCalculation, setNewCalculation] = useState(false);

  const handleClick = (value) => {
    if (value === "clear") {
      setInput("0");
      setPrevResult(null);
      setNewCalculation(false);
      return;
    }

    if (value === "=") {
      try {
        let result = Function(`"use strict"; return (${input})`)();
        setInput(result.toString());
        setPrevResult(result.toString());
        setNewCalculation(true);
      } catch {
        setInput("Error");
      }
      return;
    }

    if (newCalculation && /[0-9]/.test(value)) {
      setInput(value);
      setNewCalculation(false);
      return;
    }

    if (newCalculation && /[+\-*/]/.test(value)) {
      setInput(prevResult + value);
      setNewCalculation(false);
      return;
    }

    if (value === ".") {
      const lastNumber = input.split(/[\+\-\*/]/).pop();
      if (lastNumber.includes(".")) return;
    }

    if (/[+\-*/]/.test(value)) {
      if (/[+\-*/]$/.test(input)) {
        if (value === "-" && !/[-]$/.test(input)) {
          setInput(input + value);
        } else {
          setInput(input.replace(/[-+*/]+$/, value));
        }
        return;
      }
    }

    if (input === "0" && value !== ".") {
      setInput(value);
      return;
    }

    setInput(input + value);
  };

  const keyMap = {
    Enter: "=",
    Escape: "clear",
    Backspace: "clear",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    ".": ".",
    "=": "=",
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const value = keyMap[e.key];
      if (value !== undefined) {
        handleClick(value);
        const btn = document.querySelector(`button[data-key="${value}"]`);
        if (btn) {
          btn.classList.add("pressed");
          setTimeout(() => btn.classList.remove("pressed"), 150);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, prevResult, newCalculation]);

  return (
    <div className="calculator">
      <div id="display" className="display">{input}</div>
      <div className="buttons">
        <div className="numbers">
          {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."].map((num) => (
            <button
              key={num}
              data-key={num}
              onClick={() => handleClick(num)}
            >
              {num}
            </button>
          ))}
          <button data-key="clear" onClick={() => handleClick("clear")} className="clear">C</button>
        </div>
        <div className="operators">
          {["/", "*", "-", "+", "="].map((op) => (
            <button
              key={op}
              data-key={op === "=" ? "Enter" : op}
              onClick={() => handleClick(op)}
              className={op === "=" ? "equals" : ""}
            >
              {op}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
