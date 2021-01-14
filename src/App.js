import logo from './logo.svg';
import './App.css';

function App() {
  const throwError = () => {
    throw new Error('Hello!')
  };
  const unhandledRejection = () => {
    new Promise(() => {
      throw new Error('Hello!')
    })
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => {throwError()}}>Error</button>
        <button onClick={() => {unhandledRejection()}}>Unhandled rejection</button>
        <p>
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
      </header>
    </div>
  );
}

export default App;
