import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { string as yupString, object as yupObject } from "yup";
import { useNavigate } from "react-router-dom";

import {
  successToast,
  errorToast,
} from "@modals/index";

import { ThreeDots } from "react-loader-spinner";

import {
  RenderPasswordShowIcon,
  RenderPasswordHideIcon,

} from "@iconHelper/index";
import { UserStore, UserApi } from "@contexts/index";
import { useQueryClient } from "@tanstack/react-query";

export const LoginPage = () => {

  const LoginSchema = yupObject().shape({
    email: yupString().email("Invalid email").required("Required"),
    password: yupString()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),

  });

  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { setUser, setIsAuthenticated } = UserStore();

  const navigate = useNavigate();


  const handlePassword = () => {
    setShowPass(!showPass);
  };



  const { loginUser, sendDeviceVerificationCode } = UserApi();
  const queryClient = useQueryClient();

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-login-background">
        <div className="relative flex flex-col m-3 mt-0 mb-0 -space-y-1 bg-white shadow-2xl rounded-lg md:flex-row md:space-y-0">
          <div className="flex flex-col justify-evenly p-8 sm:px-24 md:px-14 lg:px-20 xl:px-20">


            <span className="xxs:py-2 xs:py-4 text-2xl xxs:w-full xs:w-max font-medium self-center text-center ">
              Welcome to{" "}
              <span className=" italic font-extrabold text-primary">Quickly Challenge</span>

            </span>
            <div className="text-center xxs:py-2 text-black font-normal text-xl">
              User Login
            </div>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setLoading(true);
                const data = {
                  email: values.email,
                  password: values.password,

                };

                try {
                  const loginResponse = await loginUser(data);

                  if (loginResponse?.status === 200) {
                    queryClient.clear();
                    setIsAuthenticated(loginResponse?.data?.success);
                    successToast(loginResponse?.data?.message || "Logged in Successfully");
                    navigate("/profile");
                    resetForm();
                  } else {
                    errorToast(loginResponse?.data?.message || "Something went wrong!");
                  }
                } catch (error) {
                  console.error("Login error:", error);
                  errorToast(error?.response?.data?.message || "Login failed. Please try again.");
                } finally {
                  setLoading(false);
                  setSubmitting(false);
                }
              }}
            >
              {({ errors, touched, values, setValues }) => (
                <Form>
                  <div className=" flex flex-col py-2 xxs:w-[250px] xs:w-[350px] ">
                    <label htmlFor="email" className="mb-1 text-base">
                      Email:
                    </label>
                    <Field
                      type="email"
                      className="flex placeholder:italic outline-none placeholder:text-md text-md p-2 border-[2px] focus-within:border-primary border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      name="email"
                      id="email"
                      autoComplete="current-email"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEmail(newValue);
                        setValues({ ...values, email: newValue });
                      }}
                    />
                    {errors.email && touched.email ? (
                      <div className="text-danger text-sm overflow-hidden break-words">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col py-2 xxs:w-[250px] xs:w-[350px]">
                    <label htmlFor="password" className="mb-1 text-base">
                      Password:
                    </label>
                    <div className="flex border-[2px] flex-row focus-within:border-primary border-gray-300 rounded-md justify-between">
                      <Field
                        type={showPass ? "text" : "password"}
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={values.password}
                        className="flex w-full rounded-md p-2 outline-none placeholder:italic placeholder:text-md placeholder:font-light placeholder:text-gray-500"
                      />
                      <div className="flex p-2" onClick={handlePassword}>
                        {showPass ? (
                          <RenderPasswordHideIcon></RenderPasswordHideIcon>
                        ) : (
                          <RenderPasswordShowIcon></RenderPasswordShowIcon>
                        )}
                      </div>
                    </div>
                    {errors.password && touched.password ? (
                      <div className="text-danger text-sm overflow-hidden break-words mt-1">
                        {errors.password}
                      </div>
                    ) : null}
                  </div>



                  <div>
                    <button
                      type="submit"
                      className="flex justify-center items-center w-full font-medium p-2 mb-2  mt-2 rounded-sm max-h-[40px] bg-primary text-white hover:bg-info focus:outline-none transform hover:-translate-y-1 hover:scale-100 active:translate-y-0 active:scale-90 transition duration-500 ease-in-out"
                    >
                      {loading ? (
                        <ThreeDots
                          visible={true}
                          height="25"
                          width="40"
                          color="#E5EBE5"
                          radius="12"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "Login"
                      )}
                    </button>

                  </div>
                </Form>
              )}
            </Formik>
          </div>


        </div>
      </div>

    </>
  );
};

