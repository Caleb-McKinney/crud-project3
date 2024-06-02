import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

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
