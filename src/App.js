import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "First Name", field: "firstName" },
        { headerName: "Last Name", field: "lastName" },
        { headerName: "Branch", field: "branch" },
        { headerName: "Email", field: "email" },
        { headerName: "Contact", field: "contact" }
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
        editable: true
      } 
    };
  }

  onFilterTextBoxChanged = () => {
    this.gridApi.setQuickFilter(document.getElementById('filter-text-box').value);
  }

  render() {
    return (
      <div style={{ height: '50vh', width: '100%' }} className="ag-theme-balham">
        <input type="text" id="filter-text-box" placeholder="Filter Tables" onInput={this.onFilterTextBoxChanged}></input>
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          rowSelection="multiple"
          defaultColDef={this.state.defaultColDef}
          pagination={true}
          paginationPageSize={10}
          onGridReady={params => this.gridApi = params.api}
        >

        </AgGridReact>
      </div>
    );
  }
}

export default App;
