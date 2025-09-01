
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Main SignUp component that renders the sign-up form
const SignUp = () => {
  // State to manage all form data, including nested objects
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    system_specs: {
      os_version: '',
      processor: {
        intel: '',
        amd: '',
      },
      RAM: '',
      graphics_card: '',
      disk: '',
    },
  });

  // Dropdown options for system specifications
  const specOptions = {
    osVersions: [
      { value: '', label: 'Select OS Version' },
      { value: 'Windows 11', label: 'Windows 11' },
      { value: 'Windows 10', label: 'Windows 10' },
      { value: 'Windows 8.1', label: 'Windows 8.1' },
      { value: 'Windows 7', label: 'Windows 7' },
      { value: 'macOS Sonoma', label: 'macOS Sonoma' },
      { value: 'macOS Ventura', label: 'macOS Ventura' },
      { value: 'macOS Monterey', label: 'macOS Monterey' },
      { value: 'Ubuntu 22.04', label: 'Ubuntu 22.04' },
      { value: 'Ubuntu 20.04', label: 'Ubuntu 20.04' },
      { value: 'Other Linux', label: 'Other Linux' },
    ],
    ramOptions: [
      { value: '', label: 'Select RAM' },
      { value: '4', label: '4 GB' },
      { value: '8', label: '8 GB' },
      { value: '16', label: '16 GB' },
      { value: '32', label: '32 GB' },
      { value: '64', label: '64 GB' },
      { value: '128', label: '128 GB' },
    ],
    graphicsCards: [
      { value: '', label: 'Select Graphics Card' },
      // NVIDIA Cards
      { value: 'RTX 4090', label: 'NVIDIA RTX 4090' },
      { value: 'RTX 4080', label: 'NVIDIA RTX 4080' },
      { value: 'RTX 4070 Ti', label: 'NVIDIA RTX 4070 Ti' },
      { value: 'RTX 4070', label: 'NVIDIA RTX 4070' },
      { value: 'RTX 4060 Ti', label: 'NVIDIA RTX 4060 Ti' },
      { value: 'RTX 4060', label: 'NVIDIA RTX 4060' },
      { value: 'RTX 3080 Ti', label: 'NVIDIA RTX 3080 Ti' },
      { value: 'RTX 3080', label: 'NVIDIA RTX 3080' },
      { value: 'RTX 3070 Ti', label: 'NVIDIA RTX 3070 Ti' },
      { value: 'RTX 3070', label: 'NVIDIA RTX 3070' },
      { value: 'RTX 3060 Ti', label: 'NVIDIA RTX 3060 Ti' },
      { value: 'RTX 3060', label: 'NVIDIA RTX 3060' },
      { value: 'GTX 1660 Ti', label: 'NVIDIA GTX 1660 Ti' },
      { value: 'GTX 1660', label: 'NVIDIA GTX 1660' },
      { value: 'GTX 1650', label: 'NVIDIA GTX 1650' },
      // AMD Cards
      { value: 'RX 7900 XTX', label: 'AMD RX 7900 XTX' },
      { value: 'RX 7900 XT', label: 'AMD RX 7900 XT' },
      { value: 'RX 7800 XT', label: 'AMD RX 7800 XT' },
      { value: 'RX 7700 XT', label: 'AMD RX 7700 XT' },
      { value: 'RX 6800 XT', label: 'AMD RX 6800 XT' },
      { value: 'RX 6700 XT', label: 'AMD RX 6700 XT' },
      { value: 'RX 6600 XT', label: 'AMD RX 6600 XT' },
      { value: 'RX 6500 XT', label: 'AMD RX 6500 XT' },
      // Integrated Graphics
      { value: 'Intel UHD Graphics', label: 'Intel UHD Graphics' },
      { value: 'Intel Iris Xe', label: 'Intel Iris Xe' },
      { value: 'AMD Radeon Graphics', label: 'AMD Radeon Graphics' },
    ],
    diskOptions: [
      { value: '', label: 'Select Storage' },
      { value: '128', label: '128 GB' },
      { value: '256', label: '256 GB' },
      { value: '512', label: '512 GB' },
      { value: '1000', label: '1 TB' },
      { value: '2000', label: '2 TB' },
      { value: '4000', label: '4 TB' },
      { value: '8000', label: '8 TB' },
    ],
    intelProcessors: [
      { value: '', label: 'Select Intel Processor' },
      { value: 'i9-13900K', label: 'Intel i9-13900K' },
      { value: 'i9-12900K', label: 'Intel i9-12900K' },
      { value: 'i7-13700K', label: 'Intel i7-13700K' },
      { value: 'i7-12700K', label: 'Intel i7-12700K' },
      { value: 'i5-13600K', label: 'Intel i5-13600K' },
      { value: 'i5-12600K', label: 'Intel i5-12600K' },
      { value: 'i5-11600K', label: 'Intel i5-11600K' },
      { value: 'i5-10600K', label: 'Intel i5-10600K' },
      { value: 'i3-12100', label: 'Intel i3-12100' },
      { value: 'i3-10100', label: 'Intel i3-10100' },
    ],
    amdProcessors: [
      { value: '', label: 'Select AMD Processor' },
      { value: 'Ryzen 9 7950X', label: 'AMD Ryzen 9 7950X' },
      { value: 'Ryzen 9 5950X', label: 'AMD Ryzen 9 5950X' },
      { value: 'Ryzen 7 7800X3D', label: 'AMD Ryzen 7 7800X3D' },
      { value: 'Ryzen 7 5800X', label: 'AMD Ryzen 7 5800X' },
      { value: 'Ryzen 5 7600X', label: 'AMD Ryzen 5 7600X' },
      { value: 'Ryzen 5 5600X', label: 'AMD Ryzen 5 5600X' },
      { value: 'Ryzen 5 3600', label: 'AMD Ryzen 5 3600' },
      { value: 'Ryzen 3 3300X', label: 'AMD Ryzen 3 3300X' },
    ],
  };

  // Handle changes for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Split the name by '.' to handle nested fields like 'system_specs.os_version'
    const parts = name.split('.');
    
    // If it's a top-level field (email or password)
    if (parts.length === 1) {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    } 
    // If it's a nested field (system_specs or processor)
    else if (parts.length === 2) {
      setFormData(prevData => ({
        ...prevData,
        [parts[0]]: {
          ...prevData[parts[0]],
          [parts[1]]: value,
        },
      }));
    } else if (parts.length === 3) {
      setFormData(prevData => ({
        ...prevData,
        [parts[0]]: {
          ...prevData[parts[0]],
          [parts[1]]: {
            ...prevData[parts[0]][parts[1]],
            [parts[2]]: value,
          },
        },
      }));
    }
  };


  // Handle form submission and connect to backend
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async () => {
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful!');
        if (data.user && data.user.username) {
          localStorage.setItem('username', data.user.username);
        }
        window.dispatchEvent(new Event('user-login'));
        setTimeout(() => navigate('/'), 1000);
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  return (
    <div className="app-contain">
      <div className="glass-card">
        <h1 className="title">Create Your Profile</h1>
        <p className="subtitle">
          Sign up to get started and tell us about your PC specs.
        </p>

        <div className="form-container">
          {/* General Account Information */}
          <div className="section-container">
            <h2 className="section-title">Account Info</h2>
            <div>
              <label className="input-label" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="glass-input"
              />
            </div>
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
          </div>

          {/* System Specifications Section */}
          <div className="section-container">
            <h2 className="section-title">System Specifications</h2>

            <div className="specs-grid">
              {/* OS Version */}
              <div>
                <label className="input-label" htmlFor="os_version">OS Version</label>
                <select
                  id="os_version"
                  name="system_specs.os_version"
                  value={formData.system_specs.os_version}
                  onChange={handleChange}
                  required
                  className="glass-select"
                >
                  {specOptions.osVersions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* RAM */}
              <div>
                <label className="input-label" htmlFor="ram">RAM</label>
                <select
                  id="ram"
                  name="system_specs.RAM"
                  value={formData.system_specs.RAM}
                  onChange={handleChange}
                  required
                  className="glass-select"
                >
                  {specOptions.ramOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Graphics Card */}
              <div>
                <label className="input-label" htmlFor="graphics_card">Graphics Card</label>
                <select
                  id="graphics_card"
                  name="system_specs.graphics_card"
                  value={formData.system_specs.graphics_card}
                  onChange={handleChange}
                  required
                  className="glass-select"
                >
                  {specOptions.graphicsCards.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Disk Space */}
              <div>
                <label className="input-label" htmlFor="disk">Storage</label>
                <select
                  id="disk"
                  name="system_specs.disk"
                  value={formData.system_specs.disk}
                  onChange={handleChange}
                  required
                  className="glass-select"
                >
                  {specOptions.diskOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Processor Details */}
            <div className="space-y-4">
              <label className="input-label">Processor (Choose Intel OR AMD)</label>
              <div className="specs-grid">
                {/* Intel Processor */}
                <div>
                  <select
                    id="intel_processor"
                    name="system_specs.processor.intel"
                    value={formData.system_specs.processor.intel}
                    onChange={handleChange}
                    className="glass-select"
                  >
                    {specOptions.intelProcessors.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* AMD Processor */}
                <div>
                  <select
                    id="amd_processor"
                    name="system_specs.processor.amd"
                    value={formData.system_specs.processor.amd}
                    onChange={handleChange}
                    className="glass-select"
                  >
                    {specOptions.amdProcessors.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="button"
              onClick={handleSubmit}
              className="submit-button"
            >
              Sign Up 
            </button>
            {message && <div style={{marginTop: '1rem', color: message.includes('success') ? 'lightgreen' : 'salmon'}}>{message}</div>}
          </div>
        <p style={{marginBottom: '1rem' }}>
          Already have an account? <Link style={{marginBottom: '1rem',color: '#00c8ffff',textDecoration: 'none'}} to="/login">Login here</Link>
        </p>
        </div>
      </div>

      {/* External CSS styling block */}
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
          max-width: 48rem; /* A bit wider for better layout on desktop */
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

export default SignUp;