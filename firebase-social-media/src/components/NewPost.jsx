import React from "react";
import { Formik, Form, Field } from "formik";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const PostSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

const NewPost = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  return (
    <div>
      <h2>New Post</h2>
      <Formik
        initialValues={{ title: "", content: "" }}
        validationSchema={PostSchema}
        onSubmit={(values, { setSubmitting }) => {
          db.collection("posts")
            .add({
              ...values,
              userId: currentUser.uid,
            })
            .then(() => {
              history.push("/dashboard");
            })
            .catch(error => {
              console.error("Error creating post: ", error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Title</label>
              <Field type="text" name="title" />
            </div>
            <div>
              <label>Content</label>
              <Field type="text" name="content" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Create Post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewPost;
