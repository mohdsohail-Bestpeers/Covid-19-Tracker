import './App.css'
import MyComponent from './component/MyComponent'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Monthlydata from './component/Monthlydata'

function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
          
            <MyComponent />
          
        </Route>

        <Route exact path="/:id" component={Monthlydata} />
      </Switch>
    </Router>
    </>
  );
}

export default App
