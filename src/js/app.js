import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import '../scss/app.scss'
import Main from './Main'

ReactDOM.render(
    <AppContainer>
            <Main/>
    </AppContainer>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept('./Main', () => {
        ReactDOM.render(
            <AppContainer>
                    <Main/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
