import React from 'react';

const Filter = ({ filter, onChange }) => (
    <div>
        Filter shown with <input value={filter} onChange={onChange} />
    </div>
);

export default Filter;
