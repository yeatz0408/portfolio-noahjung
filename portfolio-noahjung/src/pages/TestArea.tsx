import React from "react"
import { useEffect } from "react"
import NavPane from "../component/NavPane"
import Quiz from "../practice/Quiz"
import Pokemon from "../practice/Pokemon"

const TestArea: React.FC = () => {

    // test commit
    return (<>
        <div>
            <NavPane />
            <Quiz />
            <Pokemon pokemonId={1} />
        </div>
    </>)
}

export default TestArea