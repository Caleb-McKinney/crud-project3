import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const Signup = () => {
  const history = useHistory();

  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          auth
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
              history.push("/dashboard");
            })
            .catch(error => {
              console.error("Error signing up: ", error);
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
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
