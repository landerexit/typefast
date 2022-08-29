import { inject, observer } from 'mobx-react'

import './gamebutton.sass'

import enterImg from '../../img/enter.svg'

const GameButton = inject('MainStore')(
    observer(({ buttonText }) => {
        return (
            <section
                className='game-button'
            >
                <div className='game-button__text__wrapper'>
                    <p className='game-button__text'>По готовности</p>
                    <p className='game-button__text'>нажмите Enter, чтобы {buttonText}</p>
                </div>
                <img src={enterImg} alt="enter" />
            </section>
        );
    })
)

export default GameButton