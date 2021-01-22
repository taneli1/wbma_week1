/* eslint-disable ezxpo max-len */
import React from 'react';
import { MainProvider } from './contexts/MainContext';
import Navigator from './navigators/Navigator';

const App = () => {
    return (
        <MainProvider>
            <Navigator />
        </MainProvider>
    );
};

import { SafeAreaView } from 'react-native-safe-area-context';

export default App;
