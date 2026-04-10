import React from 'react'
import NavPane from '../component/NavPane'
import MessageWindow from '../component/MessageWindow'

const Workout: React.FC = () => {
    return (<>
        <div>
            <div className="w-full flex justify-center pt-10">
                <MessageWindow />
            </div>
            <NavPane />
            <h1>Workout</h1>
        </div>
    </>)
}

export default Workout