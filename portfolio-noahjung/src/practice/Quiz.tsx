import React from "react"
import { useState, useEffect } from "react"
import { answer1, answer2 } from "./answerText"


const Quiz: React.FC = () => {

    const [input1, setInput1] = useState<string>("")
    const [input2, setInput2] = useState<string>("")

    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [resultText, setResultText] = useState<string>("Try the quiz")

    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput1(event.target.value)
    }

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput2(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        alert(isSuccess)
    }

    useEffect(() => {
        if (input1 === answer1 && input2 === answer2) {
            setIsSuccess(true)
            setResultText("CORRECT")
        } else {
            setIsSuccess(false)
            setResultText("INCORRECT")
        }
    }, [input1, input2])


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Input 1</label>
                <input type="text" value={input1} onChange={handleChange1} />
                <label>Input 2</label>
                <input type="text" value={input2} onChange={handleChange2} />
                <button type="submit">Submit</button>
            </form>
            <div>
                {resultText}
            </div>

        </div>
    )
}

export default Quiz