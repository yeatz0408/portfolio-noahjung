import React from 'react'
import NavPane from '../component/NavPane'
import MessageWindow from '../component/MessageWindow'

const About: React.FC = () => {
    return (<>
        <NavPane />
        <MessageWindow />
        <h1>About this Website</h1>
    </>)
}

export default About