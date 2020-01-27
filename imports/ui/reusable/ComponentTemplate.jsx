// HighLights.jsx
// Highlights showcae component

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Highlights from '../../api/Highlights';

class Highlights extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inview: true,
    };
  }

  handleClick(event) {
    event.preventDefault();
  }

  render() {
    return (
      
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('Highlights');

  return {
    highligths: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    user: Meteor.user(),
  };
})(Highlights);

  
