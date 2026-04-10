import React from "react"
import { useEffect, useRef } from "react"
import NavPane from "../component/NavPane"
import Quiz from "../practice/Quiz"
import Pokemon from "../practice/Pokemon"

const TestArea: React.FC = () => {

    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const requestBody = {
            prompt: "Tell me what I asked earlier. With the exact same words. Do not add anything more. Just the two sentences that I wrote, not your answer.",
            pastMessages: [
                { userMessage: "What does Noah do?",
                aiMessage: "He is a fullstack web developer." },
                { userMessage: "What's his main language?",
                aiMessage: "His main language is Java."}
            ]
        }

        fetch("http://localhost:8080/chat/dummy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        }).then(response => response.text()).then(console.log)
    }, [])
    

    return (<>
        <div>
            <NavPane />
            <Quiz />
            {/* <Pokemon pokemonId={3} /> */}
        </div>
    </>)
}


export default TestArea