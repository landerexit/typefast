import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import './keyboard.sass'

const lowerCaseLayout =
    [
        ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "<-"],
        ["TAB", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
        ["CAPS", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "ENTER"],
        ["SHIFT", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "SHIFT"],
        ["SPACE"]
    ]

const upperCaseLayout =
    [
        ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "<-"],
        ["TAB", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|"],
        ["CAPS", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "ENTER"],
        ["SHIFT", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "SHIFT"],
        ["SPACE"]
    ]

const KeyboardComponent = inject('MainStore')(
    observer(({ MainStore }) => {
        let keysLayout = MainStore.isUpperCase ? upperCaseLayout : lowerCaseLayout

        return (
            <section
                className={`keyboard ${MainStore.isUpperCase ? " keyboard__shift" : ""}`}
            >
                {keysLayout.map((buttonsRow, buttonsRowIndex) =>
                (
                    <div
                        className='keyboard__row'
                        key={"row" + buttonsRowIndex}
                    >
                        {buttonsRow.map((button, buttonIndex) =>
                        (
                            <div
                                className={MainStore.buttonDynamicClass(button)}
                                key={"keycap" + buttonIndex}
                            >
                                {button}
                            </div>
                        ))}
                    </div>
                ))}
                <section className={`keyboard__change-lang ${MainStore.notEng ? "keyboard__change-lang__active" : ''}`}>Переключите раскладку на Английский</section>
            </section>
        );
    })
)

export default KeyboardComponent;