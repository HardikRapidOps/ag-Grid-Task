import React, { Component } from 'react';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiPagination,
  EuiPopover,
} from '@elastic/eui';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false,
      activePage: 0,
      pageSize: this.props.paginationPageSize,
      // pageSize: 10
    };
  }

  onButtonClick = () => {
    // setIsPopoverOpen(isPopoverOpen => !isPopoverOpen)
    const { isPopoverOpen } = this.state;
    this.setState({
      isPopoverOpen: !isPopoverOpen
    })
  }

  closePopover = () => {
    // setIsPopoverOpen(false)
    this.setState({
      isPopoverOpen: false
    })
  }

  goToPage = pageNumber => {
    // setActivePage(pageNumber)
    // const { pageSize, activePage } = this.state;
    const { callbackPagination } = this.props;
    this.setState({
      activePage: pageNumber
    }, () => {
      callbackPagination(this.state.pageSize, this.state.activePage)
    })
  }

  setPageSize = (size) => {
    // const { pageSize, activePage } = this.state;
    const { callbackPagination } = this.props;
    this.setState({
      pageSize: size
    }, () => {
      callbackPagination(this.state.pageSize, this.state.activePage)
    })
  }

  render() {
    const { isPopoverOpen, activePage, pageSize } = this.state;
    const { pageCount } = this.props;

    const button = (
      <EuiButtonEmpty
        size="s"
        color="text"
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick}>
        Rows per page: {pageSize}
      </EuiButtonEmpty>
    );

    const items = [
      <EuiContextMenuItem
        key="3 rows"
        icon="empty"
        onClick={() => {
          this.closePopover();
          this.setPageSize(3);
          // window.alert('10 rows');
        }}>
        3 rows
      </EuiContextMenuItem>,
      <EuiContextMenuItem
        key="5 rows"
        icon="empty"
        onClick={() => {
          this.closePopover();
          this.setPageSize(5);
          // window.alert('20 rows');
        }}>
        5 rows
      </EuiContextMenuItem>,
      <EuiContextMenuItem
        key="8 rows"
        // icon="check"
        icon="empty"
        onClick={() => {
          this.closePopover();
          this.setPageSize(8);
          // window.alert('50 rows');
        }}>
        8 rows
      </EuiContextMenuItem>,
      <EuiContextMenuItem
        key="10 rows"
        icon="empty"
        onClick={() => {
          this.closePopover();
          this.setPageSize(10);
          // window.alert('100 rows');
        }}>
        10 rows
      </EuiContextMenuItem>,
    ];

    return (
      <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
        <EuiFlexItem grow={false}>
          <EuiPopover
            button={button}
            isOpen={isPopoverOpen}
            closePopover={this.closePopover}
            panelPaddingSize="none">
            <EuiContextMenuPanel items={items} />
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPagination
            pageCount={pageCount}
            activePage={activePage}
            onPageClick={activePage => this.goToPage(activePage)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
};
