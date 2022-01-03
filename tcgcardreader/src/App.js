import React, { Component } from "react";
import QrReader from "react-qr-reader";

const codes = new Set();

// makes a noise when scanned 
const audio = new Audio('https://freesound.org/data/previews/403/403015_5121236-lq.mp3');

class Test extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
      const code = data.replace(/-/g,'').trim();
      // console.log(data);
      // console.log(code);
      if(!codes.has(code)){
        codes.add(code);
        audio.currentTime = 0;
        audio.play();
        
        console.log(codes);

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
