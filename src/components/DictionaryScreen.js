import React from "react";
import { phrases } from "./phrases";
import frog from "../frog.svg";
import iconBack from "../iconBack.svg";
import iconTriangle from "../iconTriangle.svg";
import iconArrowDownWhite from "../iconArrowDownWhite.svg";
import iconArrowDownBlack from "../iconArrowDownBlack.svg";
import iconArrowUpBlack from "../iconArrowUpBlack.svg";

let dictionary = phrases;

export class DictionaryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: dictionary,
      lastSearch: dictionary,
      reduction: "",
    };
    this.search = this.search.bind(this);
    this.sort = this.sort.bind(this);
    this.sortButtonsHandler = this.sortButtonsHandler.bind(this);
    this.limit = this.limit.bind(this);
    this.sortButtonsDefault = this.sortButtonsDefault.bind(this);
    this.hideTopics = this.hideTopics.bind(this);
  }

  search(e) {
    if(e.target.value === ""){
      this.setState( { data: dictionary, lastSearch: dictionary,});
    } else {
      const searchString = e.target.value.toLowerCase().trim();
      
      let filtered = dictionary.filter(phrase => {
        return phrase.en.toLowerCase().includes(searchString);
      });
  
      if (!filtered.length) {
        filtered = dictionary.filter(phrase => {
          return phrase.ru.toLowerCase().includes(searchString);
        });
      }
      this.setState( {data: filtered, lastSearch: filtered, } );
    }

  }

    limit(subject) {
    if (subject === "all") {
      this.setState( { data: this.state.lastSearch } );
    } else {
      const limited = this.state.lastSearch.filter(phrase => {
        if (phrase.topic[phrase.topic.length - 1] === "2") {                    // option for 
          return phrase.topic.slice(0, phrase.topic.length - 1) === subject;    // idioms2
        } else {
          return phrase.topic === subject;
        }
      });
  
      this.setState( { data: limited } );
    }

  }

  sort(subject, direction) {
    dictionary = [].slice.call(dictionary).sort((a, b) => {
      if (a[subject] === b[subject]) { 
        return 0; 
      }
      return a[subject] > b[subject] ? direction : direction * -1;
    });
    const sorted = [].slice.call(this.state.data).sort((a, b) => {
      if (a[subject] === b[subject]) { 
        return 0; 
      }
      return a[subject] > b[subject] ? direction : direction * -1;
    });
    const lastSearch = [].slice.call(this.state.lastSearch).sort((a, b) => {
      if (a[subject] === b[subject]) { 
        return 0; 
      }
      return a[subject] > b[subject] ? direction : direction * -1;
    });
    
     this.setState( { data: sorted, lastSearch: lastSearch, } );
    
  }

  sortButtonsHandler(e) {
    const clicked = e.target.id[0] === "i" ? document.getElementById(e.target.id.slice(1)) : e.target;
    let newButton;
    if (clicked.id.includes("Up")) {
      newButton = document.getElementById(clicked.id.slice(0, clicked.id.length - 2) + "Down");
    } else {
      newButton = document.getElementById(clicked.id.slice(0, clicked.id.length - 4) + "Up");
    }

    if (clicked.id === "buttonSortEnDown") {
      this.sort("en", 1);
    } else if (clicked.id === "buttonSortEnUp") {
      this.sort("en", -1);
    } else if (clicked.id === "buttonSortRuDown") {
      this.sort("ru", 1);
    } else if (clicked.id === "buttonSortRuUp") {
      this.sort("ru", -1);
    } else if (clicked.id === "buttonSortTopicDown") {
      this.sort("topic", 1);
    } else if (clicked.id === "buttonSortTopicUp") {
      this.sort("topic", -1);
    }

    this.sortButtonsDefault();
    
    clicked.style.display = "none";
    newButton.style.display = "inline-block";
    
    newButton.id.includes("Up") ? 
    document.getElementById("i" + newButton.id).src = iconArrowDownBlack :
    document.getElementById("i" + newButton.id).src = iconArrowUpBlack;
  }

  sortButtonsDefault() {
    let buttons = [
      document.getElementById("buttonSortEnDown"), 
      document.getElementById("buttonSortEnUp"),
      document.getElementById("buttonSortRuDown"),
      document.getElementById("buttonSortRuUp"),
      document.getElementById("buttonSortTopicDown"),
      document.getElementById("buttonSortTopicUp"),
    ];

    if (buttons[0]) {
      for (let button of buttons) {
        document.getElementById("i" + button.id).src = iconArrowDownWhite;
        button.id.includes("Up") ? button.style.display = "none" : button.style.display = "inline-block";
        }
    }
  }
  

  showTopics() {
    document.getElementById("topicSelector").style.display = "none";

    document.getElementById("topicSelectorOpened").style.display = "block";
    document.getElementById("returnAll").style.display = "block";
    document.getElementById("onlyGreetings").style.display = "block";
    document.getElementById("onlyParenthesis").style.display = "block";
    document.getElementById("onlyConsents").style.display = "block";
    document.getElementById("onlyPolite").style.display = "block";
    document.getElementById("onlyTalk").style.display = "block";
    document.getElementById("onlyTravel").style.display = "block";
    document.getElementById("onlyIdioms").style.display = "block";
    document.getElementById("onlyProverbs").style.display = "block";
  }

  hideTopics() {
    document.getElementById("topicSelector").style.display = "block";

    document.getElementById("topicSelectorOpened").style.display = "none";
    document.getElementById("returnAll").style.display = "none";
    document.getElementById("onlyGreetings").style.display = "none";
    document.getElementById("onlyParenthesis").style.display = "none";
    document.getElementById("onlyConsents").style.display = "none";
    document.getElementById("onlyPolite").style.display = "none";
    document.getElementById("onlyTalk").style.display = "none";
    document.getElementById("onlyTravel").style.display = "none";
    document.getElementById("onlyIdioms").style.display = "none";
    document.getElementById("onlyProverbs").style.display = "none";

    this.sortButtonsDefault();
  }


  renderTopicSelector() {
    return (
        <div>
          <button id="topicSelector" className="topicDiscoverer" onClick={this.showTopics}>
          <img src={iconTriangle} id="triangleIcon"></img>
          </button>

          <button id="topicSelectorOpened"className="topicDiscoverer" onClick={this.hideTopics}>
            ▴
          </button>

          <button id="returnAll" className="topicOptions" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(6).toLowerCase());
            document.getElementById("searchbar").placeholder = "Искать среди всех фраз";
          }}>
          Все темы
          </button>
          
          <button id="onlyGreetings" className="topicOptions" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4).toLowerCase());
            document.getElementById("searchbar").placeholder = "Поиск в теме «Приветствия и прощания»";
          }}>
          Приветствие и прощание
          </button>

          <button id="onlyParenthesis" className="topicOptions" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4).toLowerCase());
            document.getElementById("searchbar").placeholder = "Поиск в теме «Вводные слова»";
          }}>
          Вводные слова
          </button>

          <button id="onlyConsents" className="topicOptions" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4).toLowerCase());
            document.getElementById("searchbar").placeholder = "Поиск в теме «Согласие и несогласие»";
          }}>
          Согласие и несогласие
          </button>

          <button id="onlyPolite" className="topicOptions" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4).toLowerCase());
            document.getElementById("searchbar").placeholder = "Поиск в теме «Слова вежливости»";
          }}>
            Слова вежливости
          </button>

          <button id="onlyTalk" className="topicOptions" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4).toLowerCase());
            document.getElementById("searchbar").placeholder = "Поиск в теме «Участие в разговоре»";
          }}>
            Участие в разговоре
          </button>

          <button id="onlyTravel" className="topicOptions" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4).toLowerCase());
            document.getElementById("searchbar").placeholder = "Поиск в теме «Путешествия»";
          }}>
            Путешествия
          </button>

          <button id="onlyIdioms" className="topicOptions" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4).toLowerCase());
            document.getElementById("searchbar").placeholder = "Поиск в теме «Идиомы»";
          }}>
            Идиомы
          </button>

          <button id="onlyProverbs" className="topicOptions" onClick={(e) => {
            this.hideTopics();
              document.getElementById("searchbar").placeholder = "Поиск в теме «Пословицы»";
            this.limit(e.target.id.slice(4).toLowerCase());
          }}>
            Пословицы
          </button>

        </div>
    );
  }

  renderSpreadsheet() {
    if (this.state.data.length) {
      let rows = this.state.data.map(({en, ru, topic}) => {
        if (topic[topic.length - 1] === "2") {
          topic = topic.slice(0, topic.length - 1);
        }
        return (
          <tr>
            <td id={en}>{en}</td>
            <td id={ru}>{ru}</td>
            <td id={topic}>{topic}</td>
          </tr>
        );
      });
  
      return (
      <table className="user-list table table-striped">
        
        <thead>
          <tr>
            <th>Фраза
              <button id="buttonSortEnDown" className="buttonSort" onClick={this.sortButtonsHandler}> 
                <img id="ibuttonSortEnDown" className="iconSort" src={iconArrowDownWhite}></img>  ️ ️
              </button>
              <button id="buttonSortEnUp" className="buttonSort" onClick={this.sortButtonsHandler}>
                <img id="ibuttonSortEnUp" className="iconSort" src={iconArrowDownBlack}></img>  ️
              </button>
            </th>
            <th>Значение
              <button id="buttonSortRuDown" className="buttonSort" onClick={this.sortButtonsHandler}>
                <img id="ibuttonSortRuDown" className="iconSort" src={iconArrowDownWhite}></img>  ️
              </button>
              <button id="buttonSortRuUp" className="buttonSort" onClick={this.sortButtonsHandler}>
                <img id="ibuttonSortRuUp" className="iconSort" src={iconArrowDownBlack}></img>  ️  ️
              </button>
            </th>
            <th>Тема
              <button id="buttonSortTopicDown" className="buttonSort" onClick={this.sortButtonsHandler}>
                <img id="ibuttonSortTopicDown" className="iconSort" src={iconArrowDownWhite}></img>  ️  ️
              </button>
              <button id="buttonSortTopicUp" className="buttonSort" onClick={this.sortButtonsHandler}>
                <img id="ibuttonSortTopicUp" className="iconSort" src={iconArrowDownBlack}></img>  ️  ️
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      );
    } else {
      return (
        <section id="notFoundBox">
          <h2 id="notFound">Ничего не найдено</h2>
          <img src={frog} id="frogFace"/>
        </section>
      );
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

          <section className="space10"></section>


          <section className="toolBox">
            <input type="text" id="searchbar" placeholder="Искать среди всех фраз" 
            onClick={this.hideTopics} onChange={this.search}/>
          </section>

          <section className ="topicSelectorBox">
        
          {this.renderTopicSelector()}
        
          </section>


          
          
          { this.renderSpreadsheet() }

          <button id="back" onClick={this.props.onClick}><img src={iconBack} id="backIcon"></img></button>
        </div>
      </div>
    );
  }
}