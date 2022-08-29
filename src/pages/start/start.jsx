import GameButton from "../../components/gamebutton/gamebutton";

import './start.sass'

import speedImg from '../../img/speed.svg'

function StartPage() {
    return (
        <section className="tile start ">
            <h1 className="start__headline">TYPEFAST</h1>
            <img src={speedImg} alt="скорость" className="start__img" />

            <p className="start__text">
                Узнай свою скорость печати
                <br />на английском языке
            </p>

            <GameButton buttonText="начать" />
        </section>
    );
}

export default StartPage;