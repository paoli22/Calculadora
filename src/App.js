import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("0");
  const [prevResult, setPrevResult] = useState(null);
  const [newCalculation, setNewCalculation] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (key === "Enter") {
        handleClick("=");
      } else if (key === "Escape") {
        handleClick("clear");
      } else if (/^[0-9+\-*/.=]$/.test(key)) {
        handleClick(key === "=" ? "=" : key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, newCalculation, prevResult]);

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

  return (
    <div className="calculator">
      <div id="display" className="display">{input}</div>
      <div className="buttons">
        <div className="numbers">
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("clear")}>C</button>
        </div>
        <div className="operators">
          <button onClick={() => handleClick("/")}>/</button>
          <button onClick={() => handleClick("*")}>*</button>
          <button onClick={() => handleClick("-")}>-</button>
          <button onClick={() => handleClick("+")}>+</button>
          <button className="equals" onClick={() => handleClick("=")}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;

