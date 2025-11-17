import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance"; // make sure file exists
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    mobile: "",
    address: "",
    profilePic: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch User Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/user/profile");

        const data = res.data || {};

        setUser({
          name: data?.name || "",
          mobile: data?.mobile || "",
          address: data?.address || "",
          profilePic: data?.profilePic || "",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("mobile", user.mobile);
      formData.append("address", user.address);

      if (file) formData.append("profilePic", file);

      const res = await axios.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully!");
      setUser(res.data);

    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed!");
    }

    setLoading(false);
  };

  // Handle Delete Account
  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      await axios.delete("/user/delete");
      localStorage.removeItem("token");
      navigate("/signup");
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >

      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        style={{
          padding: "8px 14px",
          background: "#eee",
          borderRadius: "8px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        ← Back to Home
      </button>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Profile</h2>

      {/* Profile Image */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={
            user.profilePic
              ? user.profilePic
              : "https://via.placeholder.com/150?text=Profile"
          }
          alt="Profile"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #ddd",
          }}
        />
      </div>

      <form onSubmit={handleUpdate}>

        {/* Name */}
        <label style={{ fontWeight: "600" }}>Full Name</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          style={inputStyle}
        />

        {/* Mobile */}
        <label style={{ fontWeight: "600" }}>Mobile Number</label>
        <input
          type="text"
          value={user.mobile}
          onChange={(e) => setUser({ ...user, mobile: e.target.value })}
          style={inputStyle}
        />

        {/* Address */}
        <label style={{ fontWeight: "600" }}>Address</label>
        <textarea
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          style={textareaStyle}
        />

        {/* Profile Image Upload */}
        <label style={{ fontWeight: "600" }}>Upload Profile Picture</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: "20px" }}
        />

        {/* Update Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2b7a78",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            border: "none",
            marginTop: "10px",
          }}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {/* Delete Button */}
      <button
        onClick={deleteAccount}
        style={{
          width: "100%",
          padding: "12px",
          background: "red",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          border: "none",
          marginTop: "15px",
        }}
      >
        Delete Account
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "15px",
  fontSize: "15px",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "15px",
  height: "80px",
  fontSize: "15px",
};
