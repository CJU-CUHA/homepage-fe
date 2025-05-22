import logo from './logo.svg';
import './App.css';
import JangbalCity from './pages/JangbalCity';
function App() {
  return (
    <div className="App">

      <header class="main-banner">
        <div class="logo">
            <img src="./cuha.png" alt="logo"></img>
        </div>
        <nav class="nav-menu">
            <button class="cuha-button">CUHA</button>
            <span>CTF Time</span>
            <div class="divider"></div>
            <span>WAR GAME</span>
            <div class="divider"></div>
            <span>CUHA WIKI</span>
            <div class="divider"></div>
            <span>MINECRAFT</span>
            <div class="divider"></div>
            <span class="click-me">Click Me</span>
        </nav>
        <div class="auth">
            <span class="login">로그인</span>
            <span class="sep">|</span>
            <span class="signup">회원가입</span>
        </div>
    </header>

    <script src="_d.js"></script>
    <JangbalCity />
    </div>
  );
}

export default App;
