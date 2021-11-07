import {BrowserRouter as Router, Route} from 'react-router-dom';
// import './App.css';
import './normalize.css';
import Login from './Components/AdminPanel/Login';
import Admin from './Components/AdminPanel/Admin';
import AuthProvider from './Providers/AuthProvider';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Route path="/login" exact component={Login} />
        <Route path="/admin" exact component={Admin} />
      </AuthProvider>
    </Router>
  );
}

export default App;
