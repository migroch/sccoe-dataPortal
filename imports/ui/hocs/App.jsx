import React from 'react';
import Nav from './Nav.jsx';
import HighLights  from './HighLights.jsx';
import Visualizations  from './Visualizations.jsx';
import About  from '../reusable/About.jsx';
import Footer from '../reusable/Footer.jsx';

const App = () => (
  <div>
    <Nav />
    <About/>
    <HighLights />
    <Visualizations />
    <Footer />
  </div>
);

export default App;
