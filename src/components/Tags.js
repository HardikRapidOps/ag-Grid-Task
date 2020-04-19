import React, { useState, Fragment } from 'react';

import {
  EuiComboBox,
  EuiButton,
  EuiPopover,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSpacer,
} from '@elastic/eui';

import { euiPaletteColorBlindBehindText } from '@elastic/eui/lib/services';

const visColorsBehindText = euiPaletteColorBlindBehindText();

const options = [
  {
    label: 'Titan',
    'data-test-subj': 'titanOption',
    color: visColorsBehindText[0]
  },
  {
    label: 'Enceladus',
    color: visColorsBehindText[1]
  },
  {
    label: 'Mimas',
    color: visColorsBehindText[2]
  },
  {
    label: 'Dione',
    color: visColorsBehindText[3]
  },
  {
    label: 'Iapetus',
    color: visColorsBehindText[4]
  },
  {
    label: 'Phoebe',
    color: visColorsBehindText[5]
  },
  {
    label: 'Rhea',
    color: visColorsBehindText[6]
  },
  {
    label:
      "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    color: visColorsBehindText[7]
  },
  {
    label: 'Tethys',
    color: visColorsBehindText[8]
  },
  {
    label: 'Hyperion',
    color: visColorsBehindText[9]
  },
];

export default () => {
  const [selectedOptions, setSelected] = useState([options[2], options[4]]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPopoverOpen, setPopover] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const togglePopover = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const onChange = selectedOptions => {
    setSelected(selectedOptions);
  };

  const onCreateOption = (searchValue, flattenedOptions = []) => {
    if (!searchValue) {
      return;
    }

    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        option => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      options.push(newOption);
    }

    // Select the option.
    setSelected([...selectedOptions, newOption]);
  };

  const comboBox = (
    <EuiComboBox
      placeholder="Select or create options"
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
      onCreateOption={onCreateOption}
    />
  );

  const button = (
    <EuiButton iconType="arrowDown" iconSide="right" onClick={togglePopover}>
      Open popover
    </EuiButton>
  );

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiOverlayMask>
        <EuiModal onClose={closeModal} style={{ width: '800px' }}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Combo box in a modal</EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>{comboBox}</EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    );
  }

  return (
    <Fragment>
      <EuiFormRow
        // label="Combo box"
        // helpText="This combo box is inside of a form row"
      >
        {comboBox}
      </EuiFormRow>

      <EuiSpacer />

      <EuiPopover
        id="popover"
        ownFocus
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <div style={{ width: '300px' }}>{comboBox}</div>
      </EuiPopover>

      {/* <EuiSpacer size="m" /> */}

      <EuiButton onClick={showModal}>Show modal</EuiButton>

      {modal}
    </Fragment>
  );
};