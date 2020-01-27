import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = (props) => {
    console.log(props.course)
    return (
        <div>
            <h1>Web development curriculum</h1>
            {props.course.map(course =>
                <div key = {course.id}>
                    <Header header = {course.name}/>
                    <Content parts = {course.parts}/>
                    <Total parts= {course.parts} />
                </div>
                )}
        </div>
    )
}

export default Course