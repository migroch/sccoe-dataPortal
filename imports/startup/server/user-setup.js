// user-setup.js
// Initialize custom user fields and roles
import permissions_data from '../../data/permissions_data.js';

Accounts.onCreateUser((options, user)=>{
    let email;
    let verified_email;
    user._id = Random.id();
    
    if (user.services.google) {
	email = user.services.google.email;
	verified_email = user.services.google.verified_email;
    } else {
	email = user.emails[0].address;
	verified_email = user.emails[0].verified;
    }
    user.email = email;
    user.verified_email = verified_email;

    if (options.profile) {
	user.profile = options.profile;
    }

    let permissions = Object.keys(permissions_data).filter((role)=>{
	    let check = permissions_data[role].emails.includes(email) || permissions_data[role].domains.includes(email.split('@')[1]) ;
	    return check;
	});
	
    permissions.forEach((role)=>{
	Roles.addUsersToRoles(user._id, role);
    });

    return user;
});
