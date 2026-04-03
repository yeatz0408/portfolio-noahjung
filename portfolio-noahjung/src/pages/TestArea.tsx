import React from "react"
import { useEffect } from "react"
import NavPane from "../component/NavPane"
import Quiz from "../practice/Quiz"
import Pokemon from "../practice/Pokemon"

const TestArea: React.FC = () => {

    useEffect(() => {

    }, [])

    return (<>
        <div>
            <NavPane />
            <Quiz />
            <Pokemon id={1} />
        </div>
    </>)
}

export default TestArea