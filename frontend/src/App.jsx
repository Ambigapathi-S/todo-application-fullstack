import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import List from './components/List';
import Todo from './components/TodoForm';
import Login from './components/Login';
import Register from './components/Register';
import { isUserLoggedIn } from "./service/AuthService";

function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />;
  }
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<Login />}></Route>
          <Route path="/add" element={<AuthenticatedRoute><Todo /></AuthenticatedRoute>}></Route>
          <Route path="/update/:id" element={<AuthenticatedRoute><Todo /></AuthenticatedRoute>}></Route>
          <Route path="/list" element={<AuthenticatedRoute><List /></AuthenticatedRoute>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<Login />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
