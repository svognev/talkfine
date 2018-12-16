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
import icon10 from "../icon10.svg";
import iconDownwards from "../iconDownwards.svg";
import iconUpwards from "../iconUpwards.svg"

export class MainScreen extends React.Component {

    render() {
        return (
            <div id="container">
              <div id="titleBox"></div> 
              <div id="subtitleBox"></div>  
              <div id="extraTitleBox"></div>
              <div id="itemsBox"></div>
              <div id="glossaryBox"></div>
            
              <div id="innerTitleBox">
                <h3 id="logo">Толк файн</h3>
              </div>
              <div id="innerSubtitleBox">
                <p id="subtitle">Упражнения по темам:</p>
              </div>
              <div id="innerExtraTitleBox">
                <p id="extraTitle">Дополнительно:</p>
              </div>
  
              <div id="itemBox01" className="itemBox">
                <button className="item" onClick={() => this.props.onClick("exercise01")}>
                  <img id="icon01" className="icons" src={icon01}></img>
                </button>
              </div>
              <div id="subscriptBox01" className="subscriptBox">
                <p id="subscript01" className="subscript">Приветствие<br />и прощание</p>
              </div>
  
              <div id="itemBox02" className="itemBox">
                <button className="item" onClick={() => this.props.onClick("exercise02")}>
                  <img id="icon02" className="icons" src={icon02}></img>
                </button>
              </div>
              <div id="subscriptBox02" className="subscriptBox">
                <p id="subscript02" className="subscript">Вводные слова</p>
              </div>
  
              <div id="itemBox03" className="itemBox">
                <button className="item" onClick={() => this.props.onClick("exercise03")}>
                  <img id="icon03"  className="icons" src={icon03}></img>
                </button>
              </div>
              <div id="subscriptBox03" className="subscriptBox">
                <p id="subscript03" className="subscript">Согласие и<br />несогласие</p>
              </div>
  
              <div id="itemBox04" className="itemBox">
                <button className="item" onClick={() => this.props.onClick("exercise04")}>
                  <img id="icon04"  className="icons" src={icon04}></img>
                </button>
              </div>
              <div id="subscriptBox04" className="subscriptBox">
                <p id="subscript04" className="subscript">Слова<br />вежливости</p>
              </div>
  
              <div id="itemBox05" className="itemBox">
                <button className="item" onClick={() => this.props.onClick("exercise05")}>
                  <img id="icon05"  className="icons" src={icon05}></img>
                </button>
              </div>
              <div id="subscriptBox05" className="subscriptBox">
                <p id="subscript05" className="subscript">Участие в разговоре</p>
              </div>
  
              <div id="itemBox06" className="itemBox">
                <button className="item" onClick={() => this.props.onClick("exercise06")}>
                  <img id="icon06"  className="icons" src={icon06}></img>
                </button>
              </div>
              <div id="subscriptBox06" className="subscriptBox">
                <p id="subscript06" className="subscript">Путешествия</p>
              </div>
  
              <div id="itemBox07" className="itemBox">
                <button className="item" id="idiom1Item" onClick={() => this.props.onClick("exercise07")}>
                  <img id="icon07"  className="icons" src={icon07}></img>
                </button>
              </div>
              <div id="subscriptBox07" className="subscriptBox">
                <p id="subscript07" className="subscript">Идиомы<br />Уровень I</p>
              </div>
  
              <div id="itemBox08" className="itemBox">
                <button className="item" id="idiom2Item" onClick={() => this.props.onClick("exercise08")}>
                  <img id="icon08"  className="icons" src={icon08}></img>
                </button>
              </div>
              <div id="subscriptBox08" className="subscriptBox">
                <p id="subscript08" className="subscript">Идиомы<br />Уровень II</p>
              </div>
  
              <div id="itemBox09" className="itemBox">
                <button className="item" id="proverbItem" onClick={() => this.props.onClick("exercise09")}>
                  <img id="icon09" className="icons" src={icon09}></img>
                </button>
              </div>
              <div id="subscriptBox09" className="subscriptBox">
                <p id="subscript09" className="subscript">Пословицы</p>
              </div>
  
  
              <div id="itemBox10" className="itemBox">
                <button className="item" id="glossaryItem" onClick={() => this.props.onClick("dictionary")}>
                   <img id="icon10" className="icons" src={icon10}></img>
                </button>
              </div>
              <div id="subscriptBox10" className="subscriptBox">
                  <p id="subscript10" className="subscript">Словарь<br />выражений</p>
              </div>

              <div id="levelBox">
                <button className="idiomsLevel" id="levelUp" onClick={() => {
                  document.getElementById("levelUp").style.display = "none";
                  document.getElementById("itemBox07").style.zIndex = 3;
                  document.getElementById("subscriptBox07").style.zIndex = 3;
                  document.getElementById("levelDown").style.display = "flex";
                  document.getElementById("itemBox08").style.zIndex = 4;
                  document.getElementById("subscriptBox08").style.zIndex = 4;
                }}>
                  <img className="iconLevel" id="iconLevelUp" src={iconUpwards}></img>
                </button>
                <button className="idiomsLevel" id="levelDown" onClick={() => {
                  document.getElementById("levelDown").style.display = "none";
                  document.getElementById("itemBox08").style.zIndex = 3;
                  document.getElementById("subscriptBox08").style.zIndex = 3;
                  document.getElementById("levelUp").style.display = "flex";
                  document.getElementById("itemBox07").style.zIndex = 4;
                  document.getElementById("subscriptBox07").style.zIndex = 4;
                }}>
                  <img className="iconLevel" id="iconLevelDown" src={iconDownwards}></img>
                </button>
              </div>
           </div>
        );
    }
}
