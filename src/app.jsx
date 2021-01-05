import React from 'react'

import style from './style.css'

class App extends React.Component {

    state = {
        text: 'Hello World'
    }

    handleClick = async () => {
        this.setState({ text: 'Loading...' })
        const result = await import(/* webpackChunkName: "lazyLoadedText" */ './lazy-text')

        console.log(result)
        await new Promise((resolve) => setTimeout(resolve, 2000))

        this.setState({ text: result.default })
    }

    render() {

        return (
            <div onClick={this.handleClick}>
                <div className={style.test}>{this.state.text}</div>
            </div>
        )
    }
}

export default App
