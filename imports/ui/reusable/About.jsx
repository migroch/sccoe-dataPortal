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
	    A medium for communicating insight and distributing data products related to education in Santa Cruz County
	  </h4>
	  <hr className="my-4"/>
	  <p className="text-justify font">
	    One of the commitments of the Santa Cruz County Office of Education is to enable well informed decision making in support of education for the county. Compiling, analyzing and disseminating data products is critical for such a commitment. Through this portal the Santa Cruz COE is communicating the results of internal data analysis and providing the tools that school districts and the community can use to explore education related data sets, expand or start new analyses, and ultimately transform data into intelligent decision making.
	  </p>

	  <div className="container text-center">
	    <a role="button" className="btn btn-primary m-3" href="mailto:data@santacruzcoe.org">
	      Send us an email!
	    </a>
	    <a role="button" className="btn btn-info m-3" href="https://forms.gle/pCqNLSSZyE6LDehVA" target="_blank">
	      Submit a data request!
	    </a>
	  </div>

	</div>
      </div>
    );
  }
}

export default About;

  
