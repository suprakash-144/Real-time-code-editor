import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

const Login = () => {
  const [login, setlogin] = useState(true);
  const { signupUser, signinUser, authchange } = useContext(FirebaseContext);
  const { logedin } = authchange();

  const navigate = useNavigate();
  useEffect(() => {
    if (logedin) {
      // toast.success("Login Successful");
      navigate("/home");
    }
  }, [logedin]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="loginpage">
      <div className="d-flex">
        <div className=" min-vh-100  col-6 bg-white">
          {login ? (
            <div className="d-flex flex-column gap-3 justify-content-center align-items-center h-100">
              <div className="d-flex justify-content-center align-items-center flex-column ">
                <div className=" d-flex justify-content-center text-dark">
                  <form
                    onSubmit={handleSubmit(signinUser)}
                    className=" d-flex flex-column"
                  >
                    <label> Email Address</label>
                    <input
                      {...register("email")}
                      className="form-control"
                      placeholder="email"
                    />
                    <p>{errors.email?.message}</p>
                    <label>Password</label>
                    <input
                      {...register("password")}
                      className="form-control"
                      placeholder="Password"
                    />
                    <p>{errors.password?.message}</p>

                    <button type="submit" className="btn btn-primary mt-3 ">
                      Login Now
                    </button>
                  </form>
                </div>
              </div>
              <div className="">
                <p className=" ">
                  {" "}
                  Don&apos;t have a account ?{" "}
                  <span
                    onClick={() => setlogin(!login)}
                    className="text-primary"
                  >
                    Register
                  </span>{" "}
                </p>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3 justify-content-center align-items-center min-vh-100">
              <div className="d-flex justify-content-center align-items-center flex-column ">
                <div className=" d-flex justify-content-center text-dark">
                  <form
                    onSubmit={handleSubmit(signupUser)}
                    className=" d-flex flex-column"
                  >
                    <label> Email Address</label>
                    <input
                      {...register("email")}
                      className="form-control"
                      placeholder="email"
                    />
                    <p>{errors.email?.message}</p>
                    <label>Password</label>
                    <input
                      {...register("password")}
                      className="form-control"
                      placeholder="Password"
                    />
                    <p>{errors.password?.message}</p>

                    <button type="submit" className="btn btn-primary mt-3 ">
                      Register
                    </button>
                  </form>
                </div>
              </div>
              <div className="d-flex">
                <p className=" ">
                  {" "}
                  Have a account?{" "}
                  <span
                    onClick={() => setlogin(!login)}
                    className="text-primary"
                  >
                    {" "}
                    Login{" "}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="col-6 ">
          <img
            src="/diego-ph-fIq0tET6llw-unsplash.jpg"
            alt="logo"
            className="imgs"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
