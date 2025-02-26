import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import './App.css';

import { NavLink, Route, Routes } from 'react-router';
import Game1 from './Game1';
import Game2 from './Game2';

function App() {
  return <div>
      <nav>
        <NavLink to="/" end>
          Game 1
        </NavLink>
        <NavLink to="/game2" end>
          Game 2
        </NavLink>
      </nav>
    <Routes>
      <Route path="/" element={<Game1 />} />
      <Route path="/game1" element={<Game1 />} />
      <Route path="game2" element={<Game2 />} />
    </Routes>
  </div>
}

export default App;
