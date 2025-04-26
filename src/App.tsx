import React from 'react';
import './App.css';
import Header from './components/header/header';
import Card from './components/card/card';

function App() {
  return (
    <div className="App">
      
      <Header/>

      <div className="container">
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>

      </div>
    </div>
  );
}

export default App;
