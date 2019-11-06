import React from 'react'

import { Part } from './Part';

export const Content = (props) => (
    <div>
        <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
        <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
        <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
);