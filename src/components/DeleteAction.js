import React from 'react';

import { EuiButtonIcon } from '@elastic/eui';

export default (props) => {
    const { onRemoveSelected } = props;
    return (
        <>
            {/* <EuiButtonIcon iconType="eye" onClick={() => window.alert('clicked')} /> */}
            <EuiButtonIcon iconType="pencil" onClick={() => window.alert('clicked')} />
            <EuiButtonIcon iconType="trash" onClick={onRemoveSelected} />
            {/* const selectedRows = params.api.getSelectedNodes();const selectedRow = selectedRows[0];console.log(selected) */}
        </>
    );
};
