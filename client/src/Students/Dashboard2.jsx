import React from "react";

const recentAssignments = [
  {
    id: 1,
    title: "Algebra - Practice Set 5",
    course: "Mathematics",
    submittedAt: "2025-12-08 09:32",
    grade: "A-",
    link: "/assignments/1",
  },
  {
    id: 2,
    title: "Lab Report: Acid-Base Titration",
    course: "Chemistry",
    submittedAt: "2025-12-07 18:20",
    grade: "B+",
    link: "/assignments/2",
  },
  {
    id: 3,
    title: "History Essay: Industrial Revolution",
    course: "History",
    submittedAt: "2025-12-06 22:15",
    grade: "A",
    link: "/assignments/3",
  },
];

const todaysClasses = [
  { subject: "Mathematics 101", time: "2:00 PM", students: 24, room: "Room 205", status: "In 30 min", initial: "M", color: "bg-blue-500" },
  { subject: "Physics Advanced", time: "4:15 PM", students: 18, room: "Lab A", status: "In 2h 45m", initial: "P", color: "bg-blue-500" },
  { subject: "Chemistry Lab", time: "5:00 PM", students: 20, room: "Lab B", status: "In 3h 30m", initial: "C", color: "bg-blue-500" }
];

const upcomingEvents = [
  { date: "25", month: "SEP", title: "Parent-Teacher Conference", time: "3:00 PM - 6:00 PM" },
  { date: "28", month: "SEP", title: "Math Test - Grade 10", subtitle: "Period 3 & 4" }
];

export default function Dashboard() {
  const totalAssignments = 45;
  const doubtsCleared = 38;
  const totalStudents = 156;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .hero-section {
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%);
          padding: 48px 40px;
          border-radius: 24px;
          margin: 24px;
          box-shadow: 0 10px 40px rgba(37, 99, 235, 0.3);
        }

        .hero-content h1 {
          color: white;
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .hero-content p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          margin-top: 32px;
        }

        .hero-btn {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .hero-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          padding: 0 24px;
          margin: 24px 0;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e5e7eb;
          transition: all 0.3s;
        }

        .stat-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }

        .stat-badge {
          background: #dcfce7;
          color: #16a34a;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .stat-badge.blue-badge {
          background: #dbeafe;
          color: #2563eb;
        }

        .stat-badge.yellow-badge {
          background: #fef3c7;
          color: #d97706;
        }

        .stat-badge.red-badge {
          background: #fee2e2;
          color: #dc2626;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .stat-label {
          color: #6b7280;
          font-size: 14px;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 24px 24px;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e5e7eb;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
        }

        .view-link {
          color: #2563eb;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
        }

        .view-link:hover {
          text-decoration: underline;
        }

        .class-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .class-item:last-child {
          border-bottom: none;
        }

        .class-initial {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #3b82f6;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .class-info {
          flex: 1;
        }

        .class-name {
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .class-details {
          font-size: 13px;
          color: #6b7280;
        }

        .class-time-section {
          text-align: right;
        }

        .class-time {
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .class-status {
          font-size: 12px;
          color: #16a34a;
          font-weight: 500;
        }

        .event-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .event-item:last-child {
          border-bottom: none;
        }

        .event-date {
          width: 56px;
          text-align: center;
          flex-shrink: 0;
        }

        .event-date-number {
          font-size: 24px;
          font-weight: 700;
          color: #2563eb;
          line-height: 1;
        }

        .event-date-month {
          font-size: 12px;
          color: #6b7280;
          font-weight: 500;
          margin-top: 4px;
        }

        .event-info {
          flex: 1;
        }

        .event-title {
          font-size: 15px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .event-subtitle {
          font-size: 13px;
          color: #6b7280;
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome back, Demo Teacher!</h1>
          <p>.....</p>
        </div>
        <div className="hero-buttons">
          <a href="/create-assignment" className="hero-btn">
            ➕ Create Assignment
          </a>
          <a href="/create-notes" className="hero-btn">
            📝 Create Notes
          </a>
          <a href="/view-status" className="hero-btn">
            📊 View Status
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: "#dbeafe" }}>
              👥
            </div>
            <div className="stat-badge">+12 this week</div>
          </div>
          <div className="stat-number">{totalStudents}</div>
          <div className="stat-label">Total Students</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: "#dcfce7" }}>
              📚
            </div>
            <div className="stat-badge blue-badge">3 today</div>
          </div>
          <div className="stat-number">8</div>
          <div className="stat-label">Active Classes</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: "#fef3c7" }}>
              📋
            </div>
            <div className="stat-badge yellow-badge">12 pending</div>
          </div>
          <div className="stat-number">{totalAssignments}</div>
          <div className="stat-label">Assignments</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{ background: "#fee2e2" }}>
              💬
            </div>
            <div className="stat-badge red-badge">5 unread</div>
          </div>
          <div className="stat-number">28</div>
          <div className="stat-label">Messages</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Today's Classes */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Today's Classes</h2>
            <a href="/classes" className="view-link">View All</a>
          </div>
          {todaysClasses.map((cls, index) => (
            <div key={index} className="class-item">
              <div className="class-initial">{cls.initial}</div>
              <div className="class-info">
                <div className="class-name">{cls.subject}</div>
                <div className="class-details">{cls.students} students • {cls.room}</div>
              </div>
              <div className="class-time-section">
                <div className="class-time">{cls.time}</div>
                <div className="class-status">{cls.status}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Upcoming Events</h2>
            <a href="/calendar" className="view-link">View Calendar</a>
          </div>
          {upcomingEvents.map((event, index) => (
            <div key={index} className="event-item">
              <div className="event-date">
                <div className="event-date-number">{event.date}</div>
                <div className="event-date-month">{event.month}</div>
              </div>
              <div className="event-info">
                <div className="event-title">{event.title}</div>
                <div className="event-subtitle">{event.time || event.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}