import React from 'react';

import { observer, inject } from 'mobx-react';


import InputComponent from './input/input';
import KeyboardComponent from './keyboard/keyboard';

const TestPage = inject('MainStore')(
    observer(({ MainStore }) => {
        React.useEffect(() => {
            document.addEventListener("keydown", MainStore.handleKeyDown)
            document.addEventListener("keyup", MainStore.handleKeyUp)
        })

        return (
            <section className='tile'>
                <InputComponent />
                <KeyboardComponent />
            </section>
        );
    })
)

export default TestPage;