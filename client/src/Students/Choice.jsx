import React, { useState, useMemo, useEffect } from "react";
import "./Choice.css";
import Layout from "./Layouts/Layout";
import { useNavigate } from "react-router-dom";



// const ASSIGNMENTS = [
//   {
//     id: 1,
//     title: "Linear Equations Worksheet",
//     status: "pending",
//     subjectIcon: " ",
//     subject: "Mathematics",
//     line2Icon: "📅",
//     line2Text: "Due: 10 Dec 2025 (5 days left)",
//     line2Class: "due-soon",
//     line3Icon: "📊",
//     line3Text: "Points: 20",
//     isOverdue: false,
//   },
//   {
//     id: 2,
//     title: "Newton's Laws Short Answers",
//     status: "completed",
//     subjectIcon: " ",
//     subject: "Physics",
//     line2Icon: "📅",
//     line2Text: "Submitted: 03 Dec 2025",
//     line3Icon: "⭐",
//     line3Text: "Score: 18/20",
//     isOverdue: false,
//   },
//   {
//     id: 3,
//     title: "Plant Cell Diagram",
//     status: "pending",
//     subjectIcon: "🌱",
//     subject: "Biology",
//     line2Icon: "📅",
//     line2Text: "Due: 15 Dec 2025 (10 days left)",
//     line3Icon: "📊",
//     line3Text: "Points: 15",
//     isOverdue: false,
//   },
//   {
//     id: 4,
//     title: "Thermodynamics MCQs",
//     status: "completed",
//     subjectIcon: "⚗️",
//     subject: "Physics",
//     line2Icon: "📅",
//     line2Text: "Submitted: 07 Dec 2025",
//     line3Icon: "⭐",
//     line3Text: "Score: 25/25",

//     isOverdue: false,
//   },
// ];

// const NAV_ITEMS = [
//   { icon: "□", label: "Dashboard" },
//   { icon: "📚", label: "My Lessons" },
//   { icon: "📝", label: "Assignments" },
//   { icon: "◒", label: "Grades" },
//   { icon: "❓", label: "My Doubts" },
// ];

// const SUBJECT_ITEMS = [
//   { icon: "🔢", label: "Mathematics" },
//   { icon: "⚗️", label: "Physics" },
//   { icon: "🧪", label: "Chemistry" },
//   { icon: "🌱", label: "Biology" },
// ];



export default function Choice() {
  const [ASSIGNMENTS, setASSIGNMENT] = useState([]);
  const navigate = useNavigate();


    useEffect(() => {
      console.log("hii from outside")
      
    document.title = "Assignments - Student Portal";
    (async()=>{
      
      try{
        const response=await fetch("http://localhost:5000/assignmentnotesfetch",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"         
          }
        });
        if(!response.ok){
          throw new Error(`Fetch failed at Choice.jsx: ${response.status}`); 
        }

        const data=await response.json();
        data.forEach(item => {
          item.subject = item.subject.charAt(0).toUpperCase() + item.subject.slice(1);

          // Map subject to icon
          let subjectIcon = "📘"; // Default icon
          if (item.subject === "Mathematics") subjectIcon = "🔢";
          else if (item.subject === "Physics") subjectIcon = "⚗️";
          else if (item.subject === "Chemistry") subjectIcon = "🧪";
          else if (item.subject === "Biology") subjectIcon = "🌱";
          else if (item.subject === "History") subjectIcon = "🏺";
          // Determine line2 and line3 based on status  
          let line2Icon="📅";
          let line3Icon = "📊";
          let line2Text = "Due: 15 Dec 2025 (3 days left)";
          let line3Text= "Points: 15";
          let isOverdue= false;
          item.subjectIcon = subjectIcon;
          item.line2Icon = line2Icon;
          item.line3Icon = line3Icon;
          item.line2Text = line2Text;
          item.line3Text = line3Text;
          item.line2Class = "";
          item.isOverdue = isOverdue;
      })

        setASSIGNMENT(data);

        

        // Here you can set the fetched data to state if needed
      }catch(err){
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

  const stats = useMemo(() => {
    const total = ASSIGNMENTS.length;
    const pending = ASSIGNMENTS.filter((a) => a.status === "pending").length;
    const completed = ASSIGNMENTS.filter((a) => a.status === "completed").length;
    return { total, pending, completed };
  }, [ASSIGNMENTS]);

  const filteredAssignments = useMemo(() => {
    return ASSIGNMENTS.filter((a) => {
      if (filter === "all") return true;
      if (filter === "overdue") return a.isOverdue;
      return a.status === filter;
    });
  }, [filter, ASSIGNMENTS]);

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
        
        <Layout/>

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

          {/* Assignment Grid */}
          <div className="assignment-grid">
            {filteredAssignments.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🎉</div>
                <p className="empty-text">
                  No assignments in this category right now!
                </p>
              </div>
            ) : (
              filteredAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="assignment-card"
                  data-status={assignment.status}
                >
                  <div className="assignment-top">
                    <h3 className="assignment-title">{assignment.title}</h3>
                    <span
                      className={
                        "status-badge " +
                        (assignment.status === "completed"
                          ? "completed"
                          : "pending")
                      }
                    >
                      {assignment.status === "completed"
                        ? "Completed"
                        : "Pending"}
                    </span>
                  </div>

                  <div className="assignment-meta">
                    <div className="meta-item">
                      <span className="meta-icon">
                        {assignment.subjectIcon}
                      </span>
                      <span>{assignment.subject}</span>
                    </div>
                    <div
                      className={
                        "meta-item " + (assignment.line2Class || "")
                      }
                    >
                      <span className="meta-icon">{assignment.line2Icon}</span>
                      <span>{assignment.line2Text}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">{assignment.line3Icon}</span>
                      <span>{assignment.line3Text}</span>
                    </div>
                  </div>

                  <div className="assignment-actions">
                    <button
                      className="action-btn primary"
                      onClick={() => viewAssignment(assignment.id)}
                    >
                      {assignment.status === "completed"
                        ? "OPEN"
                        : "OPEN"}
                    </button>

                    {/* {assignment.status === "pending" && (
                      <button
                        className="action-btn secondary"
                        onClick={() => submitAssignment(assignment.id)}
                      >
                        Submit
                      </button>
                    )} */}
                  </div>
                </div>
              ))
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
