import React from "react";

export default function Mcq({ selectOption, question, index = 0, total = 0, isVisible }) {
  return (
    <div
      className="question-card"
      data-question={question.id}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="question-header">
        <span className="question-number">Question {index + 1} of {total}</span>
        <span className="question-type">Multiple Choice</span>
      </div>

      <div className="question-text">
        {question.question}
      </div>

      <div className="options-container">
        {Array.isArray(question.options) &&
          question.options.map((optText, optIndex) => {
            const letter = String.fromCharCode(65 + optIndex); // 'A', 'B', 'C', ...
            return (
              <div
                key={letter}
                className="option-item"
                onClick={(e) => selectOption(e.currentTarget, question.id, letter)}
              >
                <div className="option-radio" />
                <div>{`${letter}. ${optText}`}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
