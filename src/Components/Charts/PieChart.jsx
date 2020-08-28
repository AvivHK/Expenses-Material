import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, ArgumentAxis, ValueAxis, BarSeries, Title, Legend } from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { inject, observer } from 'mobx-react';

const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});

const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);

const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
    label: {
        whiteSpace: 'nowrap',
    },
});

const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

@observer
@inject("generalStore")
class Demo extends React.PureComponent {


    render() {
        const chartData = this.props.generalStore.dataToChart;
        console.log(this.props.generalStore.dataToChart)

        return (
            <Paper>
                <Chart
                    data={chartData}>
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries
                        name="אביב"
                        valueField="aviv"
                        argumentField="costType"
                        color="#ffd700" />
                    <BarSeries
                        name="חן"
                        valueField="chen"
                        argumentField="costType"
                        color="#c0c0c0" />
                    <BarSeries
                        name="חן ואביב"
                        valueField="avivChen"
                        argumentField="costType"
                        color="#cd7f32" />
                    <Animation />
                    <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                    <Title text="" />
                    <Stack />
                </Chart>
            </Paper>
        );
    }
}

export default Demo
