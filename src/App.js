import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import Home from "./components/Home"

const Redirect = props => {

  const [render, setRender] = useState(false)
  
  const getRedirect = async short => {
    const response = await fetch("https://shortme-backend.herokuapp.com/get/"+short)
    const data = await response.json()
    window.location = data
  }

  useEffect(() => {
    const {shortened} = props.match.params
    getRedirect(shortened)
    setTimeout(() => props.history.push("/"), 1000)
  })


  return (
    <>
    {render && <h1>Invalid Shortened Url</h1>}
    </>
  )
}


function App() {
  return (
    <div className="App">
      <Router basename="https://gypsydangerous.github.io/short-me">
        <Route exact path="/" component={Home}/>
        <Route path="/:shortened" component={Redirect}/>
      </Router>
    </div>
  );
}

export default App;
