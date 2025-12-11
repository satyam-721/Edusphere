import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';
import './LoginComponent.css';
import { supabase } from './SupabaseClient';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text: string }

  async function handleSubmit(e) {
    e?.preventDefault();
    setMessage(null);

    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email.' });
      return;
    }
    if (!password) {
      setMessage({ type: 'error', text: 'Please enter your password.' });
      return;
    }

    setLoading(true);

    try {
      // Supabase v2: sign in with email + password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setMessage({ type: 'error', text: error.message || 'Failed to sign in.' });
        return;
      }

      
      setMessage({ type: 'success', text: 'Signed in successfully.' });

      // setTimeout(() => {
      //   navigate('/dashboard');   
      // }, 500);

      setTimeout(() => {
        if (email === "satyamsagar305@gmail.com") {
          navigate("/teacher");
        } else {
          navigate("/student");
        }
      }, 500);


      setPassword('');
    } catch (err) {
      setLoading(false);
      setMessage({ type: 'error', text: err?.message ?? 'Unexpected error' });
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="icon-badge">
            <Lock className="lock-icon" />
          </div>
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to continue</p>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {message && (
            <div
              style={{
                marginTop: 12,
                color: message.type === 'error' ? 'crimson' : 'green',
                textAlign: 'center'
              }}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
