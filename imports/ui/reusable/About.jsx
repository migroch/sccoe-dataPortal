// About.jsx
// About component

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
//import about from '../../api/about';

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inview: true,
    };
  }

  render() {
    return (
      <div id="About" className="scrollspy jumbotron m-0">
	<div className="container">
	  <h3 className="display-4 text-center color-primary text-primary">Welcome to the Santa Cruz COE Data Portal!</h3>
	  <h4 className="lead text-center text-muted">
	    A medium for communicating and distributing education related insight and data products
	  </h4>
	  <hr className="my-4"/>
	  <p className="text-justify font">
	    One of the commitments of the Santa Cruz County Office of Education is to enable well informed decision making in support of education for the county. Compiling, analyzing and disseminating data products is critical for such a commitment. Through this portal the Santa Cruz COE is communicating the results of internal data analysis and providing the tools that school districts and the community can use to explore education related data sets, expand or start a new analysis, and ultimately transform data into intelligent decision making.
	  </p>
	  <p>Please send us an email if you have any suggestions or requests!  <a href="mailto:data@santacruzcoe.org">data@santacruzcoe.org</a></p>
	</div>
      </div>
    );
  }
}

export default About;

  
