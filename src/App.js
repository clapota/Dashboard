import React from 'react';
import LoginView from './Components/LoginView';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

function App() {
  library.add(fab);
  return (
    <LoginView/>
  );
}

export default App;
