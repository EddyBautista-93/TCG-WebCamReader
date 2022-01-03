import React, { Component } from "react";
import QrReader from "react-qr-reader";

const codes = new Set();

// makes a noise when scanned 
const audio = new Audio('https://freesound.org/data/previews/403/403015_5121236-lq.mp3');

// url to our express api 
const apiUrl = "http://localhost:9063/api/v1/codes";
 class Test extends Component {
  state = {
    result: 'No result'
  }

   handleScan = async data => {
    if (data) {
      this.setState({
        result: data
      })
      // trim out the dashes 
      const code = data.replace(/-/g,'').trim();
      // if the qr code is not in the set
      // we add it to the codes set, make a sound
      // and send the code to the backend api we created in 
      // ../API
      if(!codes.has(code)){ 
        codes.add(code);
        audio.currentTime = 0;
        audio.play();
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            code,
          })
        });
        const json = await response.json();;
        console.log(json);

        // call the backend 
      }
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div >
      <div className="">

        <QrReader className="ScannerInvert"
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{  width: '500px' }}
        />
        </ div>
        <p>{this.state.result}</p>
      </div>
    )
  }
}
function App() {
  return (
    <div className="App">
      <Test />
    </div>
  );
}

export default App;
