"use client"
import { useState } from 'react';
import { message } from 'antd';
import { useAuth } from '../contexts/AuthContext'; // Import useNavigate for redirection
import { useRouter } from "next/navigation";

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();// Initialize useNavigate

  const LoginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch('https://fest-event-app-backend.onrender.com/api/customer/customerLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        login(data.token, data.user);
        alert("Organiser Logged in Successfully")
        router.push("/organiser/dashboard"); // ✅ REDIRECT to dashboard
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  return { loading, error, LoginUser }; // Return the LoginUser function
};

export default useLogin;
