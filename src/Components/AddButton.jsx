import React from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Select, InputLabel, Input, FormControl, InputAdornment, FormControlLabel, RadioGroup, Radio, Box, Button, Dialog, ButtonGroup, Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography, Container } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import moment from 'moment';



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
            setSelectedValueRadio("")
            setSelectedPrice(0)
            setSelectedDescription("")
            setSelectedCategory("")
            setSelectedDate(moment().format("YYYY-MM-DDTHH:mm"))
            setOpenDialog(true);
        };

        const handleCloseDialog = () => {
            setOpenDialog(false);
            console.log(selectedPrice)
        };

        const saveButtonPressed = () => {
            props.generalStore.saveButtonPressed(selectedCostsType, selectedValueRadio, selectedDescription, selectedPrice, selectedCategory, selectedDate)
            handleCloseDialog()
        };

        const [open, setOpen] = React.useState();
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(1);
        const classes = useStyles();
        const [selectedCostsType, setSelectedCostsType] = React.useState('');
        const [selectedValueRadio, setSelectedValueRadio] = React.useState('');
        const [selectedDescription, setSelectedDescription] = React.useState('');
        const [selectedPrice, setSelectedPrice] = React.useState(0);
        const [selectedCategory, setSelectedCategory] = React.useState("");
        const [selectedDate, setSelectedDate] = React.useState(moment().format("YYYY-MM-DDTHH:mm"));


        const handleChangeDescription = async event => {
            await setSelectedDescription(event.target.value)
        }
        const handleChangeDate = async event => {
            await setSelectedDate(event.target.value)
        }

        const handleChangeCategory = async event => {
            await setSelectedCategory(event.target.value)
        }

        const handleChangePrice = async event => {
            await setSelectedPrice(event.target.value)
        }

        const handleChangeRadio = async (event) => {
            await setSelectedValueRadio(event.target.value);
        };

        const handleChangeCostsType = async (event) => {
            await setSelectedCostsType(event.target.value);
        };

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
        console.log(moment().format("YYYY-MM-DDTHH-mm"))
        return (
            <Grid container direction="column" alignItems="center">
                <Grid item xs={12}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef}>
                        <Button fullWidth onClick={handleClick}>{options[selectedIndex]}</Button>
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
                                <Grid onClick={saveButtonPressed} item xs>
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
                            <Container>
                                <RadioGroup row aria-label="position" name="position">
                                    <Grid item xs={6.5}>
                                        <FormControlLabel
                                            control={<Radio checked={selectedCostsType === 'a'}
                                                value="a" onChange={handleChangeCostsType} color="primary" />}
                                            labelPlacement="end"
                                            label="הוצאות קבועות" />
                                    </Grid>
                                    <Grid item xs={6.5}>
                                        <FormControlLabel
                                            control={<Radio checked={selectedCostsType === 'b'}
                                                value="b" onChange={handleChangeCostsType} color="primary" />} 
                                            label="הוצאות משתנות"
                                            labelPlacement="end"
                                        />
                                    </Grid>
                                </RadioGroup>
                            </Container>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <Container>
                                <RadioGroup row aria-label="position" name="position">
                                    <Grid item xs={3}>
                                        <Box mt={1}>
                                            <Typography> הבזבזן: </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControlLabel
                                            control={<Radio checked={selectedValueRadio === 'aviv'}
                                                value="aviv" onChange={handleChangeRadio} color="primary" />}
                                            labelPlacement="end"
                                            label="אביב" />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControlLabel
                                            control={<Radio checked={selectedValueRadio === 'chen'}
                                                value="chen" onChange={handleChangeRadio} color="primary" />}
                                            label="חן"
                                            labelPlacement="end"
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControlLabel
                                            control={<Radio checked={selectedValueRadio === 'avivChen'}
                                                value="avivChen" onChange={handleChangeRadio} color="primary" />}
                                            label="חן ואביב"
                                            labelPlacement="end"
                                        />
                                    </Grid>
                                </RadioGroup>
                            </Container>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <TextField fullWidth
                                label="פירוט"
                                value={selectedDescription}
                                onChange={handleChangeDescription}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <FormControl
                                fullWidth className={classes.margin}>
                                <InputLabel htmlFor="standard-adornment-amount">סכום:</InputLabel>
                                <Input
                                    value={selectedPrice}
                                    onChange={handleChangePrice}
                                    startAdornment={<InputAdornment position="start">₪</InputAdornment>}
                                />
                            </FormControl>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <FormControl fullWidth>
                                <InputLabel>קטגוריה</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    value={selectedCategory}
                                    onChange={handleChangeCategory}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "left"
                                        },
                                        transformOrigin: {
                                            vertical: "top",
                                            horizontal: "left"
                                        },
                                        getContentAnchorEl: null
                                    }}
                                >
                                    <MenuItem value={10}>מצרכים</MenuItem>
                                    <MenuItem value={20}>מסעדות ואלכוהול</MenuItem>
                                    <MenuItem value={30}>בגדים</MenuItem>
                                    <MenuItem value={40}>הזמנות מהאינטרנט</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <TextField fullWidth
                                id="datetime-local"
                                label="תאריך ושעה"
                                type="datetime-local"
                                value={selectedDate}
                                onChange={handleChangeDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <Typography variant="h5" gutterBottom>סכום שנשאר להחודש: {props.generalStore.amountLeft}</Typography>
                        </ListItem>
                        <Divider />
                    </List>
                </Dialog >
            </Grid >
        )
    })
)

export default SplitButton;
