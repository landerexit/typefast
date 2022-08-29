import { inject, observer } from 'mobx-react'

import './final.sass'

import GameButton from '../../components/gamebutton/gamebutton'

const FinalPage = inject('MainStore')(
    observer(({ MainStore }) => {
        return (
            <section className='tile final'>
                <p className='final__headline'>Это было круто!</p>
                <div className='final__result__wrapper'>
                    <p className='final__declaration'>Ваш результат:</p>
                    <h2 className='final__result'>{MainStore.result.speed}</h2>
                    <span className='final__speed-unit'>знаков в минуту</span>
                </div>
                <GameButton buttonText='попробовать снова' />
            </section>
        )
    })
)

export default FinalPage