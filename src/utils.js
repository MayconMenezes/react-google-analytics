const initAuth = () => {
  return window.gapi.auth2.init({
    client_id: process.env.REACT_APP_GA_CLIENT_ID, //paste your client ID here
    scope: "https://www.googleapis.com/auth/analytics.readonly",
  });
};

const checkSignedIn = () => {
  return new Promise((resolve, reject) => {
    initAuth() //calls the previous function
      .then(() => {
        const auth = window.gapi.auth2.getAuthInstance(); //returns the GoogleAuth object
        console.log("USER:", auth.currentUser);
        resolve(auth.isSignedIn.get()); //returns whether the current user is currently signed in
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const renderButton = () => {
  window.gapi.signin2.render("signin-button", {
    scope: "profile email",
    width: 240,
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
    onfailure: onFailure,
  });
};

const onSuccess = (googleUser) => {
  console.log("Logged in as: " + googleUser.getBasicProfile().getName());
};

const onFailure = (error) => {
  console.error(error);
};

const startClientHelper = () => {
  // 2. Initialize the JavaScript client library.
  window.gapi.client
    .init({
      apiKey: process.env.API_KEY_GOOGLE,
      // Your API key will be automatically added to the Discovery Document URLs.
      discoveryDocs: ["https://people.googleapis.com/$discovery/rest"],
      // clientId and scope are optional if auth is not required.
      clientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
      scope: "profile",
    })
    .then(function () {
      // 3. Initialize and make the API request.
      return window.gapi.client.people.people.get({
        resourceName: "people/me",
        "requestMask.includeField": "person.names",
      });
    })
    .then(
      function (response) {
        console.log(response.result);
      },
      function (reason) {
        console.log("Error: " + reason.result.error.message);
      }
    );
};

const getClientId = () => {
  // 1. Load the JavaScript client library.
  window.gapi.load("client", startClientHelper);
};

export { checkSignedIn, renderButton, getClientId };
