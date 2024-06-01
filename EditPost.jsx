import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, useParams } from "react-router-dom";

const PostSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const fetchPost = async () => {
      const postDoc = await db.collection("posts").doc(id).get();
      if (postDoc.exists && postDoc.data().userId === currentUser.uid) {
        setPost(postDoc.data());
      } else {
        history.push("/dashboard");
      }
    };

    fetchPost();
  }, [id, currentUser, history]);

  return (
    <div>
      <h2>Edit Post</h2>
      {post && (
        <Formik
          initialValues={{ title: post.title, content: post.content }}
          validationSchema={PostSchema}
          onSubmit={(values, { setSubmitting }) => {
            db.collection("posts")
              .doc(id)
              .update(values)
              .then(() => {
                history.push("/dashboard");
              })
              .catch(error => {
                console.error("Error updating post: ", error);
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
                Update Post
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditPost;
