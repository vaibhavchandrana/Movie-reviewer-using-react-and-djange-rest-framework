import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { backendUrl } from "../backendUrl";
import { TailSpin } from "react-loader-spinner";
const Login = () => {
  const url = backendUrl();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const fetchUserId = async (token) => {
    try {
      const response = await axios.get(`${url}/user/get-user-id/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      localStorage.setItem("mu_id", response.data.user_id);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${url}/user/login/`, form);

      if (response.status === 200) {
        swal({
          text: "Successfully logged in",
          icon: "success",
          buttons: false,
          timer: 3000,
        });

        const { token } = response.data;
        localStorage.setItem("movie_token", token);
        fetchUserId(token);
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      swal({
        text: "Invalid credentials",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col mt-8 items-center">
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm bg-black border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-white-800 text-white">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600 text-gray-400">
                Don't have an account yet?
                <Link
                  to="/signup"
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 text-gray-500 before:border-gray-600 after:border-gray-600">
                Or
              </div>

              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm mb-2 text-white"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleFormChange}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-black border-gray-700 text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="password"
                        className="block text-sm mb-2 text-white"
                      >
                        Password
                      </label>
                      <Link
                        to="/recover-account"
                        className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleFormChange}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-black border-gray-700 text-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 bg-black border-gray-700 checked:bg-blue-500 checked:border-blue-500 focus:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-white"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogin}
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                    disabled={loading}
                  >
                    {loading ? (
                      <TailSpin
                        className="animate-spin h-5 w-5 text-white"
                        role="status"
                        color="#ffffff"
                        height={20}
                        width={20}
                      />
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
