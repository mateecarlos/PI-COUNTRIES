import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './redux/components/LandingPage'
import Home from './redux/components/Home';
import GetDetailsCountry from './redux/components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {LandingPage} />
        <Route exact path= '/home' component = {Home} />
        <Route exact path= '/details/:id' component={GetDetailsCountry}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
