import React from 'react';
import { inject, observer } from 'mobx-react';

import './styles/style.sass'

import HeroComponent from "./pages/hero/hero";

import StartPage from './pages/start/start';
import TestPage from './pages/test/test';
import FinalPage from './pages/final/final';

const sitePages = [
  <StartPage />,
  <TestPage />,
  <FinalPage />
]

const App = inject('MainStore')(
  observer(({ MainStore }) => {
    React.useEffect(() => {
      setTimeout(() => {
        document.addEventListener('keydown', MainStore.handleEnterDown)
      }, 4000)
    }, [])

    return (
      <>
        <HeroComponent />
        <main className='main'>
          {sitePages[MainStore.gameStatus]}
        </main>
      </>
    );
  })
)

export default App;
