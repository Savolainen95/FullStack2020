import React from 'react'
import Part from './Part.js'

const Content = (props) => {
    return (
        <div>
                {props.parts.map( part =>
                    <div key = {part.id}>
                        <Part name = {part.name} exercises={part.exercises}/>
                    </div>                
                )}
        </div>
    )
}

export default Content