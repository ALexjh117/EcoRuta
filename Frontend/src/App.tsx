


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import RoutePlanner from './components/RoutePlanner';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<RoutePlanner/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;