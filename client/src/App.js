import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './redux/components/LandingPage'
import Home from './redux/components/Home';
import GetDetailsCountry from './redux/components/Detail';
import { CreateActivity } from './redux/components/Create'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {LandingPage} />
        <Route exact path= '/home' component = {Home} />
        <Route exact path= '/details/:id' component={GetDetailsCountry}/>
        <Route exact path= '/create' component={CreateActivity}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
