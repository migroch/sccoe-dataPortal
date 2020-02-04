import React from 'react';
import Nav from './Nav.jsx';
import HighLights  from './HighLights.jsx';
import Visualizations  from './Visualizations.jsx';
import About  from '../reusable/About.jsx';

const App = () => (
  <div>
    <Nav />
    <About/>
    <HighLights />
    <Visualizations />
  </div>
);

export default App;
