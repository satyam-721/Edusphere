import React from "react";

export default function ShortAnswers({ question, index = 0, total = 0, isVisible = false }) {
  return (
    <div
      className="question-card"
      data-question={question.id}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className="question-header">
        <span className="question-number">Question {index + 1} of {total}</span>
        <span className="question-type">Short Answer</span>
      </div>

      <div className="question-text">
        {question.question}
      </div>

      <textarea
        className="answer-textarea short-answer-input"
        placeholder="Type your answer here..."
        id={`answer-${question.id}`}
      />
    </div>
  );
}
