import React from "react";
import { phrases } from "./phrases";
import logo from "../icons/logo.svg";
import frog from "../icons/frog.svg";
import iconBack from "../icons/iconBack.svg";
import iconTriangle from "../icons/iconTriangle.svg";
import iconArrowDownWhite from "../icons/iconArrowDownWhite.svg";
import iconArrowDownBlack from "../icons/iconArrowDownBlack.svg";
import iconArrowUpBlack from "../icons/iconArrowUpBlack.svg";

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
    this.showTopics = this.showTopics.bind(this);
    this.hideTopics = this.hideTopics.bind(this);
  }

  search(e) {
    if(e.target.value === ""){
      this.setState( { data: dictionary, lastSearch: dictionary,} );
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
    document.getElementById("options").style.display = "grid";
    this.sortButtonsDefault();
  }

  hideTopics() {
    document.getElementById("options").style.display = "none";
    this.sortButtonsDefault();
  }

  renderOptions() {
    return (
      <div id="options">
      
          <div id="returnAll" className="option unselectable transitional" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(6).toLowerCase());
            document.getElementById("searchbar").placeholder = "Искать среди всех фраз";
          }}>
            Все темы
          </div>

          <div id="onlygreeting" className="option unselectable transitional" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4));
            document.getElementById("searchbar").placeholder = "Поиск в теме «Приветствия и прощания»";
          }}>
            Приветствие и прощание
          </div>

          <div id="onlyintro" className="option unselectable transitional" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4));
            document.getElementById("searchbar").placeholder = "Поиск в теме «Вводные слова»";
          }}>
            Вводные слова
          </div>

          <div id="onlyconsent" className="option unselectable transitional" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4));
            document.getElementById("searchbar").placeholder = "Поиск в теме «Согласие и несогласие»";
          }}>
            Согласие и несогласие
          </div>

          <div id="onlycourtesy" className="option unselectable transitional" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4));
            document.getElementById("searchbar").placeholder = "Поиск в теме «Слова вежливости»";
          }}>
            Слова вежливости
          </div>

          <div id="onlytalk" className="option unselectable transitional" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4));
            document.getElementById("searchbar").placeholder = "Поиск в теме «Участие в разговоре»";
          }}>
            Участие в разговоре
          </div>

          <div id="onlytravel" className="option unselectable transitional" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4));
            document.getElementById("searchbar").placeholder = "Поиск в теме «Путешествия»";
          }}>
            Путешествия
          </div>

          <div id="onlyidiom" className="option unselectable transitional" onClick={(e) => {
            this.hideTopics();
            this.limit(e.target.id.slice(4));
            document.getElementById("searchbar").placeholder = "Поиск в теме «Идиомы»";
          }}>
            Идиомы
          </div>

          <div id="onlyproverb" className="option unselectable transitional" onClick={(e) => {
            this.hideTopics();
              document.getElementById("searchbar").placeholder = "Поиск в теме «Пословицы»";
            this.limit(e.target.id.slice(4));
          }}>
            Пословицы
          </div>

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
            <th className="unselectable">Фраза
              <button id="buttonSortEnDown" className="buttonSort" onClick={this.sortButtonsHandler}> 
                <img id="ibuttonSortEnDown" className="iconSort" src={iconArrowDownWhite} alt=" "></img>  ️ ️
              </button>
              <button id="buttonSortEnUp" className="buttonSort" onClick={this.sortButtonsHandler}>
                <img id="ibuttonSortEnUp" className="iconSort" src={iconArrowDownBlack} alt=" "></img>  ️
              </button>
            </th>
            <th className="unselectable">Значение
              <button id="buttonSortRuDown" className="buttonSort" onClick={this.sortButtonsHandler}>
                <img id="ibuttonSortRuDown" className="iconSort" src={iconArrowDownWhite} alt=" "></img>  ️
              </button>
              <button id="buttonSortRuUp" className="buttonSort" onClick={this.sortButtonsHandler}>
                <img id="ibuttonSortRuUp" className="iconSort" src={iconArrowDownBlack} alt=" "></img>  ️  ️
              </button>
            </th>
            <th className="unselectable">Тема
              <button id="buttonSortTopicDown" className="buttonSort" onClick={this.sortButtonsHandler}>
                <img id="ibuttonSortTopicDown" className="iconSort" src={iconArrowDownWhite} alt=" "></img>  ️  ️
              </button>
              <button id="buttonSortTopicUp" className="buttonSort" onClick={this.sortButtonsHandler}>
                <img id="ibuttonSortTopicUp" className="iconSort" src={iconArrowDownBlack} alt=" "></img>  ️  ️
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
        <div id="notFoundBox">
          <p id="notFound">Ничего не найдено</p>
          <div id="frogBox">
            <img src={frog} id="frogFace" alt=" "></img> 
          </div>
        </div>
      );
    }
  }

  render() {
 
    return (
      <div id="container">
        <div id="titleBox"></div> 
        <div id="toolsBox" onClick={this.hideTopics}></div>
        <div id="sheetBox"></div>

        <div id="innerTitleBox">
          <img id="logoPic" src={logo} alt=" "></img>
        </div>
        <div id="backBox">
          <button id="back" className="transitional" onClick={this.props.onClick}>
            <img src={iconBack} id="backIcon" alt=" "></img>
          </button>
        </div>

        <div id="searchBox">
            <input id="searchbar" autoFocus type="text" placeholder="Искать среди всех фраз" 
            onClick={this.hideTopics} onChange={this.search}/>
        </div>
        <div id="selectorBox">
          <button id="selector" onClick={this.showTopics}>
            <img id="triangleIcon" src={iconTriangle} alt=" "></img>
          </button>
        </div>

        { this.renderOptions() }

        <div id="sheet" onClick={ () => { document.getElementById("options").style.display = "none" } }>
          { this.renderSpreadsheet() }
        </div>
      </div>
    );
  }
}