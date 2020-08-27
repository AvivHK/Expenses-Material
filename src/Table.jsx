import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { observer, inject } from 'mobx-react';


const SimpleTable = inject("generalStore")(
    observer((props) => {

        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">פירוט</TableCell>
                            <TableCell align="right">סכום</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="right" component="th" scope="row"> {row.name} </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    })
)
export default SimpleTable;
