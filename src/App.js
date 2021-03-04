import "./App.css";
import { useState, useEffect } from "react";
import { checkSignedIn, renderButton } from "./utils";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignin = (signedIn) => {
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init); //(1)
  });

  return (
    <div className="App">
      {!isSignedIn ? <div id="signin-button"></div> : <div>Coming soon...</div>}
    </div>
  );
}

export default App;
