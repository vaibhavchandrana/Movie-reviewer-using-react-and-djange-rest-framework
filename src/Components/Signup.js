import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../backendUrl";
import { TailSpin } from "react-loader-spinner";
const Signup = () => {
  const url = backendUrl();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      setForm({
        ...form,
        email: value,
        [name]: value,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (form.password !== form.password2) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${url}/user/registration/`, form);

      if (response.status == 201) {
        swal({
          text: "Successfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        const { token } = response.data;
        localStorage.setItem("movie_token", token);
        localStorage.setItem("mu_id", response.data.id);
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col mt-8 items-center">
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm bg-black border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold  text-white">Sign up</h1>
              <p className="mt-2 text-sm text-gray-600 text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 text-gray-500 before:border-gray-600 after:border-gray-600">
                Or
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-y-4">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm mb-2 text-white"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleInputChange}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-800 border-gray-700 text-gray-400"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm mb-2 text-white"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleInputChange}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-800 border-gray-700 text-gray-400"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm mb-2 text-white"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleInputChange}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-800 border-gray-700 text-gray-400"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm mb-2 text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-800 border-gray-700 text-gray-400"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password2"
                      className="block text-sm mb-2 text-white"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="password2"
                        name="password2"
                        value={form.password2}
                        onChange={handleInputChange}
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-800 border-gray-700 text-gray-400"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                    disabled={loading}
                  >
                    {loading ? (
                      <TailSpin
                        color="#ffffff"
                        height={20}
                        width={20}
                        className="animate-spin"
                      />
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </div>
              </form>
              {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
