import React from "react"
import { useEffect } from "react"
import NavPane from "../component/NavPane"
import Quiz from "../practice/Quiz"
import Pokemon from "../practice/Pokemon"

const TestArea: React.FC = () => {

    const formData = new URLSearchParams()
        formData.append("prompt", "How is the weather today?")

        fetch("http://localhost:8080/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        }).then(response => response.text()).then(console.log)

    // test commit
    return (<>
        <div>
            <NavPane />
            <Quiz />
            {/* <Pokemon pokemonId={1} /> */}
        </div>
    </>)
}


export default TestArea