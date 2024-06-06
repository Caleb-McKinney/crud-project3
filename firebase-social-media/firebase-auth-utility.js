import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase-config";

const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User registered: ", userCredential.user);
    // User is signed in
    // You can access the newly created user via userCredential.user
  } catch (error) {
    console.error("Error registering new user: ", error);
    // Handle errors here, such as email already in use, weak password, etc.
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in: ", userCredential.user);
    // User is signed in
    // You can access the signed-in user via userCredential.user
  } catch (error) {
    console.error("Error logging in: ", error);
    // Handle errors here, such as user not found, wrong password, etc.
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
    // User is signed out
  } catch (error) {
    console.error("Error signing out: ", error);
    // Handle errors here
  }
};

export { register, login, logout };