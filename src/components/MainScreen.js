import React from "react";

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
                      👋
                    </button>
                  </div>
                  <div className="a2">
                    <button className="item" onClick={() => this.props.onClick("exercise02")}>
                      💬
                    </button>
                  </div>
                  <div className="a3">
                    <button className="item" onClick={() => this.props.onClick("exercise03")}>
                      ☑
                    </button>
                  </div>

                  <div className="b1">
                    <button className="item" onClick={() => this.props.onClick("exercise03")}>
                      ♛
                    </button>
                  </div>
                  <div className="b2">
                    <button className="item" onClick={() => this.props.onClick("exercise03")}>
                      ☕
                    </button>
                  </div>
                  <div className="b3">
                    <button className="item" onClick={() => this.props.onClick("exercise03")}>
                      🌏
                    </button>
                  </div>

                  <div className="c1">
                    <button className="item" id="idiom1Icon" onClick={() => this.props.onClick("exercise03")}>
                      📝
                    </button>
                  </div>
                  <div className="c2">
                    <button className="item" id="idiom2Icon" onClick={() => this.props.onClick("exercise03")}>
                      🔖
                    </button>
                  </div>
                  <div className="c3">
                    <button className="item" id="proverbIcon" onClick={() => this.props.onClick("exercise03")}>
                      ✨
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
