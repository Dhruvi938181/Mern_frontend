import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mern-backend-j99c.onrender.com/forgot", { email });
      alert(res.data.message);
      setUserId(res.data.userId);
      setVerified(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://mern-backend-j99c.onrender.com/reset-password/${userId}`, { newpassword: newPassword });
      alert(res.data.message);

      setEmail("");
      setNewPassword("");
      setVerified(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
    navigate("/login");
  };

  return (
    <div style={{ width: "400px", margin: "auto", marginTop: "50px" }}>
      <h2>Forgot Password</h2>

      <form onSubmit={handleVerifyEmail}>
        <input type="email" placeholder="Enter registered email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "10px", marginBottom: "15px" }} />
        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          Verify Email
        </button>
      </form>

      {verified && (
        <>
          <h3 style={{ marginTop: "30px" }}>Reset Password</h3>
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
            />
            <button type="submit" style={{ width: "100%", padding: "10px" }}>
              Update Password
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Forgot;
