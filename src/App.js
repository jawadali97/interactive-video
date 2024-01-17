import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'reactflow/dist/style.css';
import Navbar from './components/Navbar/Navbar';
import Canvas from './components/Canvas/Canvas';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Canvas></Canvas>
    </div>
  );
}

export default App;
