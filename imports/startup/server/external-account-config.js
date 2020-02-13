//external-account-config.js
// Configuration of external account authentication services

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
	loginStyle: "popup",
	clientId: "748182856727-tbbg0roq4sa0uh899rcmprlhgqbqjc3t.apps.googleusercontent.com",
	secret: "QbU6FRt7-kkck-h60lvcGjN1",
	requestPermissions:['email', 'https://www.googleapis.com/auth/userinfo.email'],
    }
  }
);

