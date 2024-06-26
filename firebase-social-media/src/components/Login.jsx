import React from "react";
import { Formik, Form, Field } from "formik";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  return (
    <div>
      <h2>Log In</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          auth
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
              history.push("/dashboard");
            })
            .catch(error => {
              console.error("Error logging in: ", error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field type="email" name="email" />
            </div>
            <div>
              <label>Password</label>
              <Field type="password" name="password" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
