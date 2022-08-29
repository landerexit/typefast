import './hero.sass'

import logo from '../../img/logo.svg'

function HeroComponent() {
    return (
        <section className="hero">
            <img src={logo} alt="logo" className="hero__img" />
            <div className="hero__author">
                <p className='hero__by'>Автор</p>
                <h2 className='hero__name'>Эмиль Каримов</h2>
            </div>
        </section>
    );
}

export default HeroComponent;