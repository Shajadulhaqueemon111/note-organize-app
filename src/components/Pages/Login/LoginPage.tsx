/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  _id: string;
  name: string;
  profileImage: string;
  role: string;
  iat: number;
  exp: number;
}

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: {
    preventDefault: () => void;
    target: any;
  }) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const loginUser = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        loginUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      const token = response.data?.data?.accessToken;
      console.log(token);
      if (token) {
        login(token);

        const decoded = jwtDecode<DecodedToken>(token);
        console.log("Decoded Token:", decoded);

        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error("Login failed. Invalid credentials.");
      }
    } catch (err) {
      toast.error("Password or email address is incorrect");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
