import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null); // ✅ Add state for error handling
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        alert("Registration successful");
        navigate("/login"); // Redirect to login page
      } else {
        setError(data.error || "An error occurred, please try again."); // ✅ Handle error
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred. Please try again."); // ✅ Display error message
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* ✅ Show error message */}
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default Register;
