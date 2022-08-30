import { inject, observer } from "mobx-react";
import React from 'react';

import './input.sass'

const InputComponent = inject('MainStore')(
    observer(({ MainStore }) => {
        return (
            <section className="input">
                <span className='input__text input__text__untyped'>
                    <span className='input__text input__text__typed'>
                        {MainStore.phrase.typed}
                    </span>
                    {MainStore.phrase.untyped}
                </span>
            </section>
        );

    })
)

export default InputComponent;