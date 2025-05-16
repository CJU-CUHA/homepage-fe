// import SignupForm from './SignupForm';
import Login from './components/Login';
// import logo from './logo.svg';
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import PostItem from "./components/PostItem";
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <SignupForm /> */}
      <Login />
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p> 
          Edit <code>src/App.js</code> and save to reload.
        </p> 
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> 
      </header> */}
    </div>
    
  );
}

export default App;
