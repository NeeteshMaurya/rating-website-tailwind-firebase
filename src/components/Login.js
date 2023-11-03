import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import {query, where, getDocs} from 'firebase/firestore'
import { usersRef } from "../firebase/firebase";
import { Appstate } from "../App";
import bcrypt from 'bcryptjs'
import loginimg from './login.jpg'
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    mobile: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  
    const login = async () => {
      setLoading(true);
      try {
        const quer = query(usersRef, where('mobile', '==', form.mobile))
        const querySnapshot = await getDocs(quer);
        querySnapshot.forEach((doc) => {
          const _data = doc.data();
          const isUser = bcrypt.compareSync(form.password, _data.password);
          if(isUser) {
            useAppstate.setLoggedin(true);
            useAppstate.setUserName(_data.name);
            swal({
              title: "Logged In",
              icon: "success",
              timer: 5000
            })
            navigate('/')
          } else {
            swal({
              title: "Invalid Credentials",
              icon: "error",
              timer: 5000
            })
          }
        })
        if(querySnapshot.empty){
          swal({
            title: "Invalid Credentials",
            icon: "error",
            timer: 5000
          })
        }
      } catch (error) {
        swal({
          title: error.message,
          icon: "error",
          timer: 5000
        })
      }
      setLoading(false);
    }


  return (
    <div className="w-full md:flex mt-8 items-center">
      <div
        class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
        <img
          src={loginimg}
          className="w-full mt-10"
          alt="login image" />
      </div>

      <div className="flex flex-col w-full md:ml-[100px]">
      <h1 className="text-[40px] md:w-2/3 font-bold text-center">Login</h1>
      <div class="p-2 w-full md:w-2/3 ">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Mobile No.
          </label>
          <input
            type={"number"}
            id="message"
            name="message"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 w-full md:w-2/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
            id="message"
            name="message"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div class="p-2 md:w-2/3 text-center">
        <button onClick={login}
          class="flex mx-auto text-white bg-gradient-to-br from-purple-600 to-blue-500  border-0 py-2 px-8 
          focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {loading ? <TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      <div className="md:w-2/3 text-center">
        <p>Do not have account? <Link to={'/signup'}><span className="text-blue-500">Sign Up</span></Link></p>
      </div>
    </div>
    </div>
  );
};

export default Login;