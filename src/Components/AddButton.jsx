import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Dialog, ButtonGroup, Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener, ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';


const options = ["איפוס חודש", "הוספת הוצאה"];

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(-1),
    },
}));

const SplitButton = inject("generalStore")(
    observer((props) => {

        const [openDialog, setOpenDialog] = React.useState(false);
        const handleClickOpenDialog = () => {
            setOpenDialog(true);
        };

        const handleCloseDialog = () => {
            setOpenDialog(false);
        };

        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(1);
        const classes = useStyles();

        const handleClick = () => {
            if (selectedIndex === 1) {
                handleClickOpenDialog()
            }
            else if (selectedIndex === 0) {
                return <Dialog />

            }

        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };

        return (
            <Grid container direction="column" alignItems="center">
                <Grid item xs={12}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef}>
                        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                        <Button

                            color="primary"
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu">
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Grid>
                {console.log(openDialog)}
                <Dialog fullScreen open={openDialog} >
                    <Box mt={0}>
                        <AppBar dir="rtl" position="static">
                            <Toolbar>
                                <Grid item xs onClick={handleCloseDialog}>
                                    <IconButton edge="start" color="inherit" aria-label="close">
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={8}>
                                    <Box mr={4}>
                                        <Typography variant="h6">
                                            הוספת הוצאה:
                                    </Typography>
                                    </Box>
                                </Grid>
                                <Grid onClick={handleCloseDialog} item xs>
                                    <Button size="large" color="inherit">
                                        <Grid spacing={10} item xs={8}>
                                            <SaveIcon style={{ fontSize: 20 }} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography>שמור</Typography>
                                        </Grid>
                                    </Button>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List>
                </Dialog>

            </Grid >
        )
    })
) 

export default SplitButton;
