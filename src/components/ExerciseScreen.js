import React from "react";
import { phrases } from "./phrases";
import { charTable } from "./charTable";
import glowingStar from "../glowingStar.svg";
import iconBack from "../iconBack.svg";
import iconSound from "../iconSound.svg";
import iconPlay from "../iconPlay.svg";

const topics = {
    "01": "greetings",
    "02": "parenthesis",
    "03": "consents",
    "04": "polite",
    "05": "talk",
    "06": "travel",
    "07": "idioms",
    "08": "idioms2",
    "09": "proverbs",
};

const topicNames = {
    "01": "Приветствие и прощание",
    "02": "Вводные слова",
    "03": "Согласие и несогласие",
    "04": "Слова вежливости",
    "05": "Участие в разговоре",
    "06": "Путешествия",
    "07": "Идиомы. Часть I",
    "08": "Идиомы. Часть II",
    "09": "Пословицы",
}

const synth =  window.speechSynthesis;
const isMobile = navigator.userAgent.toLowerCase().match(/android|ipad|iphone|ipod|webos|blackberry/i) != null;
let exceptionalKey = false;

export class ExerciseScreen extends React.Component {
    constructor(props) {
        super(props);
        let tasks = this.getTasks();
        let voice = this.selectVoice();
        this.state = {
            fromRu: true,
            step: 1,
            tasks: tasks,
            currentTask: tasks[0],
            isAnswered: false,
            isCorrect: true,
            comment: " ",
            voice: voice,
            mistakes: [],
            }

        this.nextStep = this.nextStep.bind(this);
        this.getTasks = this.getTasks.bind(this);
        this.examine = this.examine.bind(this);
        this.answerHandler = this.answerHandler.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.renderCorrect = this.renderCorrect.bind(this);
        this.changeText = this.changeText.bind(this);
        this.unifyMistakes = this.unifyMistakes.bind(this);
    }

    getTasks() {
        let tasks = [];
        for (let i = 0; i < phrases.length; i++) {
            if (phrases[i].topic === topics[this.props.topic]) {
              tasks.push(phrases[i]);
            } 
        }
        for (let i = 0; i < tasks.length; i++) {
            let j = Math.floor(Math.random() * tasks.length);
            let k = Object.assign({}, tasks[i]);
            tasks[i] = Object.assign({}, tasks[j]);
            tasks[j] = Object.assign({}, k);
        }
        return tasks;
    }
    
    selectVoice() {
        window.speechSynthesis.onvoiceschanged = function() {
            window.speechSynthesis.getVoices();
        };

        let voices = window.speechSynthesis.getVoices();
        for (let i = voices.length - 1; i >= 0; i--) {
            if(voices[i].lang === "en-US" || voices[i].lang === "en-GB") {
                let salutation = new SpeechSynthesisUtterance("");  //  the very first start of a synthetic voice
                salutation.voice = voices[i];                       //   always plays with a delay -
                synth.speak(salutation);                            //    let it be empty 
                return voices[i];
            }
        }
        
    }

    changeText(event) { 
        const isFromRu = this.state.fromRu ? 1 : 0;
        const area = document.getElementById("area");
        let newChar = getChar(event);
        
        if (!exceptionalKey && charTable[isFromRu][newChar]) {
          newChar = charTable[isFromRu][newChar];
          setTimeout(function() { area.value = area.value.slice(0, area.value.length - 1); }, 0);
          setTimeout(function() { area.value = area.value.concat(newChar); }, 0);
        } else {
            if (exceptionalKey) {
                if (isFromRu) {
                    if (newChar === "ю") {
                        newChar = ".";
                    } else if (newChar === "Ю") {
                        newChar = ">";
                    } else if (newChar === "." && exceptionalKey === "191") {
                        newChar = "/";
                    } else if (newChar === "," && exceptionalKey === "191") {
                        newChar = "?";
                    } else if (newChar === "б") {
                        newChar = ",";
                    } else if (newChar === "Б") {
                        newChar = "<";
                    }
                    setTimeout(function() { area.value = area.value.slice(0, area.value.length - 1); }, 0);
                    setTimeout(function() { area.value = area.value.concat(newChar); }, 0);
                }
                if (!isFromRu) {
                    if (newChar === "." && exceptionalKey === "190") {
                        newChar = "ю";
                    } else if (newChar === ">") {
                        newChar = "Ю";
                    } else if (newChar === "," && exceptionalKey === "188") {
                        newChar = "б";
                    } else if (newChar === "<") {
                        newChar = "Б";
                    } else if (newChar === "/") {
                        newChar = ".";
                    } else if (newChar === "?") {
                        newChar = ",";
                    }
                    setTimeout(function() { area.value = area.value.slice(0, area.value.length - 1); }, 0);
                    setTimeout(function() { area.value = area.value.concat(newChar); }, 0);
                }
            }
        }
        

        function getChar(e) { 
            if (e.which == null) {
                if (e.keyCode < 32) {
                   return "";
                    }
                return String.fromCharCode(e.keyCode);
            }
            
            if (e.which !== 0 && e.charCode !== 0) {
                if (e.which < 32) {
                    return "";
                    }                  
                return String.fromCharCode(e.which);
            } 

            return "";
        };
    }

