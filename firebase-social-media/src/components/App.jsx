import React from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/post/new" component={NewPost} />
          <PrivateRoute path="/post/edit/:id" component={EditPost} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
