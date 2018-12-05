import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { phrases } from "./components/phrases";
import { MainScreen } from "./components/MainScreen";
import { ExerciseScreen } from "./components/ExerciseScreen";
import { DictionaryScreen } from "./components/DictionaryScreen";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onScreen: "main",
        }
        this.jumpTo = this.jumpTo.bind(this);
    }

    jumpTo(i) {
        if (i.substr(0, 8) === "exercise" || i === "dictionary") {
            this.setState({ onScreen: i });        
        } else {
            document.body.onkeypress = null;
            this.setState({ onScreen: "main"});
        }
    }

    render() {
        if (this.state.onScreen === "main") {    
            return <MainScreen onClick={this.jumpTo}/>;
        } else if (this.state.onScreen.substr(0, 8) === "exercise") {
            return <ExerciseScreen 
            topic={this.state.onScreen.substr(-2)} onClick={() => this.jumpTo("main")} />;
        } else if (this.state.onScreen === "dictionary") {
            return <DictionaryScreen onClick={() => this.jumpTo("main")} />;
        }
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
