import React, { Component } from 'react';

import {
    EuiPopover,
    EuiSpacer,
    EuiButtonIcon,
    EuiPopoverTitle,
    EuiButtonToggle,
} from '@elastic/eui';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopoverOpen: false,
            checked: true,
            toggleFirstNameOn: true,
            toggleLastNameOn: true,
            toggleBranchOn: true,
            toggleEmailOn: true
        };
    }

    onButtonClick = () => {
        // setIsPopoverOpen(isPopoverOpen => !isPopoverOpen)
        this.setState({
            isPopoverOpen: !this.state.isPopoverOpen
        });
    }

    closePopover = () => {
        // setIsPopoverOpen(false)
        this.setState({
            isPopoverOpen: false
        });
    }

    // Change Icon - eye/eyeClosed
    onChangeState = (value, set) => {
        this.setState({
            [set]: value
        })
    }

    // onChange = e => {
    //     this.setState({
    //         checked: e.target.checked
    //     });
    // }

    // onToggleFirstNameChange = e => {
    //     // setToggleValue(e.target.checked);
    //     this.setState({
    //         toggleFirstNameOn: e.target.checked
    //     });
    // }

    render() {
        const { isPopoverOpen, toggleFirstNameOn, toggleLastNameOn, toggleBranchOn, toggleEmailOn } = this.state;
        const { onToggleChange } = this.props;
        const button = (
            <EuiButtonIcon iconType="managementApp" iconSize="l" onClick={this.onButtonClick} />
        )
        return (
            <EuiPopover
                ownFocus
                button={button}
                isOpen={isPopoverOpen}
                closePopover={this.closePopover}
                anchorPosition="downRight"
                // initialFocus="[id=asdf2]"
                initialFocus=""
                style={{ float: 'right', marginRight: '20px' }}
            >
                <div style={{ width: '150px' }}>
                    <EuiPopoverTitle>MANAGE COLUMNS</EuiPopoverTitle>

                    <EuiButtonToggle
                        label="First Name"
                        iconType={toggleFirstNameOn ? 'eye' : 'eyeClosed'}
                        onChange={e => {
                            onToggleChange(e.target.checked, 'firstName')
                            this.onChangeState(e.target.checked, 'toggleFirstNameOn')
                        }}
                        isSelected={toggleFirstNameOn}
                        isEmpty
                    // isIconOnly
                    />

                    <EuiButtonToggle
                        label="Last Name"
                        iconType={toggleLastNameOn ? 'eye' : 'eyeClosed'}
                        onChange={e => {
                            onToggleChange(e.target.checked, 'lastName')
                            this.onChangeState(e.target.checked, 'toggleLastNameOn')
                        }}
                        isSelected={toggleLastNameOn}
                        isEmpty
                    />

                    <EuiButtonToggle
                        label="Branch"
                        iconType={toggleBranchOn ? 'eye' : 'eyeClosed'}
                        onChange={e => {
                            onToggleChange(e.target.checked, 'branch')
                            this.onChangeState(e.target.checked, 'toggleBranchOn')
                        }}
                        isSelected={toggleBranchOn}
                        isEmpty
                    />

                    <EuiButtonToggle
                        label="Email"
                        iconType={toggleEmailOn ? 'eye' : 'eyeClosed'}
                        onChange={e => {
                            onToggleChange(e.target.checked, 'email')
                            this.onChangeState(e.target.checked, 'toggleEmailOn')
                        }}
                        isSelected={toggleEmailOn}
                        isEmpty
                    />
                </div>
                <EuiSpacer />
            </EuiPopover>
        );
    }
}