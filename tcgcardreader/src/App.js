import React, { Component } from "react";
import QrReader from "react-qr-reader";

class Test extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
      console.log(data)
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
