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

  // Escuchar teclas del teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if ("0123456789".includes(key)) {
        handleClick(key);
      } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        handleClick(key);
      } else if (key === "Enter" || key === "=") {
        e.preventDefault(); // para que Enter no envíe formularios por accidente
        handleClick("=");
      } else if (key === ".") {
        handleClick(".");
      } else if (key === "Escape" || key === "c" || key === "C") {
        handleClick("clear");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [input, newCalculation, prevResult]);

  return (
    <div className="calculator">
      <div id="display" className="display">{input}</div>
      <div className="buttons">
        <button id="clear" onClick={() => handleClick("clear")}>C</button>
        <button id="divide" onClick={() => handleClick("/")}>/</button>
        <button id="multiply" onClick={() => handleClick("*")}>*</button>
        <button id="seven" onClick={() => handleClick("7")}>7</button>
        <button id="eight" onClick={() => handleClick("8")}>8</button>
        <button id="nine" onClick={() => handleClick("9")}>9</button>
        <button id="subtract" onClick={() => handleClick("-")}>-</button>
        <button id="four" onClick={() => handleClick("4")}>4</button>
        <button id="five" onClick={() => handleClick("5")}>5</button>
        <button id="six" onClick={() => handleClick("6")}>6</button>
        <button id="add" onClick={() => handleClick("+")}>+</button>
        <button id="one" onClick={() => handleClick("1")}>1</button>
        <button id="two" onClick={() => handleClick("2")}>2</button>
        <button id="three" onClick={() => handleClick("3")}>3</button>
        <button id="zero" onClick={() => handleClick("0")}>0</button>
        <button id="decimal" onClick={() => handleClick(".")}>.</button>
        <button id="equals" onClick={() => handleClick("=")}>=</button>
      </div>
    </div>
  );
};

export default App;

