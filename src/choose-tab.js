import "./App.css";
import { useState } from "react";
import AppReportJson from "./app-report-json";
import AppChart from "./app-chart";

function ChooseTab() {
  const [tab, setTab] = useState("CHART");

  return (
    <div className="App">
      <button
        onClick={() => {
          setTab((t) => (t === "CHART" ? "REPORT" : "CHART"));
        }}
      >
        TROCAR DE ABA
      </button>
      {tab === "CHART" ? <AppChart /> : <AppReportJson />}
    </div>
  );
}

export default ChooseTab;
