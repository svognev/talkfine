import React from "react";
import icon01 from "../icon01.svg";
import icon02 from "../icon02.svg";
import icon03 from "../icon03.svg";
import icon04 from "../icon04.svg";
import icon05 from "../icon05.svg";
import icon06 from "../icon06.svg";
import icon07 from "../icon07.svg";
import icon08 from "../icon08.svg";
import icon09 from "../icon09.svg";

export class MainScreen extends React.Component {

    render() {
        return (
              <div className="workspace">

                <section className="titleBox">
                  <h1 className="title">Толк файн</h1>
                </section>
              
                <section className="innerTitleBox">
                </section>
              
                <div className="exercises">

                <section className="topicBox">
                  <p id="currentTopic">Упражнения по темам:</p>
                </section>
                  
                <div className="grid">
                  
                  <div className="a1">
                    <button className="item" onClick={() => this.props.onClick("exercise01")}>
                      <img id="icon01" className="itemIcon" src={icon01}></img>
                    </button>
                  </div>
                  <div className="a2">
                    <button className="item" onClick={() => this.props.onClick("exercise02")}>
                    <img id="icon02" className="itemIcon" src={icon02}></img>
                    </button>
                  </div>
                  <div className="a3">
                    <button className="item" onClick={() => this.props.onClick("exercise03")}>
                    <img id="icon03"  className="itemIcon" src={icon03}></img>
                    </button>
                  </div>

                  <div className="b1">
                    <button className="item" onClick={() => this.props.onClick("exercise04")}>
                    <img id="icon04"  className="itemIcon" src={icon04}></img>
                    </button>
                  </div>
                  <div className="b2">
                    <button className="item" onClick={() => this.props.onClick("exercise05")}>
                    <img id="icon05"  className="itemIcon" src={icon05}></img>
                    </button>
                  </div>
                  <div className="b3">
                    <button className="item" onClick={() => this.props.onClick("exercise06")}>
                    <img id="icon06"  className="itemIcon" src={icon06}></img>
                    </button>
                  </div>

                  <div className="c1">
                    <button className="item" id="idiom1Icon" onClick={() => this.props.onClick("exercise07")}>
                    <img id="icon07"  className="itemIcon" src={icon07}></img>
                    </button>
                  </div>
                  <div className="c2">
                    <button className="item" id="idiom2Icon" onClick={() => this.props.onClick("exercise08")}>
                    <img id="icon08"  className="itemIcon" src={icon08}></img>
                    </button>
                  </div>
                  <div className="c3">
                    <button className="item" id="proverbIcon" onClick={() => this.props.onClick("exercise09")}>
                    <img id="icon09" className="itemIcon" src={icon09}></img>
                    </button>
                  </div>
                  

                  <div className="a1text"><p className="itemName">Приветствие<br />и прощание</p></div>
                  <div className="a2text"><p className="itemName">Вводные<br />слова</p></div>
                  <div className="a3text"><p className="itemName">Согласие и<br />несогласие</p></div>
                  
                  <div className="b1text"><p className="itemName">Слова<br />вежливости</p></div>
                  <div className="b2text"><p className="itemName">Участие в<br />разговоре</p></div>
                  <div className="b3text"><p className="itemName">Путешествия</p></div>
                 
                  <div className="c1text"><p className="itemName">Идиомы<br />Уровень I</p></div>
                  <div className="c2text"><p className="itemName">Идиомы<br />Уровень II</p></div>
                  <div className="c3text"><p className="itemName">Пословицы</p></div>
                
                </div>
                
                <div className="dictionary">
                
                    <p id="addOnTitle">Дополнительно:</p>
                    <p id="dictionaryLink" onClick={() => this.props.onClick("dictionary")}>Словарь популярных фраз</p>
                </div>
            
              </div>
            </div>    
        );
    }
}
