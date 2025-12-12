import React, { useState } from "react";

export default function AnswerModel(props) {
  const [answerText, setAnswerText] = useState("");

  async function handleSend() {

    const modalDoubtsEl = document.getElementById("modalDoubts");
    const questions = [];

    if (modalDoubtsEl) {

      const blocks = Array.from(modalDoubtsEl.querySelectorAll("div")).filter(
        (el) => el.querySelector("strong")
      );

      for (const el of blocks) {
        const strong = el.querySelector("strong");
        const studentRaw = strong ?strong.textContent : "";
        const student = studentRaw.replace(":", "").trim();

        // full text includes student and the doubt
        let full = el.textContent || "";
        // Remove the strong text occurrence (student:)
        if (strong) {
          const strongText = strong.textContent;

          // remove first occurrence of strongText
          const idx = full.indexOf(strongText);
          if (idx !== -1) {
            full = full.slice(0, idx) + full.slice(idx + strongText.length);
          }
        }
        // clean leftover punctuation/spaces
        const doubt = full.replace(/^:\s*/, "").trim();

        if (doubt) {
          questions.push({ student, doubt });
        }
      }
    }

    console.log("Sending answer to server:", { questions, answerText });
    try {
      const response = await fetch("http://localhost:5000/doubtanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: answerText,
          questions, // [{ student, doubt }, ...]
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      console.log("Send result:", result);

      if (typeof props.onSent === "function") {
        props.onSent(result);
      }

      if (typeof props.closeAnswerModal === "function") {
        props.closeAnswerModal();
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to send answer:", err);
      alert("Failed to send answer: " + (err.message || "unknown error"));
    }
  }

  return (
    <div
      id="answerModal"
      style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 2000,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "90%",
          maxWidth: "800px",
          borderRadius: "16px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "2rem", borderBottom: "1px solid #e0e0e0" }}>
          <h2 style={{ margin: 0, color: "#202124", fontSize: "1.5rem" }}>
            Answer Doubt Cluster
          </h2>
          <p style={{ margin: "0.5rem 0 0 0", color: "#5f6368" }}>
            Your response will be sent to all students in this cluster
          </p>
        </div>

        <div
          id="modalDoubts"
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            background: "#f8f9fa",
            padding: "1rem",
          }}
        ></div>

        <div className="answer-section" style={{ padding: "1rem 2rem" }}>
          <div className="answer-title" style={{ marginBottom: "0.5rem" }}>
            Your Response
          </div>
          <textarea
            className="answer-textarea"
            placeholder="Type your answer here..."
            id="answerText"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            style={{
              width: "100%",
              minHeight: "120px",
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          ></textarea>

          <div
            className="answer-actions"
            style={{ display: "flex", gap: "8px", marginTop: "0.75rem" }}
          >
            <button className="attachment-btn" type="button">
              📎 Attach Files
            </button>
            <button className="ai-suggest-btn" type="button">
              🤖 AI Suggest
            </button>
            <button className="faq-btn" type="button">
              📚 Save to FAQ
            </button>
            <button
              className="send-btn"
              id="sendAnswer"
              type="button"
              onClick={handleSend}
              style={{
                marginLeft: "auto",
                background: "#1a73e8",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Send to All Students
            </button>
          </div>
        </div>

        <div
          style={{
            padding: "1rem 2rem",
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "end",
            gap: "1rem",
          }}
        >
          <button
            onClick={() => props.closeAnswerModal && props.closeAnswerModal()}
            style={{
              background: "none",
              border: "1px solid #e0e0e0",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
