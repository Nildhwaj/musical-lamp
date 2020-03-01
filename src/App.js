import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from './components/Navbar.component';
import ExerciseList from './components/ExerciseList.component';
import EditExercise from './components/EditExercise.component';
import CreateExercise from './components/CreateExercise.component';
import CreateUser from './components/CreateUser.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExerciseList} />
        <Route path="/edit/:id"  component={EditExercise} />
        <Route path="/create"  component={CreateExercise} />
        <Route path="/user" exact component={CreateUser} />
      </div>
      
    </Router>
  );
}

export default App;
