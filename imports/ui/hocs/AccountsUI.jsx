import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

const logoStyle = {
  width:'8em',
  height: 'auto'
}

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login form
    this.view = Blaze.render(Template.atForm,
			     ReactDOM.findDOMNode(this.refs.container));
  }

  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Render a modal with the placeholder container that will be filled with the Blaze atForm template
    return(
      <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
	<div className="modal-dialog" role="document">
	  <div className="modal-content">
	    <div className="modal-header">
              <h5 className="modal-title" id="ModalLabel">Sign In  to the Santa Cruz COE Data Portal</h5>
              <button  type="button"  id="closeLoginModal" className="close" data-dismiss="modal" aria-label="Close">
		<span aria-hidden="true">&times;</span>
              </button>
	    </div>
	    <div className="d-flex justify-content-center">
	      <img className="rounded-circle mt-4" style={logoStyle} alt="Santa Cruz COE Logo" src="SCCOE_Logo_Color.svg"/>
	    </div>
	    <div className="modal-body">
              <span ref="container" />
	    </div>
	  </div>
	</div>
      </div>
      );
  }
}
