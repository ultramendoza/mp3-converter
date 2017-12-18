import React from 'react'
import ReactDOM from 'react-dom'

import socket from 'socket.io-client'

import './scss/index.scss'

const MAX_VIDEOS = 4

class App extends React.Component {

    constructor () {
        super()

        this.state = {
            uptime: 0,
            videos: []
        }

        this.io = socket()

        this.io.on('connect', () => {

        })

        this.io.on('disconnect', () => {

        })

        this.io.on('uptime', (data) => {
            this.setState({
                uptime: data.uptime
            })
        })

        this.io.on('videosList', (data) => {
            this.setState({
                videos: data.videos.length > MAX_VIDEOS ? data.videos.slice(data.videos.length - MAX_VIDEOS, data.videos.length) : data.videos
            })
        })

        this.io.on('download', (data) => {
            let videos = this.state.videos.length > MAX_VIDEOS ? this.state.videos.slice(this.state.videos.length - MAX_VIDEOS, this.state.videos.length) : this.state.videos
            videos.push(data.video)
            this.setState({
                videos
            })
        })
    }

    formatDate (date) {
        return date
    }

    install () {
        window.chrome.webstore.install('https://chrome.google.com/webstore/detail/idmpmcojkloaepopblkoiebbldelfnio',
        (data) => {
            console.log(data)
        }, (err) => {
            console.error(err)
        })
    }

    render () {
        return (
            <div className='app-wrapper'>
                <div className='extension-logo'></div>
            </div>
        )
    }
}

export default App

ReactDOM.render(
    <App />,
    document.getElementById('app')
)