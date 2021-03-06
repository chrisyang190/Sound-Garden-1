import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const TransactionsTable = (props) => {
  return (
    <div className="balance-table">
      <Table fixedHeader={true}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{fontSize: '24', color: '#2E7D32', fontFamily: 'Roboto'}}>Transaction</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '24', color: '#2E7D32', fontFamily: 'Roboto'}}>Amount</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '24', color: '#2E7D32', fontFamily: 'Roboto'}}>Date</TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '24', color: '#2E7D32', fontFamily: 'Roboto'}}>Bank</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody 
          displayRowCheckbox={false}
        >
          {props.data.map((item, index) => {
            return (<TableRow>
              <TableRowColumn style={{fontSize: '18', color: '#000', fontFamily: 'Roboto'}}>{item.name}</TableRowColumn>
              <TableRowColumn style={{fontSize: '18', color: '#000', fontFamily: 'Roboto'}}>{'$' + Math.abs(item.amount).toFixed(2)}</TableRowColumn>
              <TableRowColumn style={{fontSize: '18', color: '#000', fontFamily: 'Roboto'}}>{item.date}</TableRowColumn>
              <TableRowColumn style={{fontSize: '18', color: '#000', fontFamily: 'Roboto'}}>{item.institution_name}</TableRowColumn>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    </div>);
};

export default TransactionsTable;
