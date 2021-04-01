import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
      
    </Router>
  );
}

export default App;
