import React from 'react';
import './App.css';

function App() {

  // ID of the Google Spreadsheet
  var spreadsheetID = "1yQZmclHWBJ3zSS_Vt7bf7XjqaW1vrRIm5300wNHcG_0";

  // Make sure it is public or set to Anyone with link can view
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      // console.log(JSON.stringify(myJson));
      console.log(myJson.feed);
      // console.log(myJson.feed.entry);
      // console.log(myJson.feed.entry[0].title.$t);

      let entries = myJson.feed.entry;


      if (entries) {
        return entries.map(function (item) {
          // console.log(item);
          // console.log(item);
          return item;
        })
      }
    });

  return (
    <div className="App">
      <header className="App-header">Skills Matrix</header>
      <div className="content">
        <ul></ul>
      </div>
    </div>
  );
}

export default App;
