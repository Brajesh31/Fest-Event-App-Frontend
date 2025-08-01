"use client"
import { useState } from 'react';
import { message } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from "next/navigation";

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {  // Updated field name to `passwordConfirm`
      setError("Passwords do not match");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch('https://fest-event-app-backend.onrender.com/api/customer/customerSignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });


      const data = await res.json();

      if (res.status === 200) {
        login(data.token, data.user);
        router.push("/organiser/login");
        alert("Organiser Registered Successfully")// ✅ REDIRECT to dashboard
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  return { loading, error, registerUser };
};

export default useSignup;
