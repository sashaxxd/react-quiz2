import React, {Component} from 'react';
import styles from './Quiz.module.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
//Импортируем https://www.npmjs.com/package/react-addons-update
//https://reactjs.org/docs/update.html
//Позволяет менять состояние нужного объекта в массиве состояния
import update from 'react-addons-update';
// import SearchName from "../../components/SearchName/SearchName";
// import CheckboxContainer from "../../components/CheckboxContainer/CheckboxContainer";


class Quiz extends Component {

    state ={
        //Стили если выбрали правильный или не правильный ответ
        showAnsverState: null,
        //Блок который отображается если ответ правильный
        showBlockCorrect: false,
        BlockCorrectText: null,
        //Таймер
        currentCount: null,
        //Квиз и его елемент
        answerNumber: 0,
        quiz: [
            {
                "id": "1",
                "question": undefined,
                "correctAnswerId": 5,
                "answers_id": 1,
                "answers": [
                    {
                        "id": "1",
                        "answer": "Реклама",
                        "questions_id": 1
                    },
                    {
                        "id": "2",
                        "answer": "Вопрос",
                        "questions_id": 1
                    },
                    {
                        "id": "3",
                        "answer": "Звонок",
                        "questions_id": 1
                    }
                ]
            }
        ],
        button_name: 'Выбрать',
        searchString: undefined,
        checkedItems: new Map(),
        test: undefined
    }




    async componentDidMount() {

        const api_url = await
            fetch(`http://yii2-rest-api-quiz2/questions/index`);
        const data = await api_url.json();
        // console.log(data);
        this.setState({

            //Позволяет менять состояние нужного объекта в массиве состояния
            //Меняем состояние data: [] сразу перед рендерингом страницы
            // quiz: update(this.state.quiz, {0: {data: {$set: data}}})
            quiz: data


        });
        // console.log(this.state.quiz[0].answers);


    }





    // Поиск по имени
    handleSearchChange = async (e) => {
        let search = e.target.value;
        if(search) {
            const api_url = await
                fetch(`http://yii2-rest-api-quiz2/questions/search?name=${search}`);
            const data = await api_url.json();
            console.log(data);
            if(data.name !== "Not Found"){
                this.setState({

                    //Позволяет менять состояние нужного объекта в массиве состояния
                    //Меняем состояние data: [] сразу перед рендерингом страницы
                    // quiz: update(this.state.quiz, {0: {data: {$set: data}}})
                    quiz: data

                });
            }
        }
    }

    // Поиск с помощью чекбоксов
    handleCheckboxChange = async (e) => {

        const item = e.target.name;
        const isChecked = e.target.checked;
        alert(item)


        alert(isChecked)
        if(item && isChecked === true) {
            const api_url = await
                fetch(`http://yii2-rest-api-quiz2/questions/search?answer=${item}`);
            const data = await api_url.json();
            console.log(data);
            if(data.name !== "Not Found"){
                this.setState({

                    //Позволяет менять состояние нужного объекта в массиве состояния
                    //Меняем состояние data: [] сразу перед рендерингом страницы
                    quiz: update(this.state.quiz, {0: {data: {$set: data}}})


                });
            }
        }
        else {

            this.setState({

                //В случае пустого чекбокса
                //Меняем состояние на пустой массив
                quiz: update(this.state.quiz, {0: {data: {$set: []}}})


            });
        }

        this.setState(prevState =>
            ({
                checkedItems: prevState.checkedItems.set(item, isChecked),
                test: item
            }),

        )
    }


    //Функия для выбора правильного ответа
    onAnswerClickHandler = correctAnswerId  => {
        if (this.state.showAnsverState){
            const key = Object.keys(this.state.showAnsverState)
            const value =this.state.showAnsverState[key]
          console.log(value)
            if(value === 'success'){
                return
            }
        }

       console.log(correctAnswerId + ' ID получаем')

        //Получаем вопрос
        let question = this.state.quiz[this.state.answerNumber];
        console.log(question.correctAnswerId + ' ID правильного ответа')

        //Если сходится т.е. ответ правильный
        if (question.correctAnswerId  === correctAnswerId){
            this.setState({
                //Переходим к следующемму элементу массива
                currentCount: 5,
                BlockCorrectText: 'Это верный ответ',
                showBlockCorrect: true,
                showAnsverState: {[correctAnswerId]: 'success'}

            });

            // Запускаем таймер
            this.intervalId = setInterval(this.timer.bind(this), 1000);

            const timeout = window.setTimeout(() => {

                if(this.isQuizFinished()){
                    console.log('final')
                }
                else {
                    this.setState({
                        //Переходим к следующемму элементу массива
                        answerNumber: this.state.answerNumber +1,
                        currentCount: 5,
                        showBlockCorrect: false,
                        showAnsverState: null,

                    });
                    console.log(this.state.showAnsverState)
                }

                window.clearTimeout(timeout)
            }, 5000)


        }
        else {
            this.setState({

                BlockCorrectText: 'Это не верный ответ',
                showBlockCorrect: true,
                //В квадратных скобках параметр из функции correctAnswerId т.е. нужный id
                showAnsverState: {[correctAnswerId]: 'error'}

            });

        }




    }

    isQuizFinished(){
        return this.state.answerNumber +1 === this.state.quiz.length
    }




    timer() {
        this.setState({
            currentCount: this.state.currentCount - 1
        })
        if(this.state.currentCount < 1) {
            clearInterval(this.intervalId);
        }
    }


    render() {
        const cls = [styles.showBlockCorrect];
        if (this.state.BlockCorrectText === 'Это не верный ответ'){
            cls.push([styles.error])
        }

        return (

            <div>

            <div id={styles.FlexBoxContainer2}>
                <div id={styles.wb_Text1}>
                    <span id={styles.wb_uid0}>Загадки</span>
                </div>
            </div>
                {/* Поиск по имени*/}
                {/*<SearchName*/}
                    {/*searchString = {this.state.searchString}*/}
                    {/*handleSearchChange = {this.handleSearchChange}*/}
                {/*/>*/}

                {/*Чекбоксы*/}
                {/*<CheckboxContainer*/}
                    {/*checkedItems={this.state.checkedItems}*/}
                    {/*handleCheckboxChange={this.handleCheckboxChange}*/}
                    {/*test = {this.state.test}*/}
                {/*/>*/}

                  {/* Список*/}
                <ActiveQuiz
                    button_name = {this.state.button_name}
                    lists = {this.state.quiz[this.state.answerNumber].answers}
                    question = {this.state.quiz[this.state.answerNumber].question}
                    onAnswerClick={this.onAnswerClickHandler}
                    quizlenght={this.state.quiz.length}
                    answerNumber={this.state.answerNumber +1}
                    showAnsverState={this.state.showAnsverState}
                />
                <div className={cls.join('  ')} style={{display: this.state.showBlockCorrect ? 'block' : 'none'}}>
                    <div id={styles.wb_Text1}>
                        <span id={styles.wb_uid0}>{this.state.BlockCorrectText}  {this.state.currentCount}</span>
                    </div>
                </div>
            </div>

        )

    }

}

export default Quiz;