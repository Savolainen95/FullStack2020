import React from 'react'

const Total = (props) => {
    const array = props.parts.map(x => x.exercises)
    var total = array.reduce((a, b) => a + b, 0)
    return (
        <div>
            <h3>total of {total} exercises</h3>
        </div>
    )
}

export default Total