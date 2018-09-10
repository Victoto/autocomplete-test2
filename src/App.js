import React, { Component } from "react";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";

import data from './data.json'
import logo from "./rdf-logo.png";
import "./App.css";
import "@webscopeio/react-textarea-autocomplete/style.css";

const Item = ({ entity: { name } }) => <div>{name}</div>;
const Loading = ({ data }) => <div>Loading</div>;

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     textAreaValue: ''
  //   };
  // }

/* 
  Every time the user types a trigger: the current text value will be sent to
  backend for autocompletion check
*/
  onChange = () => {
    const value = this.textarea.innerHTML;
    console.log({value});
  };
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SQL Query AutoCompletion over RDF data</h2>
        </div>
        
        <ReactTextareaAutocomplete
          className="my-textarea"
          loadingComponent={Loading}
          style={{
            fontSize: "18px",
            lineHeight: "20px",
            padding: 5
          }}
          ref={rta => {
            this.rta = rta;
          }}
          innerRef={textarea => {
            this.textarea = textarea;
          }}
          containerStyle={{
            marginTop: 20,
            width: 400,
            height: 100,
            margin: "20px auto"
          }}
          minChar={0}
          trigger={{
            "?": {
              dataProvider: token => {
                this.onChange();
                const dataNamesList = data.map(data => data.name)
                const results = dataNamesList.filter(name => name.includes(token))
                return results
                  .slice(0, 10)
                  .map(name => ({ name }));
              },
              component: Item,
              output: (item, trigger) => item.name
            }
          }}
        />
      </div>
    );
  }
}

export default App;
