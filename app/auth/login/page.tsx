"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { saveUserToFirestore } from "@/lib/firestore"; // 🔥 Import Firestore function

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Login button clicked!"); // Check if the function is called
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      await login(email, password);
      console.log("Login successful! Saving to Firestore...");

      await saveUserToFirestore(); // 🔥 Save user to Firestore

      console.log("User saved in Firestore! Redirecting...");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleLogin();
        }}
        className="w-full p-3 bg-blue-500 text-white rounded"
      >
        Login
      </button>
    </div>
  );
}
