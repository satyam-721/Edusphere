import React, { useState, useMemo, useEffect } from "react";
import "./Choice.css";
import Layout from "./Layouts/Layout";
import { useNavigate } from "react-router-dom";

export default function Choice() {
  const [ASSIGNMENTS, setASSIGNMENT] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hii from outside");

    document.title = "Assignments - Student Portal";

    (async () => {
      try {
        const response = await fetch("http://localhost:5000/assignmentnotesfetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Fetch failed at Choice.jsx: ${response.status}`);
        }

        const data = await response.json();

        data.forEach((item) => {
          // Capitalize subject
          item.subject =
            item.subject && item.subject.length > 0
              ? item.subject.charAt(0).toUpperCase() + item.subject.slice(1)
              : "Other";

          // Map subject to icon
          let subjectIcon = "📘"; // Default icon
          if (item.subject === "Mathematics") subjectIcon = "🔢";
          else if (item.subject === "Physics") subjectIcon = "⚗️";
          else if (item.subject === "Chemistry") subjectIcon = "🧪";
          else if (item.subject === "Biology") subjectIcon = "🌱";
          else if (item.subject === "History") subjectIcon = "🏺";

          // Default meta info (you can later make this dynamic from backend)
          let line2Icon = "📅";
          let line3Icon = "📊";
          let line2Text = "Due: 15 Dec 2025 (3 days left)";
          let line3Text = "Points: 15";
          let isOverdue = false;

          item.subjectIcon = subjectIcon;
          item.line2Icon = line2Icon;
          item.line3Icon = line3Icon;
          item.line2Text = line2Text;
          item.line3Text = line3Text;
          item.line2Class = "";
          item.isOverdue = isOverdue;

          // Fallbacks if backend doesn’t send them
          if (!item.status) item.status = "pending"; // or "completed"
          if (!item.type) item.type = "assignment"; // "notes", "video", etc.
        });

        setASSIGNMENT(data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("ASSIGNMENTS state changed:", ASSIGNMENTS);
  }, [ASSIGNMENTS]);

  const [filter, setFilter] = useState("all");
  const [activeSidebarItem, setActiveSidebarItem] = useState("Assignments");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notification, setNotification] = useState({
    visible: false,
    type: "info",
    message: "",
  });

  const [expandedSubjects, setExpandedSubjects] = useState({});

  const stats = useMemo(() => {
    const total = ASSIGNMENTS.length;
    const pending = ASSIGNMENTS.filter((a) => a.status === "pending").length;
    const completed = ASSIGNMENTS.filter((a) => a.status === "completed").length;
    return { total, pending, completed };
  }, [ASSIGNMENTS]);


  const subjectsWithProgress = useMemo(() => {
    const map = {};

    ASSIGNMENTS.forEach((a) => {
      const subjectName = a.subject || "Other";

      if (!map[subjectName]) {
        map[subjectName] = {
          subject: subjectName,
          icon: a.subjectIcon || "📘",
          items: [],
        };
      }
      map[subjectName].items.push(a);
    });

    return Object.values(map).map((group) => {
      const total = group.items.length;
      const completed = group.items.filter(
        (item) => item.status === "completed"
      ).length;
      const progress = total ? Math.round((completed / total) * 100) : 0;

      return {
        ...group,
        total,
        completed,
        progress,
      };
    });
  }, [ASSIGNMENTS]);

  const getFilteredItems = (items) => {
    if (filter === "all") return items;
    if (filter === "overdue") return items.filter((i) => i.isOverdue);
    return items.filter((i) => i.status === filter);
  };

  const toggleSubject = (subjectName) => {
    setExpandedSubjects((prev) => ({
      ...prev,
      [subjectName]: !prev[subjectName],
    }));
  };

  const showNotification = (type, message) => {
    setNotification({ visible: true, type, message });
    const duration = type === "error" ? 4000 : 3000;
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, duration);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    showNotification("info", `Showing ${newFilter} assignments`);
  };

  const handleStatCardClick = (type) => {
    handleFilterChange(type);
  };

  const viewAssignment = (id) => {
    showNotification("info", "Opening assignment details...");
    setTimeout(() => {
      showNotification("success", "Assignment loaded successfully");
      navigate(`/student/lesson/${id}`);
    }, 1000);
  };

  const submitAssignment = (id) => {
    showNotification("info", "Opening submission form...");
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (window.innerWidth <= 768) {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    console.log(
      "%c🎓 EduFlow Assignments Page",
      "color: #1a73e8; font-size: 16px; font-weight: bold;"
    );
    console.log("%c✓ All systems ready", "color: #34a853; font-size: 11px;");

    const t = setTimeout(() => {
      showNotification("info", "You have 2 assignments due this week!");
    }, 1000);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-left">
            <a href="#" className="logo" onClick={handleLogoClick}>
              LearnSphere
            </a>
            <div className="breadcrumb">My Assignments</div>
          </div>
          <div className="nav-right">
            <div className="profile-menu">
              <div className="profile-avatar">SM</div>
              <span style={{ fontWeight: 500, color: "#202124" }}>
                Student
              </span>
              <span style={{ color: "#5f6368", marginLeft: "0.25rem" }}>
                ▼
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <Layout />

        {/* Main Content */}
        <div className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-content">
              <h1 className="page-title">📘 My Assignments</h1>
              <p className="page-subtitle">
                View, submit, and track all your assignments in one place
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            <div
              className="stat-card"
              onClick={() => handleStatCardClick("all")}
            >
              <div className="stat-header">
                <div className="stat-icon total">📊</div>
              </div>
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Assignments</div>
            </div>

            <div
              className="stat-card"
              onClick={() => handleStatCardClick("pending")}
            >
              <div className="stat-header">
                <div className="stat-icon pending">⏳</div>
              </div>
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>

            <div
              className="stat-card"
              onClick={() => handleStatCardClick("completed")}
            >
              <div className="stat-header">
                <div className="stat-icon completed">✅</div>
              </div>
              <div className="stat-number">{stats.completed}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <span className="filter-label">Filter by:</span>
            <button
              className={"filter-btn" + (filter === "all" ? " active" : "")}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
            <button
              className={"filter-btn" + (filter === "pending" ? " active" : "")}
              onClick={() => handleFilterChange("pending")}
            >
              Pending
            </button>
            <button
              className={
                "filter-btn" + (filter === "completed" ? " active" : "")
              }
              onClick={() => handleFilterChange("completed")}
            >
              Completed
            </button>
            <button
              className={
                "filter-btn" + (filter === "overdue" ? " active" : "")
              }
              onClick={() => handleFilterChange("overdue")}
            >
              Overdue
            </button>
          </div>

          {/* Subjects Grouped View */}
          <div className="subjects-wrapper">
            {subjectsWithProgress.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎉</div>
                <p className="empty-text">
                  No assignments available right now!
                </p>
              </div>
            ) : (
              subjectsWithProgress.map((subject) => {
                const visibleItems = getFilteredItems(subject.items);
                const isExpanded =
                  expandedSubjects[subject.subject] ?? true;

                return (
                  <div key={subject.subject} className="subject-card">
                    {/* Subject Header */}
                    <div className="subject-header" onClick={() => toggleSubject(subject.subject)}>
                      <div className="subject-main-info">
                        <div className="subject-icon-box">
                          <span className="subject-icon-emoji">
                            {subject.icon}
                          </span>
                        </div>
                        <div className="subject-text">
                          <h2 className="subject-title">
                            {subject.subject}
                          </h2>
                          <p className="subject-subtitle">
                            {subject.completed} of {subject.total} lessons
                            {" "}completed
                          </p>
                        </div>
                      </div>

                      <div className="subject-progress-section"  >
                        <div className="subject-progress-bar">
                          <div
                            className="subject-progress-fill"
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                        </div>
                        <span className="subject-progress-percent">
                          {subject.progress}%
                        </span>
                        <button

                          className="subject-toggle-btn"
                          
                        >
                          {isExpanded ? "▴" : "▾"}
                        </button>
                      </div>
                    </div>

                    {/* Subject Items */}
                    {isExpanded && (
                      <div className="subject-items">
                        <div className="subject-items-header">
                          <span className="subject-col type">TYPE</span>
                          <span className="subject-col title">TITLE</span>
                          <span className="subject-col status">STATUS</span>
                          <span className="subject-col action">ACTION</span>
                        </div>

                        {visibleItems.length === 0 ? (
                          <div className="subject-no-items">
                            No items for this filter.
                          </div>
                        ) : (
                          visibleItems.map((item) => (
                            <div key={item.id} className="subject-row">
                              {/* TYPE */}
                              <div className="subject-cell type">
                                <div className="subject-type-icon-box">
                                  <span className="subject-type-icon">
                                    {item.type === "notes" ? "📘" : "📄"}
                                  </span>
                                </div>
                                <span className="subject-type-text">
                                  {item.type
                                    ? item.type.charAt(0).toUpperCase() +
                                      item.type.slice(1)
                                    : "Item"}
                                </span>
                              </div>

                              {/* TITLE */}
                              <div className="subject-cell title">
                                {item.title}
                              </div>

                              {/* STATUS */}
                              <div className="subject-cell status">
                                <span
                                  className={
                                    "status-pill " + item.status
                                  }
                                >
                                  {item.status === "completed"
                                    ? "Completed"
                                    : "Pending"}
                                </span>
                              </div>

                              {/* ACTION */}
                              <div className="subject-cell action">
                                <button
                                  className="subject-view-btn"
                                  onClick={() => viewAssignment(item.id)}
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Notification */}
      <div
        className={
          "notification " +
          notification.type +
          (notification.visible ? " show" : "")
        }
      >
        {notification.message && (
          <>
            <strong>
              {notification.type === "success" && "✅ Success: "}
              {notification.type === "error" && "❌ Error: "}
              {notification.type === "info" && "ℹ️ Info: "}
            </strong>
            {notification.message}
          </>
        )}
      </div>
    </>
  );
}
