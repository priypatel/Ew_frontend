import React from "react";
import api from "../api/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const registerSchema = Yup.object().shape({
  name: Yup.string().min(2).required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(6)
    .required("Password must be at least 6 characters"),
});
export default function Register() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
            Create Account
          </h2>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={registerSchema}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
              try {
                const res = await api.post("/auth/register", values);
                if (res.data.success) navigate("/login");
              } catch (error: any) {
                setFieldError("email", error.response?.data?.message);
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <Field
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="w-full !w-full max-w-full !max-w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none !box-border"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full !w-full max-w-full !max-w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none !box-border"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full !w-full max-w-full !max-w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none !box-border"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded font-medium transition !border-0 !outline-none !shadow-none"
                >
                  {isSubmitting ? "Creating..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
