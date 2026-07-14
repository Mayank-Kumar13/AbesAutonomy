import React, { useState } from 'react';
import './LoginPage.css'; 
import { Eye, EyeOff, Loader2 } from 'lucide-react'; 

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating a network request for the demo
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form Submitted:", formData);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    console.log("Redirecting to Google Auth...");
    // Later, this is where you'll trigger the Google OAuth flow!
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          
          <h2 className="modal-title">THE SCHOLAR'S<br />GATEWAY</h2>

          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              LOG IN
            </button>
            <button
              className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              SIGN UP
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Gmail/Github</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Loader2 size={18} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Processing...
                </div>
              ) : (
                activeTab === 'login' ? 'Log In' : 'Sign Up'
              )}
            </button>
          </form>

          {/* --- NEW GOOGLE LOGIN SECTION --- */}
          <div className="divider">or</div>
          
          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            {/* Standard Google G Logo SVG */}
            <svg className="google-icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            Continue with Google
          </button>
          {/* --------------------------------- */}

          {activeTab === 'login' && (
            <div className="modal-footer">
              <a href="#" className="forgot-link">Forgot Password?</a>
              <p className="create-account">
                Don't have an account? <span onClick={() => setActiveTab('signup')}>[Create One]</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
