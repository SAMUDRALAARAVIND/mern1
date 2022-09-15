import logo from './logo.svg';
import './App.css';
import { useState , useEffect } from "react" 
function App() {
  const [data , setData] = useState() 
  useEffect(() => {
    console.log("Fetching data") 
    fetch("http://localhost:8080/api/students/all")
    .then((resp) => resp.json())
    .then((data) => setData(data) )
  }, [] );
  return (
    <div className="App">
          { JSON.stringify(data) }
    </div>
  );
}

export default App;
