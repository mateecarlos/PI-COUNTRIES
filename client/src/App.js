import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './redux/components/LandingPage'
import Home from './redux/components/Home';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <switch>
        <Route exact path= '/' component= {LandingPage} />
        <Route exact path= '/home' component = {Home} />
      </switch>
      <h1>Henry Countries</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
