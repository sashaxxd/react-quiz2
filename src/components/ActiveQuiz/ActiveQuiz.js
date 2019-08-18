import React from 'react';
import styles from './ActiveQuiz.module.css';
import List from "./List/List";

const ActiveQuiz = props =>(
   <div id={styles.Active}>
       <div id="sm" style={{textAlign: 'right', backgroundColor: "#9370DB", padding: 3}}>{props.answerNumber} из {props.quizlenght}</div>

       <div id={styles.FlexBoxContainer3}>
           <div id={styles.wb_Text2}>
               <span id={styles.wb_uid1}>{props.answerNumber}. {props.question} </span>
           </div>
       </div>

        {/*Вывод листа*/}
        <List
            lists = {props.lists}
           button_name = {props.button_name}
            onAnswerClick = {props.onAnswerClick}
            showAnsverState={props.showAnsverState}
        />


   </div>
)

export default ActiveQuiz