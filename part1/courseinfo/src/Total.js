import React from 'react';

export const Total = (props) => {
    let total = 0;
    props.parts.forEach(e => { total += e.exercises })
    return (
        <p>Number of exercises {total}</p>
    );
}
