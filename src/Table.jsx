import React from 'react';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Table, Dialog, useMediaQuery } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { observer, inject } from 'mobx-react';
import TableRowCell from "./Components/TableRowCell"
import { useTheme } from '@material-ui/core/styles';
import moment from "moment"

const SimpleTable = inject("generalStore")(
    observer((props) => {
        const theme = useTheme();
        const [openDialog, setOpenDialog] = React.useState(false);

        const handleClickOpenDialog = () => {
            setOpenDialog(true);
        };

        const handleCloseDialog = () => {
            setOpenDialog(false);
        };

        const okToDelete = () => {
            props.generalStore.deleteTransaction()
            setOpenDialog(false);
        }

        { console.log(props.generalStore.rowToDelete) }
        const row = props.generalStore.rowToDelete
        return (
            <TableContainer padding="none" component={Paper}>
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">{"את/ה בטוח שברצונך למחוק את העסקה הזו?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {row ? row.name === "aviv" ? "אביב " : row.name === "chen" ? "חן " : "אביב וחן " : null}
                            <br />
                            {row ? row.description : null}
                            <br />
                            {row ? "בסכום " + row.price + ' ש"ח' : null}
                            <br />
                            {row ? "בתאריך " + moment(row.date).format("DD/MM/YYYY בשעה HH:mm") : null}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleCloseDialog} color="primary">
                            לא, להשאיר את העסקה
                        </Button>
                        <Button onClick={okToDelete} color="primary" autoFocus>
                            כן, למחוק את העסקה
                        </Button>
                    </DialogActions>
                </Dialog>
                <Table mp={0} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>מבצע</TableCell>
                            <TableCell>פירוט</TableCell>
                            <TableCell>סכום</TableCell>
                            <TableCell>תאריך</TableCell>
                            <TableCell align="right">מחיקה</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row, key) => (
                            <TableRowCell key={key} open={handleClickOpenDialog} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    })
)
export default SimpleTable;
