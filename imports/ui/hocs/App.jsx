import React from 'react';
import Nav from './Nav.jsx';
import HighLights  from './HighLights.jsx';
import Visualizations  from './Visualizations.jsx';
import Reports  from './Reports.jsx';
import About  from '../reusable/About.jsx';
import Footer from '../reusable/Footer.jsx';

const App = () => (
  <div>
    <Nav />
    <About/>
    <HighLights />
    <Visualizations />
    <Reports />
    <Footer />
  </div>
);

export default App;
