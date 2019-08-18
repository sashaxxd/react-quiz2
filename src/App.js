import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";


class App extends Component {

    // Иконка загрузки перед рендерингом
    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 300))
    }

    componentDidMount(){
        this.authenticate().then(() => {
            const ele = document.getElementById('ipl-progress-indicator')
            if(ele){
                // fade out
                ele.classList.add('available')
                setTimeout(() => {
                    // remove from DOM
                    ele.outerHTML = ''
                }, 300)
            }
        })
    }

    render() {
        return (
              //Шаблон сайта
              <Layout>


                {/* Дочерний див ниже выведется с помощью  {this.props.children}*/}
                {/*Тут будем размещать виды т.е. страницы сайта*/}
                <Quiz/>
              </Layout>

        );

    }

}

export default App;
