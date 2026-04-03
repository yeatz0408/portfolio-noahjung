import React from "react"
import { useEffect } from "react"
import Quiz from "../practice/Quiz"
import Pokemon from "../practice/Pokemon"

const TestArea: React.FC = () => {

    useEffect(() => {

    }, [])

    return (<>
        <div>
            <Quiz />
            <Pokemon id={1} />
        </div>
    </>)
}

export default TestArea