import { inject, observer } from 'mobx-react'

import './final.sass'

import GameButton from '../../components/gamebutton/gamebutton'

const FinalPage = inject('MainStore')(
    observer(({ MainStore }) => {
        return (
            <section className='tile final'>
                <p className='final__headline'>Ваш результат:</p>
                <div className='final__result__wrapper'>
                    <div className='final__result__section'>
                        <h2 className='final__result'>{MainStore.result.speed}</h2>
                        <span className='final__speed-unit'>знака в минуту</span>
                    </div>
                    <div className='final__result__section'>
                        <h2 className='final__result__right-clicks'>{MainStore.result.rightClicksPercentage}%</h2>
                        <span className='final__speed-unit'>точности</span>
                    </div>
                </div>
                <GameButton buttonText='попробовать снова' />
            </section>
        )
    })
)

export default FinalPage