import React from "react"
import { useState, useEffect, useMemo } from "react"
import { answer1, answer2 } from "./answerText"

interface inputIterable {
    key: string;
    input: string;
}

const Quiz: React.FC = () => {

    const [input1, setInput1] = useState<string>("")
    const [input2, setInput2] = useState<string>("")

    const [checked, setChecked] = useState<boolean>(false)

    const [message, setMessage] = useState<string>("Try the quiz")

    const handleInput1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput1(event.target.value)
    }
    const handleInput2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput2(event.target.value)
    }
    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        alert(`${input1} ${input2} ${checked}`)
    }

    useEffect(() => {

        if (input1 === answer1 && input2 === answer2) {
            setMessage("CORRECT")
        } else {
            setMessage("INCORRECT")
        }
    }, [input1, input2])


    const inputs = useMemo<inputIterable[]>(() => {
        return [{ key: "1", input: input1 }, { key: "2", input: input2 }]
    }, [input1, input2])

    return (
        <div>
            <h1>Test Area</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="mr-10">Input 1</label>
                    <input type="text" value={input1} onChange={handleInput1} />
                </div>
                <div>
                    <label className="mr-10">Input 2</label>
                    <input type="text" value={input2} onChange={handleInput2} />
                </div>
                <div>
                    <label className="mr-10">True or False?</label>
                    <input type="checkbox" checked={checked} onChange={handleChecked} />
                </div>
                <button type="submit">Submit</button>
            </form>
            <h1>{message}</h1>
            <br></br>
            <br></br>
            {inputs.map(item => <div key={item.key}>{item.input}</div>)}
        </div>
    )
}

export default Quiz