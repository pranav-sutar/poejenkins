import logo from './logo.svg';
import './App.css';

function App() {
  const link = "https://github.com/pranav-sutar";
  return (
    <div className="App">
      <h2>Welcome to react app</h2>
      <p>App is propperly working</p>
      <a href={link} target='_blank' >@pranavSutar ©PranavSutar</a>
    </div>
  );
}

export default App;
