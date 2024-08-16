import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import SignIn from './components/auth/SignIn';
import Todos from './components/todo-list/Todos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/todo-list" element={<Todos />} />
      </Routes>
    </Router>
  );
}

export default App;
