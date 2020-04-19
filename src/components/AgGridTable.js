import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import '@elastic/eui/dist/eui_theme_light.css';
import Pagination from './Pagination';
import Filter from './Filter';
import DeleteAction from './DeleteAction';
import Tags from './Tags';
import Show_Hide from './Show_Hide';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleFirstNameOn: true,
            toggleLastNameOn: true,
            toggleBranchOn: true,
            toggleEmailOn: true,
            paginationPageSize: 8,
            pageCount: 10,
            // activePage: 0,
            columnDefs: [
                { headerName: "First Name", field: "firstName" },
                { headerName: "Last Name", field: "lastName" },
                { headerName: "Branch", field: "branch" },
                { headerName: "Email", field: "email" },
                { headerName: "Contact", field: "contact" },
                {
                    headerName: "Tags",
                    field: "tags",
                    cellRendererFramework: function (params) {
                        return <Tags />
                    },
                    width: 400
                },
                {
                    headerName: "Actions",
                    field: "actions",
                    cellRendererFramework: () => {
                        // return '<i class="material-icons">edit delete</i>'
                        return <DeleteAction onRemoveSelected={this.onRemoveSelected} />
                    }
                }
            ],
            rowData: [
                { firstName: "Hardik", lastName: "Motwani", branch: "IT", contact: 8488866756, email: "hardik.motwani@rapidops.com" },
                { firstName: "Meet", lastName: "Shah", branch: "CS", contact: 7982124770, email: "meet.shah@rapidops.com" },
                { firstName: "Darshan", lastName: "Raval", branch: "IT", contact: 9870912667, email: "darshan.raval@gmail.com" },
                { firstName: "Dhairya", lastName: "Shah", branch: "CS", contact: 8460556732, email: "shahdhairya@gmail.com" },
                { firstName: "Jeenal", lastName: "Patel", branch: "CS", contact: 8901265437, email: "jeenalpatel@gmail.com" },
                { firstName: "Alia", lastName: "Bhatt", branch: "IT", contact: 8460123456, email: "alia.bhatt@rapidops.com" },
                { firstName: "Vaibhav", lastName: "Kabira", branch: "IT", contact: 9876512344, email: "kabira.vaibhav@gmail.com" },
                { firstName: "Ananya", lastName: "Pandey", branch: "CS", contact: 8488898765, email: "ananya.pandey@gmail.com" },
                { firstName: "Joe", lastName: "Dawson", branch: "CS", contact: 9988666756, email: "joe.dawson@gmail.com" },
                { firstName: "Kane", lastName: "Williamson", branch: "IT", contact: 9867542310, email: "kanewilliamson@gmail.com" }
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
                resizable: true,
                editable: true,
                // width:150,
                // height:150,
                // colResizeDefault:'shift',
                // rowHeight: 600,
                // autoHeight: true
            },
            // colResizeDefault: 'shift'
        };
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        // console.log('Grid is ready');
        this.setState({
            pageCount: this.gridApi.paginationGetTotalPages(),
        })
    }

    sizeColumnsToFit = () => {
        this.gridApi.sizeColumnsToFit();
    };

    onFilterTextBoxChanged = () => {
        this.gridApi.setQuickFilter(document.getElementById('filter-text-box').value);
    }

    onToggleChange = (value, col, set) => {
        this.setState({
            [set]: value
        })
        this.columnApi.setColumnVisible(col, value);
        this.sizeColumnsToFit();
    }

    // onToggleFirstNameChange = e => {
    //     // setToggleValue(e.target.checked);
    //     this.setState({
    //         toggleFirstNameOn: e.target.checked
    //     });
    //     console.log('checked', e.target.checked);

    //     if (e.target.checked) {
    //         this.columnApi.setColumnVisible('firstName', true);
    //     } else {
    //         this.columnApi.setColumnVisible('firstName', false);
    //     }
    // }

    updatePopover = e => {
        this.setState({
            toggleFirstNameOn: this.columnApi.getColumn('firstName').visible,
            toggleLastNameOn: this.columnApi.getColumn('lastName').visible,
            toggleBranchOn: this.columnApi.getColumn('branch').visible,
            toggleEmailOn: this.columnApi.getColumn('email').visible
        })
        this.sizeColumnsToFit();
    }

    onRemoveSelected = () => {
        const selectedData = this.gridApi.getSelectedRows();
        this.gridApi.updateRowData({ remove: selectedData });
    }

    onPaginationChanged = (size, activePage) => {
        if (this.gridApi) {
            this.gridApi.paginationSetPageSize(size);
            this.gridApi.paginationGoToPage(activePage);
            this.setState({
                pageCount: this.gridApi.paginationGetTotalPages(),
            });
        }
    }

    render() {
        const { columnDefs, rowData, defaultColDef, paginationPageSize, pageCount, activePage } = this.state;

        return (
            <div className="ag-theme-balham" style={{ width: '100%' }}>
                {/* height: '50vh', */}
                <Filter onFilterTextBoxChanged={this.onFilterTextBoxChanged} />
                <Show_Hide onToggleChange={this.onToggleChange} />
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    rowSelection="multiple"
                    defaultColDef={defaultColDef}
                    onGridReady={this.onGridReady}
                    onFirstDataRendered={this.sizeColumnsToFit}
                    animateRows // animateRows="true"
                    onDragStopped={this.updatePopover}
                    // onPaginationChanged={this.onPaginationChanged}
                    pagination={true}
                    // paginationPageSize={5}
                    paginationPageSize={paginationPageSize}
                    domLayout='autoHeight'
                >
                </AgGridReact>
                <Pagination
                    callbackPagination={this.onPaginationChanged}
                    pageCount={pageCount}
                    paginationPageSize={paginationPageSize}
                // activePage={activePage}
                />
            </div>
        );
    }
}
