import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return setMessage("Both fields are required");
    }

    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setMessage("Password changed successfully!");
      
      setTimeout(() => {
        navigate("/profile");
      }, 1500);

    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-4">
          Change Password
        </h2>

        {message && (
          <p
            className={`text-center mb-3 font-medium ${
              message.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">

          <div>
            <label className="block font-semibold mb-1">New Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Change Password
          </button>
        </form>

        <button
          onClick={() => navigate("/profile")}
          className="w-full mt-3 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
}
