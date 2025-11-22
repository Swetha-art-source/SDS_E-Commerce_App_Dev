import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
      setMobile(response.data.mobile);
      setAddress(response.data.address);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("mobile", mobile);
      formData.append("address", address);

      if (profilePicFile) {
        formData.append("profilePic", profilePicFile);
      }

      await axios.put("http://localhost:5000/api/user/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
      setEditMode(false);
      fetchUserProfile();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This action is permanent!")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile deleted successfully!");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete profile");
    }
  };

  if (!user) return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading...</h2>;

  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        {/* Back Button */}
        <button onClick={() => navigate("/home")} style={styles.backBtn}>
          ← Back to Home
        </button>

        <div style={{ textAlign: "center" }}>
          {/* Profile Picture */}
          <img
            src={`http://localhost:5000${user.profilePic}`}
            alt="Profile"
            style={styles.profileImg}
          />
          <h2 style={{ marginTop: "10px" }}>{user.name}</h2>
          <p style={{ color: "gray", marginBottom: "20px" }}>{user.email}</p>
        </div>

        {/* Edit Fields */}
        {editMode ? (
          <>
            <label style={styles.label}>Mobile Number</label>
            <input
              style={styles.input}
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <label style={styles.label}>Address</label>
            <input
              style={styles.input}
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label style={styles.label}>Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setProfilePicFile(e.target.files[0])}
              style={{ marginBottom: "20px" }}
            />

            <button onClick={handleUpdate} style={styles.saveBtn}>
              Save Changes
            </button>
            <button onClick={() => setEditMode(false)} style={styles.cancelBtn}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Mobile:</strong> {user.mobile}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>

            <button
              onClick={() => navigate("/change-password")}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Change Password
            </button>

            <button onClick={() => setEditMode(true)} style={styles.updateBtn}>
              Update Profile
            </button>

            <button onClick={handleDelete} style={styles.deleteBtn}>
              Delete Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;

// ----------------------
// CSS STYLES
// ----------------------

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 10px",
    background: "#f5f7fa",
    minHeight: "100vh",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
  },

  backBtn: {
    background: "#eee",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "600",
  },

  profileImg: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #ddd",
  },

  label: {
    fontWeight: "600",
    marginTop: "10px",
    display: "block",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "6px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },

  updateBtn: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "12px",
  },

  changePassLink: {
    display: "block",
    margin: "10px 0",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "600",
  },

  saveBtn: {
    width: "100%",
    padding: "12px",
    background: "#28a745",
    color: "white",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },

  cancelBtn: {
    width: "100%",
    padding: "12px",
    background: "#6c757d",
    color: "white",
    borderRadius: "8px",
    border: "none",
    marginTop: "10px",
    cursor: "pointer",
  },

  deleteBtn: {
    width: "100%",
    padding: "12px",
    background: "red",
    color: "white",
    borderRadius: "8px",
    border: "none",
    marginTop: "10px",
    cursor: "pointer",
  },
};
