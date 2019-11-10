import React from 'react';

export const Total = ({ parts }) => {
    let total = parts.reduce((ac, e) => {
        ac = (typeof ac == 'object') ? ac.exercises : ac;
        return ac + e.exercises
    });
    return (
        <p style={{ fontWeight: "bold" }}>Number of exercises {total}</p>
    );
}
