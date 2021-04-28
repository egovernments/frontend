


import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    cell: {
        padding: '4px 10px'
    }
});

function ArrearTable(props) {
    const { classes, headers = [], values = [] } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {headers.map((header, ind) => {
                            if (ind == 0) {
                                return (<TableCell className={classes.cell} key={ind} ><LabelContainer
                                    labelName={header}
                                    labelKey={header}
                                /></TableCell>)
                            }

                            else {
                                return (<TableCell className={classes.cell} key={ind} numeric><LabelContainer
                                    labelName={header}
                                    labelKey={header}
                                /></TableCell>)
                            }
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {values.map((row, ind) => (
                        <TableRow key={ind}>
                            {row.map((value, i) => {
                                if (i == 0) {
                                    return (<TableCell className={classes.cell} key={i} component="th" scope="row">{value}</TableCell>)
                                }
                                else {
                                    return (<TableCell className={classes.cell} key={i} numeric>{value}</TableCell>)
                                }
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

ArrearTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArrearTable);