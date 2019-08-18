import React from 'react';
import styles from '../ActiveQuiz.module.css';


const List = props =>(

//Над этим работаю!!!!!!!!!
// if( props.showAnsverState){
//     const cls2 = props.showAnsverState[list.id]
//     console.log(cls2)
// }


<div id={styles.Active}>

        {/*Выводим лист в цикле*/}
        {props.lists.map((list, index) => {
            //Задаем константе стили


            const cls = [styles.FlexBoxContainer4];
            const AnsverState = props.showAnsverState ? props.showAnsverState[list.id] : null


            if(AnsverState){
                //Метод push() добавляет один или более элементов в конец массива и возвращает новую длину массива.
                //push Добавит стиль
                cls.push([styles[AnsverState]])
            }


             return(
                 //Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку.
            // Передаем константу вместо стилей с параметром   .join() разобьет пробелом
            <div className={cls.join('  ')} key={index} onClick={() => props.onAnswerClick(list.id)}

            >
                <div id={styles.wb_Text3}>
                    <span id={styles.wb_uid2}>○ {list.answer} &nbsp;&nbsp;   </span>
                </div>
            </div>
             )
            }
        )}


    </div>
)

export default List