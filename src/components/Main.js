import React, { Component } from 'react';


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            number: 0,
            letter: "A",
            cardNumber: 0,
            numberIndex: 0,
            time: 60,
            gameLength: 60,
            score: 0,
            gameStarted: false,
            showScore: false,
            showQuestions: true,
        }

        this.answer = this.answer.bind(this);
        this.startNewRound = this.startNewRound.bind(this);
        this.countDown = this.countDown.bind(this)
    }

    getRightAnswer() {
        const cardNumber = this.state.cardNumber;
        let condition;

        if (cardNumber === 0) {
            condition = this.state.number % 2 === 0;
        } else {
            const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];
            condition = vowels.indexOf(this.state.letter) !== -1;
        }

        return condition ? "YES" : "NO";
    }

    randInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    answer(ans) {
        if (ans === this.getRightAnswer()) {
            this.setState({
                score: this.state.score + 50,
            });
        }

        const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Z"];
        const vowels = ['A', 'E', 'I', 'O', 'U', 'Y'];

        const choice = this.randInt(0, 3);
        let letter;
        if (choice === 0) {  // the probability to get a vowel is 0.33
            letter = vowels[this.randInt(0, 6)];
        } else {
            letter = consonants[this.randInt(0, 20)];
        }

        this.setState({
            number: this.randInt(0, 10),
            letter: letter,
            cardNumber: this.randInt(0, 2),
            numberIndex: this.randInt(0, 2),
        });
    }

    countDown() {
        const time = this.state.time;

        if (time <= 0) {
            clearInterval(this.timer);
            this.setState({
                gameStarted: false,
                showScore: true,
            });
        } else {
            this.setState({
                time: time - 1
            });
        }
    }

    startNewRound() {
        this.setState({
            score: 0,
            gameStarted: true,
            showScore: false,
            time: this.state.gameLength,
            showQuestions: true,
        });
        this.timer = setInterval(this.countDown, 1000);
        setTimeout(() => {
            this.setState({
                showQuestions: false,
            });
        }, 10000);
    }

    render() {
        const number = this.state.number,
            letter = this.state.letter,
            cardNumber = this.state.cardNumber,
            numberIndex = this.state.numberIndex,
            score = this.state.score,
            time = this.state.time,
            gameStarted = this.state.gameStarted,
            showScore = this.state.showScore,
            showQuestions = this.state.showQuestions;

        const GameStatus = () => {
            return (
                <div className="p-3 d-flex justify-content-around">
                    <h3>
                        Time : {time}s
                    </h3>
                    <h3>
                        Score : {score}
                    </h3>
                </div>
            );
        };

        const Card = () => {
            return (
                <div className="mx-auto border px-4 py-2 mb-3 text-center rounded game-card">
                    {numberIndex === 0 ? number : letter}
                    {numberIndex === 1 ? number : letter}
                </div>
            );
        };

        const EmptyCard = () => {
            return (
                <div className="mx-auto border px-4 py-2 mb-3 text-center rounded game-card">
                </div>
            );
        };

        const AnswerButtons = () => {
            return (
                <div className="mt-1 py-3 text-center">
                    <button
                        onClick={(e) => { this.answer("NO") }}
                        className="btn btn-lg btn-primary mx-2 game-btn"
                    >NO</button>
                    <button
                        onClick={(e) => { this.answer("YES") }}
                        className="btn btn-lg btn-primary mx-2 game-btn"
                    >YES</button>
                </div>
            );
        };

        const Game = () => {
            return (
                <div>
                    {showQuestions ?
                        <div className={"alert ".concat(cardNumber === 0 ? "alert-primary" : "alert-secondary")} role="alert">
                            Is the number even?
                        </div> :
                        null
                    }
                    {cardNumber === 0 ? <Card /> : <EmptyCard />}
                    {cardNumber === 1 ? <Card /> : <EmptyCard />}
                    {showQuestions ?
                        <div className={"alert ".concat(cardNumber === 1 ? "alert-primary" : "alert-secondary")} role="alert">
                            Is the letter a vowel?
                        </div> : null
                    }
                    <AnswerButtons />
                </div>
            );
        };

        const NewGameButton = () => {
            return (
                <div className="text-center">
                    {showScore ?
                        <h1>YOU GOT {score} !</h1> : null}
                    <button
                        onClick={(e) => { this.startNewRound() }}
                        className="btn btn-lg btn-primary mx-2 game-btn"
                    >PLAY</button>
                </div>
            );
        }

        return (
            <div>
                <GameStatus />
                <div className="d-flex justify-content-center" style={{ height: "85vh" }}>
                    <div className="my-auto">
                        {gameStarted ? <Game /> : <NewGameButton />}
                    </div>
                </div>
            </div>
        );

    }
}


export default Main;
