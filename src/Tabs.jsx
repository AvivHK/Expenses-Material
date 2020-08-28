import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Table from "./Table"
import { Box } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import moment from 'moment';


function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 0 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
});

@inject("generalStore")
@observer
class FullWidthTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="הוצאות קבועות" />
                        <Tab label="הוצאות משתנות" />
                        <Tab label="סטטיסטיקה" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>
                        <Box mt={3}>
                            <Table rows={this.props.generalStore.transactions.filter(t => t.costType === 'a').sort((a, b) => moment(b.date).diff(moment(a.date).format()))} />
                        </Box>
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <Box mt={3}>
                            <Table rows={this.props.generalStore.transactions.filter(t => t.costType === 'b').sort((a, b) => moment(b.date).diff(moment(a.date).format()))} />
                        </Box>
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <Box mt={3}>
                        </Box>
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);