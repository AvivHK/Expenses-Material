import React, { Component } from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { observer, inject } from "mobx-react";
import moment from "moment"
import 'moment/locale/he'

@inject("generalStore")
@observer
class TableRowCell extends Component {
    constructor() {
        super();
    }
    
    deleteTransaction = () => {
        this.props.generalStore.setRowToDelete(this.props.row)
        this.props.open(this.props.row.id)
    }



    render() {
        return (
            <TableRow key={this.props.row.name}>
                <TableCell >{this.props.row.name === "aviv" ? "אביב" : this.props.row.name === "chen" ? "חן" : "אביב וחן"}</TableCell>
                <TableCell component="th" scope="row"> {this.props.row.description} </TableCell>
                <TableCell >{this.props.row.price}</TableCell>
                <TableCell >{moment(this.props.row.date).locale('he').format("MMM Do YY")}</TableCell>
                <TableCell align="right" onClick={this.deleteTransaction}><i className="far fa-trash-alt"></i></TableCell>
            </TableRow>);
    }
}

export default TableRowCell;
