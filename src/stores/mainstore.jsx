import { action, makeObservable, observable } from "mobx";

class MainStore {
    constructor() {
        makeObservable(this, {
            notEng: observable,
            pressedButtons: observable.deep,
            phrase: observable.deep,

            isUpperCase: observable,
            capsLock: observable,

            gameStatus: observable,

            result: observable,

            startGame: action.bound,
            endGame: action.bound,
            changeGameStatus: action.bound,

            handleEnterDown: action.bound,
            handleKeyDown: action.bound,
            handleKeyUp: action.bound,

            buttonDynamicClass: action.bound,

            addPressedButton: action.bound,
            removePressedButton: action.bound,

            checkEngLayout: action.bound,
            checkIsButtonPressed: action.bound,
            checkIsCapsLocked: action.bound,
            checkNewLetter: action.bound,
            checkUpperCase: action.bound,

            getText: action.bound
        })
    }

    notEng = false

    pressedButtons = [{ key: "blob", code: "blob" }]

    capsLock = false
    isUpperCase = false

    gameStatus = 0

    phrase = ['', '']
    result = {}

    async startGame() {
        this.result = { startTime: new Date().getTime(), phraseLength: 0, speed: 0 }
        await this.getText()
    }

    async endGame() {
        const endTime = new Date().getTime()

        this.result = {
            ...this.result,
            speed: Math.floor(this.result.phraseLength / ((endTime - this.result.startTime) / 1000 / 60))
        }

        console.log(this.result)
    }

    addPressedButton(e, theKey = e.key, theCode = e.code) {
        this.pressedButtons = [...this.pressedButtons, { key: theKey, code: theCode }]
    }

    removePressedButton(theKeyCode, type = "key") {
        this.pressedButtons = this.pressedButtons.filter(button => button[type] !== theKeyCode)
    }

    checkIsCapsLocked(e) {
        this.capsLock = e.getModifierState("CapsLock")
        this.isUpperCase = this.capsLock

        if (this.capsLock) {
            this.addPressedButton(e, "CapsLock", "CapsLock")
        }
    }

    handleEnterDown(e) {
        if ((this.gameStatus === 0 || this.gameStatus === 2) && e.key === 'Enter') {
            this.checkIsCapsLocked(e)
            this.changeGameStatus()
        }
    }

    handleKeyDown(e) {
        this.checkIsCapsLocked(e)

        this.checkEngLayout(e)

        if (!this.checkIsButtonPressed(e.key)) {
            if (e.key === 'CapsLock') {
                if (this.checkIsButtonPressed('CapsLock')) {
                    this.removePressedButton('CapsLock')
                } else {
                    this.addPressedButton(e)
                }
                this.capsLock = !this.capsLock
            } else {
                this.addPressedButton(e)
            }
        }
    }

    handleKeyUp(e) {
        if (e.key !== 'CapsLock') {
            this.removePressedButton(e.code, 'code')
        }
    }

    buttonDynamicClass(pressedButton) {
        const classNameBase = 'keyboard__button'
        const classNameActive = ' ' + classNameBase + '__active'
        const classNameNext = ' ' + classNameBase + '__next'

        let tempClassName = classNameBase
        let tempButtonKey = pressedButton

        this.checkUpperCase()

        switch (tempButtonKey) {
            case 'SPACE':
                tempButtonKey = ' '
                break

            case 'SHIFT':
                tempButtonKey = 'Shift'
                break

            case 'CAPS':
                tempButtonKey = 'CapsLock'
                break

            case 'ENTER':
                tempButtonKey = 'Enter'
                break

            case '<-':
                tempButtonKey = 'Backspace'
                break

            default:
        }

        if (tempButtonKey === 'CapsLock') {
            if (this.capsLock)
                tempClassName += classNameActive
        } else if (tempButtonKey === 'Shift' && this.checkIsButtonPressed('Shift')) {
            tempClassName += classNameActive
        } else {
            if (this.checkIsButtonPressed(tempButtonKey)) {
                tempClassName += classNameActive
            } else if (tempButtonKey === this.phrase[1][0]) {
                tempClassName += classNameNext
            }
        }

        return tempClassName
    }

    checkEngLayout(e) {
        if (!/[A-Za-z1-9 -/:-@[-`{-~]/.test(e.key)) {
            this.notEng = true
            setTimeout(() => {
                this.notEng = false
            }, 2000)
        }
    }

    async changeGameStatus() {
        if (this.gameStatus === 0) {
            await this.startGame()
            this.gameStatus = 1
        } else if (this.gameStatus === 1) {
            await this.endGame()
            this.gameStatus = 2
        } else {
            await this.startGame()
            this.gameStatus = 1
        }
    }

    checkIsButtonPressed(theKeyCode, type = "key") {
        return !!this.pressedButtons.find(button => button[type] === theKeyCode)
    }

    checkNewLetter() {
        if (this.pressedButtons[this.pressedButtons.length - 1].key === this.phrase[1][0]) {
            if (this.phrase[1].length === 1) {
                this.changeGameStatus()
                this.phrase = ['', '']

            } else {
                this.phrase = [
                    this.phrase[0] + this.phrase[1][0],
                    this.phrase[1].slice(1)
                ]
            }
        }

    }

    checkUpperCase() {
        if (this.checkIsButtonPressed("Shift") && this.capsLock) {
            this.isUpperCase = false
        } else if (this.capsLock) {
            this.isUpperCase = true
        } else {
            this.isUpperCase = this.checkIsButtonPressed("Shift")
        }
    }

    async getText() {
        const url = 'https://baconipsum.com/api/?type=meat-and-filler&paras=1&sentences=1&format=json'
        const response = await fetch(url)
            .then(response => response.json())
            .catch(err => console.error(err));

        this.result = { ...this.result, phraseLength: response[0].length }
        this.phrase = ['', response[0]]
    }
}

export default new MainStore()