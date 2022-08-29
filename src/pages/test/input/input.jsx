import { inject, observer } from "mobx-react";
import React from 'react';

import './input.sass'

const InputComponent = inject('MainStore')(
    observer(({ MainStore }) => {
        React.useEffect(() => {
            MainStore.checkNewLetter()
        }, [MainStore.pressedButtons])

        return (
            <section className="input">
                <span className='input__text input__text__untyped'>
                    <span className='input__text input__text__typed'>
                        {MainStore.phrase[0]}
                    </span>
                    {MainStore.phrase[1]}
                </span>
            </section>
        );

    })
)

export default InputComponent;