    newLineCheck(str) {
      for (let i = 0; i < str.length; i++) {
        if (str[i] === "\n") {
            document.getElementById("area").value = document.getElementById("area").value.replace("\n", "");
            this.answerHandler();
        }
      }  
      
    }

    examine() {
        let userText = document.getElementById("area").value;

        let correctText = this.state.currentTask[this.state.fromRu ? "en" : "ru"];
        correctText = correctText.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!?…"#$%&()*+,\n\-.\/:;<=>@\[\]^_`{|}~]/g, "").trim().replace(/\s+/g, " ").replace(/ё/g, "е").toLowerCase();
        userText = userText.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!?…"#$%&()*+,\n\-.\/:;<=>@\[\]^_`{|}~]/g, "").trim().replace(/\s+/g, " ").replace(/ё/g, "е").toLowerCase();
    
        const altLang = this.state.fromRu ? "altEn" : "altRu";

        if (userText.replace(" ", "") === "") {
            document.getElementById("area").value = "";
            return null;
        }
        if (!this.state.currentTask[altLang].length || correctText === userText) {
            return correctText === userText;
        } else {
            for(let i = 0; i < this.state.currentTask[altLang].length; i++) {
                if (userText === this.state.currentTask[altLang][i]) {
                    return true;
                }
            }
            return false;
        }
    }

    answerHandler() {
        const answer = this.examine();
        if (answer === null) {
            return;
        }
        this.setState( { 
            isAnswered: !this.state.isAnswered,
            step: this.state.step + 1, 
            } );
        document.getElementById("area").disabled = true;
        if (answer) {
            this.setState( { 
                comment: "Правильно! Запомните: ",
                isCorrect: true,
            } );
            document.getElementById("area").style.border = "3px solid PaleGreen";
        } else {
            this.setState({ 
                comment: "Oшибка! Правильный ответ: ",
                tasks: this.state.tasks.concat(this.state.currentTask),
                mistakes: this.unifyMistakes(this.state.mistakes.concat(this.state.currentTask)),
                isCorrect: false,
            });
            document.getElementById("area").style.border = "3px solid Tomato";
        }
    }
    
    nextStep() {
        let i = this.state.step;
        this.setState( { 
            currentTask: this.state.tasks[i - 1],
            isAnswered: false,   
            fromRu: !this.state.fromRu,
            comment: " ",     
        } );
        document.getElementById("area").value = "";
        document.getElementById("area").disabled = false;
        document.getElementById("area").style.border = "2px dotted silver";     
        document.getElementById("area").focus();
    }

    unifyMistakes(allMistakes) {
        let uniqueMistakes = [];
        uniqueMistakes[0] = allMistakes[0];

        for (let i = 0, willPush = true; i < allMistakes.length; i++) {
            for (let j = 0; j < uniqueMistakes.length; j++) {
                if (uniqueMistakes[j].en === allMistakes[i].en) {
                    willPush = false;
                }
            }
            if (willPush) {
                uniqueMistakes.push(allMistakes[i]);
            }
            willPush = true;
        }

        return uniqueMistakes;
    }

    renderMessage() {

        if (this.state.step - 1 === this.state.tasks.length) {

            if (this.state.mistakes.length <= 5) {
              document.getElementById("messageBox").style.display = "block";
              return (
                <div id="innerMessageBox">

                  { this.state.mistakes.length ? 
                  <div id="praiseBox"><p id="praise" className="unselectable">У вас отлично получается!</p></div> :
                  <div id="praiseBox"><p id="praise" className="unselectable">Великолепно!</p></div> 
                  }
  
                  { this.state.mistakes.length ? 
                  <div id="reviewBox"><p id="review" className="unselectable">Осталось только получше запомнить вот эти фразы</p></div> : 
                  <div id="reviewBox"><p id="review" className="unselectable">Вы прошли упражнение без ошибок</p></div> 
                  }
 
                  { this.state.mistakes.length ? 
                  this.renderMistakes() : 
                  (<div id="starBox">
                    <img id="star" src={glowingStar}></img>
                  </div>)
                  }
                
                </div>
              );
            }
        }
    }

    renderMistakes() {

        let mistakes = this.state.mistakes;
        mistakes = mistakes.map(({en, ru}) => {
              return (
                <li key={en} className="mistake">
                <button className="play" onClick={() => {
                    let  utter = new SpeechSynthesisUtterance({en}.en);
                    utter.voice = this.state.voice;
                    synth.speak(utter)}
                    }>
                  <img className="playIcon" src={iconPlay}></img>
                </button><p className="mistakeText"><b>{en}</b> — {ru}</p>
                </li>
              );
            });

        

        return (
              <div id="mistakesBox">
                <ul id="mistakes">
                  {mistakes}
                </ul>
              </div>
        );

    }


