// ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from './Auth/SupabaseClient';

const TEACHER_EMAIL = 'satyamsagar305@gmail.com';

export default function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function check() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    }

    check();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  if (loading) return <div>Loading...</div>;

  // not logged in
  if (!session) return <Navigate to="/" replace />;

  const email = session.user?.email ?? '';

  // role enforcement logic
  if (role === 'teacher') {
    // only teacher email allowed
    if (email === TEACHER_EMAIL) return children;
    // else redirect to student's main route
    return <Navigate to="/student" replace />;
  }

  if (role === 'student') {
    // only non-teacher emails allowed for student area
    if (email !== TEACHER_EMAIL) return children;
    // teacher tried to access student area -> send to teacher dashboard
    return <Navigate to="/teacher" replace />;
  }

  // default: allow
  return children;
}
