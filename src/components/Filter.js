import React from 'react';

// import { EuiIcon } from '@elastic/eui';

export default (props) => {
    const { onFilterTextBoxChanged } = props;
    return (
        <>
            {/* <EuiIcon type="search" /> */}
            <input style={{ margin: '10px' }} type="text" id="filter-text-box" placeholder="Filter Tables" onInput={onFilterTextBoxChanged}></input>
        </>
    );
};
