import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../backendUrl";
const Signup = () => {
  const url = backendUrl();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async () => {
    setLoading(true);
    await axios
      .post(`${url}/user/registration/`, form)
      .then((res) => {
        const { response } = res.data;
        if (response === "registration Successful") {
          swal({
            text: "Sucessfully Registered",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          const { token } = res.data;
          localStorage.setItem("token", token);
          setLoading(false);
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log(error.response.data.Error);
        setError(error.response.data.Error);
        setLoading(false);
      });
  };

  return (
    <div className="w-full flex flex-col mt-8 items-center">
      <h1 className="text-xl font-bold">Sign up</h1>
      <br />
      <span className="text-lg text-blue-500 font-bold">{error}</span>
      <div class="p-2 w-full md:w-1/3">
        <div className="flex">
          <div class="relative mr-2">
            <label for="message" class="leading-7 text-sm text-gray-300">
              First Name
            </label>
            <input
              id="first_name"
              name="message"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative ">
            <label for="message" class="leading-7 text-sm text-gray-300">
              Last Name
            </label>
            <input
              id="second_name"
              name="message"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Email.
          </label>
          <input
            type={"email"}
            id="email"
            name="message"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
                username: e.target.value,
              })
            }
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
            type={"password"}
            id="password"
            name="message"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Confirm Password
          </label>
          <input
            type={"password"}
            id="con_message"
            name="message"
            value={form.password2}
            onChange={(e) => setForm({ ...form, password2: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full">
        <button
          onClick={register}
          class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Register"}
        </button>
      </div>

      <div>
        <p>
          Already have an account{" "}
          <Link to={"/login"}>
            <span className="text-blue-500">Login</span>
          </Link>
        </p>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signup;
