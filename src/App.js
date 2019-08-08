import React from 'react';
import './App.css';
import SkillsList from './SkillsList';

function App() {

  console.log(process.env.REACT_APP_SHEET_ID)
  // ID of the Google Spreadsheet
  var spreadsheetID = String(process.env.REACT_APP_SHEET_ID);
  // Make sure it is public or set to Anyone with link can view
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";


  return (
    <div className="App">
      <div className="content">
        <SkillsList data={
          fetch(url)
            .then(res => res.json())
          }></SkillsList>
      </div>
    </div>
  );
}

export default App;
