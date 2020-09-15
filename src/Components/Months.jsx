import React, { Component } from "react";
import { TableContainer, Table, TableCell, TableHead, TableRow, TableBody, TableFooter, TablePagination } from '@material-ui/core';
import { inject } from "mobx-react";
import TablePaginationActions from "./TablePaginationActions"

@inject("generalStore")
class Months extends Component {
    constructor() {
        super();
        this.state = {
            rowsPerPage: 5,
            page: 0,
            emptyRows: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            emptyRows: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.props.generalStore.months.length - this.state.page * this.state.rowsPerPage)
        })
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        })
    };


    render() {
        let rows = this.props.generalStore.months
        console.log(this.state.emptyRows)
        return (
            <TableContainer>
                <Table aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>שנה</TableCell>
                            <TableCell>חודש</TableCell>
                            <TableCell>הוצאות קבועות</TableCell>
                            <TableCell>הוצאות משתנות</TableCell>
                            <TableCell>סה"כ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(this.state.rowsPerPage > 0 ? rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage) : rows).map((month) => (
                            <TableRow key={month.month + month.year}>
                                <TableCell onClick={this.handleNextButtonClick}>{month.year}</TableCell>
                                <TableCell onClick={this.handleBackButtonClick}>{month.month}</TableCell>
                                <TableCell onClick={this.handleLastPageButtonClick}>{month.fixed}</TableCell>
                                <TableCell onClick={this.handleFirstPageButtonClick}>{month.var}</TableCell>
                                <TableCell>{month.total}</TableCell>
                            </TableRow>
                        ))}
                        {this.state.emptyRows > 0 && (
                            <TableRow style={{ height: 53 * this.state.emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination style={{ overflow: "visible" }}
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: rows.length }]}
                                colSpan={3}
                                count={this.props.generalStore.months.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                labelRowsPerPage="שורות בעמוד:"
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        )
    }
}

export default Months;
