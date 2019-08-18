import React, {Component} from 'react';
//Модули CSS включены для файлов, заканчивающихся расширением .module.css
//Добавляет уникальность стилям
import styles from './Layout.module.css';
//Обычный импорт
import './Layout.module.css';

class Layout extends Component{
     render(){
         return(
             <div id={styles.wb_FlexBoxContainer1}>
                 <div id={styles.FlexBoxContainer1}>


                 <main>
                     {this.props.children}
                 </main>
                 </div>
             </div>
         )
     }
}

export default Layout;