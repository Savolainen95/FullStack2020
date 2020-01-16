import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => {
    return (
        <h1>Give feedback</h1>
    )
}
const Statistic = (props) => {
    if (props.good + props.neutral + props.bad === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                No feedback given
           </div>
        )
    } else {
        return (
            <div>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <StatisticLine text='Good' value={props.good} />
                        <StatisticLine text='Neutral' value={props.neutral} />
                        <StatisticLine text='Bad' value={props.bad} />
                        <StatisticLine text='All' value={props.good + props.neutral + props.bad} />
                        <StatisticLine text='Average' value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
                        <StatisticLine text='Positive' value={props.good / (props.good + props.neutral + props.bad) * 100 + ' %'}/>
                    </tbody>
                </table>
            </div>
        )
    }
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}



const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const valueGood = () => setGood(good + 1)
    const valueNeutral = () => setNeutral(neutral + 1)
    const valueBad = () => setBad(bad + 1)

    return (
        <div>
            <Header />
            <Button text='good' onClick={valueGood} />
            <Button text='neutral' onClick={valueNeutral} />
            <Button text='bad' onClick={valueBad} />
            <Statistic good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)