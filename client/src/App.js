import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './components/login/Login.js'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
