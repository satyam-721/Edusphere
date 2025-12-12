import { useEffect, useState } from "react";

export default function Content({ id,handleTextSelection, handleTextDes }) {
  id = id - 1;
  const [fetchedNotes, setFetchedNotes] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  console.log("LESSON ID: " + id);

  // fetch from backend
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:5000/assignmentnotesfetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched notes FROM CONTENT:", data[id]);
        setFetchedNotes(data[id]); // 
      } catch (err) {
        console.error("Error fetching doubt types:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!fetchedNotes || !fetchedNotes.file || !fetchedNotes.file.data) {
      setPdfUrl(null);
      return;
    }

    try {
      const byteArray = new Uint8Array(fetchedNotes.file.data); 
      const blob = new Blob([byteArray], {
        type: fetchedNotes.filetype || "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Error creating PDF URL:", e);
      setPdfUrl(null);
    }
  }, [fetchedNotes]);

  // Selection watcher for #notesContent
  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      const container = document.getElementById("notesContent");

      if (!sel || sel.isCollapsed) {
        console.log("no selection");
        handleTextDes();
        return;
      }

      // guard: no ranges or no container
      if (sel.rangeCount === 0 || !container) {
        console.log("no selection");
        handleTextDes();
        
        return;
      }

      try {
        const range = sel.getRangeAt(0);
        // If the selection intersects the notesContent container at all -> print the selection
        if (range.intersectsNode(container)) {
          // console.log(sel.toString());
          handleTextSelection(sel.toString());
        } else {
          console.log("no selection");
          handleTextDes();
        }
      } catch (e) {
        console.log("no selection");
        handleTextDes();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  function switchContent(type) {
    const notesEl = document.getElementById("notesContent");
    const videoEl = document.getElementById("videoContent");
    const pdfEl = document.getElementById("pdfContent");

    if (notesEl) notesEl.style.display = "none";
    if (videoEl) videoEl.style.display = "none";
    if (pdfEl) pdfEl.style.display = "none";

    if (type === "notes" && notesEl) {
      notesEl.style.display = "block";
    } else if (type === "video" && videoEl) {
      videoEl.style.display = "block";
    } else if (type === "pdf" && pdfEl) {
      pdfEl.style.display = "block";
    }
  }

  return (
    <div className="content-section" id="contentSection">
      <h2 className="section-title">📖 Lesson Content</h2>

      {/* Content is loading here!!!!!!!! */}
      <div className="content-viewer" id="notesContent">
        <div style={{ padding: "2rem" }}>
          {fetchedNotes ? (
            <div
              dangerouslySetInnerHTML={{ __html: fetchedNotes.editorContent }}
            />
          ) : (
            <p style={{ color: "#5f6368" }}>Loading notes...</p>
          )}
        </div>
      </div>

      <div
        className="video-player"
        id="videoContent"
        style={{ display: "none" }}
      >
        {fetchedNotes && fetchedNotes.ytLink ? (
          <iframe
            src={fetchedNotes.ytLink}
            allowFullScreen
            // style={{ width: "100%", height: "600px", border: "1px solid #ddd", borderRadius: "8px" }}
          ></iframe>
        ) : (
          <p style={{ padding: "2rem", color: "#e8e9cfff", textAlign: "center" }}>
            No Video Link Attached
          </p>
        )}
      </div>

      <div
        className="pdf-viewer"
        id="pdfContent"
        style={{ display: "none", height: "600px" }}
      >
        {pdfUrl ? (
          <>
            <div
              style={{
                marginBottom: "0.75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                📄{" "}
                {fetchedNotes?.filename ||
                  "Attached PDF"}
              </span>
              <button
                className="download-btn"
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = pdfUrl;
                  a.download =
                    fetchedNotes?.filename || "document.pdf";
                  a.click();
                }}
              >
                📥 Download PDF
              </button>
            </div>
            <iframe
              src={pdfUrl}
              title="PDF Viewer"
              style={{ width: "100%", height: "100%", border: "1px solid #ddd", borderRadius: "8px" }}
            />
          </>
        ) : (
          <p style={{ padding: "1rem", color: "#5f6368" }}>
            No PDF attached for this lesson.
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "1.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <button
          className="quiz-nav-btn secondary"
          onClick={() => switchContent("notes")}
        >
          📖 Notes
        </button>
        <button
          className="quiz-nav-btn secondary"
          onClick={() => switchContent("video")}
        >
          🎥 Video
        </button>
        <button
          className="quiz-nav-btn secondary"
          onClick={() => switchContent("pdf")}
        >
          📄 PDF
        </button>
      </div>
    </div>
  );
}
