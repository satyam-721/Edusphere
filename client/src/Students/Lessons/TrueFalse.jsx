import React from "react";

export default function TrueFalse({ selectOption, question, index = 0, total = 0, isVisible = false }) {
  return (
    <div
      className="question-card"
      data-question={question.id}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="question-header">
        <span className="question-number">Question {index + 1} of {total}</span>
        <span className="question-type">True/False</span>
      </div>

      <div className="question-text">
        {question.question}
      </div>

      <div className="options-container">
        <div className="option-item" onClick={(e) => selectOption(e.currentTarget, question.id, 'True')}>
          <div className="option-radio" />
          <div>True</div>
        </div>
        <div className="option-item" onClick={(e) => selectOption(e.currentTarget, question.id, 'False')}>
          <div className="option-radio" />
          <div>False</div>
        </div>
      </div>
    </div>
  );
}
