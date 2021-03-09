import React, { useState, useEffect } from "react";

const Charts = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    (function (w, d, s, g, js, fjs) {
      g = w.gapi || (w.gapi = {});
      g.analytics = {
        q: [],
        ready: function (cb) {
          this.q.push(cb);
        },
      };
      js = d.createElement(s);
      fjs = d.getElementsByTagName(s)[0];
      js.src = "https://apis.google.com/js/platform.js";
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = function () {
        g.load("analytics");
      };
    })(window, document, "script");

    window.gapi.analytics.ready(function () {
      // Step 3: Authorize the user.

      window.gapi.analytics.auth.authorize({
        container: "auth-button",
        clientid: process.env.REACT_APP_GA_CLIENT_ID,
      });

      // Step 4: Create the view selector.

      var viewSelector = new window.gapi.analytics.ViewSelector({
        container: "view-selector",
      });

      // Step 5: Create the timeline chart.

      var timeline = new window.gapi.analytics.googleCharts.DataChart({
        reportType: "ga",
        query: {
          dimensions: "ga:date",
          metrics: "ga:sessions",
          "start-date": "30daysAgo",
          "end-date": "today",
        },
        chart: {
          type: "LINE",
          container: "timeline",
        },
      });

      var timeline_2 = new window.gapi.analytics.googleCharts.DataChart({
        reportType: "ga",
        query: {
          dimensions: "ga:date",
          metrics: "ga:users",
          "start-date": "30daysAgo",
          "end-date": "today",
        },
        chart: {
          type: "BAR",
          container: "timeline_2",
        },
      });

      var dataChart2 = new window.gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: "ga:sessions",
          dimensions: "ga:country",
          "start-date": "30daysAgo",
          "end-date": "yesterday",
          "max-results": 6,
          sort: "-ga:sessions",
        },
        chart: {
          container: "chart-2-container",
          type: "PIE",
          options: {
            width: "100%",
            pieHole: 4 / 9,
          },
        },
      });

      // Step 6: Hook up the components to work together.

      window.gapi.analytics.auth.on("signIn", function (response) {
        viewSelector.execute();
        setIsLogged(true);
      });

      window.gapi.analytics.auth.on("error", function (response) {
        setIsLogged(false);
      });

      viewSelector.on("change", function (ids) {
        var newIds = {
          query: {
            ids: ids,
          },
        };
        timeline.set(newIds).execute();
        timeline_2.set(newIds).execute();
        dataChart2.set(newIds).execute();
      });

      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      <section id="auth-button"></section>
      {isLoaded && isLogged && (
        <button
          onClick={() => {
            window.gapi.analytics.auth.signOut();
          }}
        >
          Sign Out
        </button>
      )}
      <section id="view-selector"></section>
      <section id="timeline"></section>
      <section id="timeline_2"></section>
      <section id="chart-2-container"></section>
    </div>
  );
};

export default Charts;
