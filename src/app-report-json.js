import { useState, useEffect } from "react";
import { checkSignedIn, renderButton } from "./utils";
import Report from "./report";

function AppReportJson() {
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

  return <div>{!isSignedIn ? <div id="signin-button"></div> : <Report />}</div>;
}

export default AppReportJson;
