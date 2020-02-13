//accounts-config.js
// User accounts configuration

Accounts.ui.config({
    requestPermissions: {
	google: [
	    'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
	],	
    },
    requestOfflineToken: {
	google: true
    },
});

var VizsAddData = (user)=>{
    let vizs = tableauSoftware.VizManager.getVizs();
    let viz = vizs.find((viz) => viz.getParentElement().id == 'SCCAASPP');
    if (user.emails){
	if (user.emails[0].address.split('@')[1] == 'pvusd.net')
	viz.getWorkbook().getActiveSheet().getWorksheets()[0].applyFilterAsync("Governance", ["PajaroValley"],  tableau.FilterUpdateType.ADD);
    } else {
	viz.getWorkbook().getActiveSheet().getWorksheets()[0].applyFilterAsync("Governance", "",  tableauSoftware.FilterUpdateType.ALL);
    }   
};

var VizsRemoveData = () =>{
    let vizs = tableauSoftware.VizManager.getVizs();
    let viz = vizs.find((viz) => viz.getParentElement().id == 'SCCAASPP');
    viz.getWorkbook().getActiveSheet().getWorksheets()[0].applyFilterAsync("Governance", ["County"],  tableauSoftware.FilterUpdateType.REPLACE);
};

var mySubmitFunc = (error, state)=>{
    if (!error) {
	if (state === "signIn") {
	    // Successfully signed in
	    //VizsAddData(Meteor.user());
	}
	if (state === "signUp") {
	    // Successfully registered
	    //VizsAddData(Meteor.user());
	}
    }
};

var myLogoutFunc = ()=>{
    //VizsRemoveData();
};

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',

    // Redirects
    //homeRoutePath: '/home',
    //redirectTimeout: 4000,

    // Hooks
    onLogoutHook: myLogoutFunc,
    onSubmitHook: mySubmitFunc,
    //preSignUpHook: myPreSubmitFunc,
    //postSignUpHook: myPostSubmitFunc,

    // Texts
    texts: {
      button: {
          signUp: "Register!"
      },
	socialIcons: {
          google: 'SCCOE_Logo_Color.png'
        },
      //socialSignUp: "Register",
      title: {
          forgotPwd: "Recover Your Password"
      },
    },
});

AccountsTemplates.addField({
    _id: 'name',
    type: 'text',
    displayName: "Name",
    required: true
});