    renderButtons() {

        if (!this.state.isAnswered) {
            return <button id="forward" onClick={this.answerHandler} 
            style={{"opacity": 0 , "transition": "none", "-webkit-transition": "none", 
            "-moz-transition": "none", "-o-transition": "none"}}>Проверить</button>
        } else if (this.state.step - 1 === this.state.tasks.length) {
            document.getElementById("area").blur(); // for Firefox that keeps focus on the text-area
            return <button id="forward" onClick={this.props.onClick }>В меню</button>
        } else {
            document.body.onkeypress = (e) => { 
                if (e.keyCode === 13 && this.state.isAnswered) {
                    if (this.state.step - 1 !== this.state.tasks.length) {
                      this.nextStep();
                    } else {
                      this.props.onClick();
                    }
                } 
            };
            document.getElementById("area").blur(); // for Firefox that keeps focus on the text-area
            return <button id="forward" onClick={this.nextStep}>Дальше</button>
        }
    }
    

    renderCorrect() {        

        if (this.state.isAnswered) {
            if (this.state.isCorrect && !this.state.fromRu) {
                return (<div id="innerCorectBox">
                           <button id="listen" onClick={() => {  
                               let  utter = new SpeechSynthesisUtterance(this.state.currentTask.en);
                               utter.voice = this.state.voice;
                               synth.speak(utter);
                               }}>
                             <img id="listenIcon" src={iconSound}></img>
                           </button>
                           <p id="correct">{this.state.currentTask.en} </p>  
                        </div>
                );
            } else if (this.state.fromRu) {
                return (<div id="innerCorectBox">
                    <button id="listen" onClick={() => {  
                               let  utter = new SpeechSynthesisUtterance(this.state.currentTask.en);
                               utter.voice = this.state.voice;
                               synth.speak(utter);
                               }}>
                      <img id="listenIcon" src={iconSound}></img>
                    </button>
                    <p id="correct">{this.state.currentTask.en} </p>
                 </div>
                );
            } else {
              return (<div id="innerCorectBox">
                <button id="listen" onClick={() => {  
                           let  utter = new SpeechSynthesisUtterance(this.state.currentTask.en);
                           utter.voice = this.state.voice;
                           synth.speak(utter);
                           }}>
                  <img id="listenIcon" src={iconSound}></img>
                </button>
                <p id="correct">{this.state.currentTask.ru} </p>
             </div>);  
            }
        }
    }



    render() {
       return (
          <div id="container">
            <div id="titleBox"></div> 
            <div id="statusBox"></div>
            <div id="taskBox"></div>
            <div id="answerBox"></div>


            <div id="innerTitleBox">
              <h3 id="logo" className="unselectable">Толк файн</h3>
            </div>
            <div id="backBox">
              <button id="back" onClick={this.props.onClick}>
                <img src={iconBack} id="backIcon"></img>
              </button>
            </div>

            <div id="topicBox">
              <p id="topic" className="unselectable">{topicNames[this.props.topic]}</p>
            </div>
            <div id="progressBox">
              <div id="unfilled" className="progressBar">
                <div id="filled" className="progressBar" 
                style={{ width: Math.floor( ( (this.state.step - 1) / this.state.tasks.length ) * 100 ) + "%"}}>
                </div>
              </div>
            </div>

            <div id="instructionBox">
              <p id="instruction" className="unselectable">{"Напишите это на " + (this.state.fromRu ? "английском: " : "русском: ")}</p>
            </div>
            <div id="innerTaskBox">
              <p id="task">{this.state.currentTask[this.state.fromRu ? "ru" : "en"]}</p>
            </div>

            <div id="areaBox">
            <textarea id="area" lang="en" placeholder="Введите перевод" autoFocus 
                onInput={() => {
                    this.newLineCheck(document.getElementById("area").value)
                    if (document.getElementById("area").value !== "") {
                      document.getElementById("forward").style.opacity = 0.9;
                    } else {
                      document.getElementById("forward").style.opacity = 0;
                    }
                }} 
                onKeyDown={ (event) => { 
                    if (event.keyCode === 188) {
                      exceptionalKey = "188"
                    } else if (event.keyCode === 190) {
                      exceptionalKey = "190"
                    } else if (event.keyCode === 191) {
                      exceptionalKey = "191"
                    } else { 
                      exceptionalKey = false 
                    } 
                }}
                onKeyPress={ (event) => { if (!isMobile) { this.changeText(event); } } }>
              </textarea>
            </div>
            <div id="forwardBox">
              { this.renderButtons() }
            </div>
            <div id="commentBox">
              <p id="comment" className="unselectable">{this.state.comment}</p>
            </div>
            <div id="correctBox">
              { this.renderCorrect() }
            </div>
            <div id="messageBox">{ this.renderMessage() }</div>
          </div>
        );
    }
}