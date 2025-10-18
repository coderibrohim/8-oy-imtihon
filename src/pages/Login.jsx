import { Form, Link, useActionData } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FormInput from "../components/Forminput";
import { useLogin } from "../hooks/useLogin";
import { formError } from "../components/Errorld";
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  return data;
}

function Login() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { _login, isPending, error: _error } = useLogin();

  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
      setError(false);
    } else {
      setError(user ? formError(user, "login") : false);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-400 to-gray-600 relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-gray-200 to-gray-400 blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] rounded-full bg-gradient-to-r from-gray-200 to-gray-400 blur-3xl opacity-50"></div>

      <div className="relative z-10 bg-gray-200/70 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        <Form method="post" className="space-y-4">
          <FormInput type="email" label="Email:" name="email" />
          <FormInput type="password" label="Password:" name="password" />

          {!isPending && (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          )}
          {isPending && (
            <button
              disabled
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Loading...
            </button>
          )}
        </Form>

        <p className="text-center text-sm mt-6 text-gray-700">
          I have no account yet?
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      {(error||_error) && (
        <div className="fixed top-5 right-5 animate-slideIn">
          <div className="alert alert-error shadow-lg">
            <p className="text-white text-center">{error || _error}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
