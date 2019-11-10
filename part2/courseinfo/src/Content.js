import React from 'react'

import { Part } from './Part';

export const Content = ({parts}) => (
    <div>
        {parts.map((part) => {
            return <Part key={part.id} part={part.name} exercise={part.exercises} />
        })}
    </div>
);