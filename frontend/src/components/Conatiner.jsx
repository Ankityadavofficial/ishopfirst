import React from 'react'

export default function Conatiner(props) {
    return (
        <div className={`max-w-[1200px] mx-auto  ${props.className}`}>
            {props.children}
        </div>
    )
}
