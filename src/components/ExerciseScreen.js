import React from "react";
import { phrases } from "./phrases";
import { charTable } from "./charTable";
import glowingStar from "../glowingStar.svg";
import redCat from "../redCat.svg";
import iconBack from "../iconBack.svg";


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
        this.renderRepeat = this.renderRepeat.bind(this);
        this.changeText = this.changeText.bind(this);
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

        
        if (charTable[isFromRu][newChar]) {
          newChar = charTable[isFromRu][newChar];
          setTimeout(function() { area.value = area.value.slice(0, area.value.length - 1); }, 0);
          setTimeout(function() { area.value = area.value.concat(newChar); }, 0);

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
      if (str[str.length - 1] === "\n") {
          this.answerHandler();
      }
    }

    examine() {
        let userText = document.getElementById("area").value;

        let correctText = this.state.currentTask[this.state.fromRu ? "en" : "ru"];
        correctText = correctText.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!…"#$%&()*+,\n\-.\/:;<=>?@\[\]^_`{|}~]/g, "").replace(/\s+/g, " ").replace(/ё/g, "е").toLowerCase();
        userText = userText.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!…"#$%&()*+,\n\-.\/:;<=>?@\[\]^_`{|}~]/g, "").replace(/\s+/g, " ").replace(/ё/g, "е").toLowerCase();
    
        const altLang = this.state.fromRu ? "altEn" : "altRu";

        if (userText.replace(" ", "") === "") {
            document.getElementById("area").value = "";
            return null;
        }
        if (!this.state.currentTask[altLang].length || correctText === userText) {
            return correctText === userText;
        } else {
            for(let i = 0; i < this.state.currentTask[altLang].length; i++) {
                if (this.state.currentTask[altLang][i] === userText) {
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
                comment: "Правильно!" + (!this.state.fromRu ? " Запомните: " : ""),
                isCorrect: true,
            } );
            document.getElementById("area").style.border = "3px solid PaleGreen";
        } else {
            this.setState({ 
                comment: "Oшибка! Правильный ответ: ",
                tasks: this.state.tasks.concat(this.state.currentTask),
                mistakes: this.state.mistakes.concat(this.state.currentTask),
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

    renderMessage() {
        if (this.state.step - 1 === this.state.tasks.length && this.state.mistakes.length <= 5) {
          return (
              <section className="messageBox">
                
                { this.state.mistakes.length ? 
                <h2 className="praise">У вас отлично получается!</h2> :
                <h2 className="praise">Великолепно!</h2>}

                { this.state.mistakes.length ? 
                <h2 className="review">Осталось только получше запомнить вот эти фразы</h2> : 
                <h2 className="review">Вы прошли упражнение без ошибок</h2>}

                { this.state.mistakes.length ? 
                    this.renderMistakes() : 
                    (<div className="starBox">
                      <img src={glowingStar} id="shiny"></img>
                    </div>)}

              </section>
          );
        }
    }

    renderMistakes() {
        let currentMistakes = this.state.mistakes;
        console.log(currentMistakes);
        let mistakesList = [];
        mistakesList[0] = currentMistakes[0];

        for (let i = 0, willPush = true; i < currentMistakes.length; i++) {
            for (let j = 0; j < mistakesList.length; j++) {
                if (mistakesList[j].en === currentMistakes[i].en) {
                    willPush = false;
                }
            }
            if (willPush) {
                mistakesList.push(currentMistakes[i]);
            }
            willPush = true;
        }

        mistakesList = mistakesList.map(({en, ru}) => {
            let  utter = new SpeechSynthesisUtterance({en}.en);
            utter.voice = this.state.voice;
              return (
                <li key={en}><button className="smallListenButton" onClick={() => synth.speak(utter)}>🔊</button> {en} — {ru}</li>
              );
            });

        return (
        <div className="mistakesListBox">
          <ul className="mistakesList">
              {mistakesList}
          </ul>
        </div>
        );

    }


    renderButtons() {

        if (!this.state.isAnswered) {
            return <button className="forward" onClick={this.answerHandler}>Проверить</button>
        } else if (this.state.step - 1 === this.state.tasks.length) {
            document.getElementById("area").blur(); // for Firefox that keeps focus on the text-area
            return <button className="forward" onClick={this.props.onClick}>В меню</button>
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
            return <button className="forward" onClick={this.nextStep}>Дальше</button>
        }
    }

    renderRepeat() {
        let  utter = new SpeechSynthesisUtterance(this.state.currentTask.en);

        utter.voice = this.state.voice;

        if (this.state.isAnswered) {
            if (this.state.isCorrect && !this.state.fromRu) {
                return (<div>
                           <p className="correctAnswer">{this.state.currentTask.en} </p>
                           <button className="listenButton" onClick={() => synth.speak(utter)}>🔊</button>
                        </div>
                );
            } else if (this.state.fromRu) {
                return (<div>
                    <p className="correctAnswer">{this.state.currentTask.en} </p>
                    <button className="listenButton" onClick={() => synth.speak(utter)}>🔊</button>
                 </div>
                );
            } else {
              return (
                <p className="correctAnswer">{this.state.currentTask.ru} </p>
              );  
            }
        }
    }



    render() {
        return (
            <div>
                <div className="workspace">

                  <section className="titleBox">
                    <h1 className="title">Толк файн</h1>
                  </section>

                  <section className="innerTitleBox">
                  </section>


                  <section className="topicBox">
                    <p id="currentTopic">Тема: {topicNames[this.props.topic]}</p>
                  </section>
                  
                  <div className="progressBox">
                    <section className="progressBar" style={{
                        backgroundColor: "PaleGreen", 
                        width: Math.floor( ( (this.state.step - 1) / this.state.tasks.length ) * 100 ) + "%"}}>
                   </section>
                  </div>
                
                  <section className="instructionBox">
                    <h2 id="instruction">{"Напишите это на " + (this.state.fromRu ? "английском: " : "русском: ")}</h2>                
                  </section>

                  <section className="taskBox">
                    <h1 id="currentTask">{this.state.currentTask[this.state.fromRu ? "ru" : "en"]}</h1>
                  </section>

                <section className="areaBox">
                  <textarea onInput={() => this.newLineCheck(document.getElementById("area").value)} 
                  onKeyPress={(event) => this.changeText(event)} id="area" lang="en" 
                  placeholder="Введите перевод" autoFocus>
                  </textarea>
                </section>
                
                { this.renderButtons() }
                
                <section className="commentBox">
                  <h3 id="currentComment">{this.state.comment}</h3>
                  <div id="currentRepeat">
                    { this.renderRepeat() }
                  </div>
                </section>

                { this.renderMessage() }

                {this.state.step - 1 === this.state.tasks.length && this.state.mistakes.length <= 5 && this.state.mistakes.length ?        
                <img src={redCat} id="kitty"></img> : <p style={{"display": "none"}}></p>}

                <button id="back" onClick={this.props.onClick}><img src={iconBack} id="backIcon"></img></button>
                </div>
            </div>
        );
    }
}