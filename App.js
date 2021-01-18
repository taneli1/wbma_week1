/* eslint-disable max-len */
import React from 'react';
import {MainContext, MainProvider} from './contexts/MainContext';
import Navigator from './navigators/Navigator';

const App = () => {
    return (
      <MainProvider>
        <Navigator/>
      </MainProvider>
    )
};

export default App;
