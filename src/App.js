import React from 'react';
import './App.css';
import SkillsList from './skillsList';

function App() {

  // ID of the Google Spreadsheet
  var spreadsheetID = "1yQZmclHWBJ3zSS_Vt7bf7XjqaW1vrRIm5300wNHcG_0";
  // Make sure it is public or set to Anyone with link can view
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  return (
    <div className="App">
      <header className="App-header">Skills Matrix</header>
      <div className="content">
        <SkillsList data={
          fetch(url)
            .then(res => res.json()) // tansform the data into json
          }></SkillsList>
      </div>
    </div>
  );
}

export default App;