import React, { useState } from 'react';

// Main App component that renders the login form
const App = () => {
  // State to manage form data for email and password
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle changes for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the complete form data to the console
    console.log('Login Data Submitted:', formData);
    // In a real application, you would send this data to a server for authentication
  };

  return (
    <div className="app-contain">
      <div className="glass-card">
        <h1 className="title">Welcome Back!</h1>
        <p className="subtitle">
          Log in to access your game library and profile.
        </p>

        <form onSubmit={handleSubmit} className="form-container">
          {/* Login Form Section */}
          <section className="section-container">
            <h2 className="section-title">Account Login</h2>
            <div>
              <label className="input-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass-input"
              />
            </div>
            <div>
              <label className="input-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="glass-input"
              />
            </div>
          </section>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="submit-button"
            >
              Log In
            </button>
          </div>
        </form>
      </div>

      {/* External CSS styling block (reused from the sign-up page) */}
      <style>{`
        /* Import a custom font and normalize styles */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          color: #E0E0E0;
          background-color: #121212;
        }

        .app-contain {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 1rem;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          border-radius: 1.5rem;
          padding: 2rem;
          width: 100%;
          max-width: 48rem;
        }

        .title {
          font-size: 2.25rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .subtitle {
          text-align: center;
          color: #BDBDBD;
          margin-bottom: 2rem;
        }
        
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .section-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .glass-input, .glass-select {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #E0E0E0;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }

        .glass-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23BDBDBD' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
        }

        .glass-select option {
          background-color: #2A2A2A;
          color: #E0E0E0;
          padding: 0.5rem;
        }

        .glass-input::placeholder {
          color: #9E9E9E;
        }

        .glass-input:focus, .glass-select:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
        }
        
        .specs-grid {
            display: grid;
            grid-template-columns: repeat(1, minmax(0, 1fr));
            gap: 1rem;
        }

        .submit-button {
          width: 100%;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          font-weight: 700;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: none;
          cursor: pointer;
        }

        .submit-button:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .submit-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
        }
        
        /* Responsive adjustments */
        @media (min-width: 768px) {
          .specs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default App;
