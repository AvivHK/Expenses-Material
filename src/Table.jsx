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
            <TableContainer padding="none" component={Paper}>
                <Table mp={0}  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell  >מבצע</TableCell>
                            <TableCell >פירוט</TableCell>
                            <TableCell >סכום</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell >{row.name === "aviv" ? "אביב" : row.name === "chen" ? "חן" : "אביב וחן"}</TableCell>
                                <TableCell  component="th" scope="row"> {row.description} </TableCell>
                                <TableCell >{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    })
)
export default SimpleTable;
