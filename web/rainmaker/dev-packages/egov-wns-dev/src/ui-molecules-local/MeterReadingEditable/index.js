import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Label from "../../ui-containers-local/LabelContainer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import SelectField from "material-ui/SelectField";
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import LabelContainer from "egov-ui-framework/ui-containers/LabelContainer";

const styles = {
    card: {
        marginLeft: 8,
        marginRight: 8,
        borderRadius: "inherit"
    }
};

// onCardClick = () => {
// switch (item.status) {
//   case "INITIATED":
//     return `/tradelicense-citizen/apply?applicationNumber=${item.applicationNumber}&tenantId=${item.tenantId}`;
//   default:
//     return `/tradelicence/search-preview?applicationNumber=${item.applicationNumber}&tenantId=${item.tenantId}`;
// }
// };
// onCardClick = () => {

// }

class MeterReading extends React.Component {
    render() {
        const { classes } = this.props;
        console.log(this.props)
        return (
            <Card className={classes.card}>
                <CardContent>
                    <div>
                        <Grid container >
                            <Grid item xs={12} sm={3}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_BILLING_PERIOD_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                        
                                <Label
                                    labelName="Q4-2018-19"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={12} sm={3} style={{ paddingTop: '20px' }}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_METER_STATUS_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <SelectField
                                    className="pt-action-dropDown"
                                    hintText={<LabelContainer labelKey="WS_CONSUMPTION_DETAILS_METER_STATUS_PLACEHOLDER" />}
                                    underlineStyle={styles.underlineStyle}
                                    iconStyle={styles.iconStyle}
                                    style={styles.customWidth}
                                    hintStyle={styles.hintStyle}
                                    onChange={(event, key, payload) =>
                                        onSelectFieldChange(event, key, payload, history, item)
                                    }
                                ></SelectField>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={12} sm={3}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_LAST_READING_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Label
                                    labelName="75"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container >
                            <Grid item xs={12} sm={3} style={{ paddingTop: '20px' }}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_CURRENT_READING_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    hintText={<LabelContainer labelKey="WS_CONSUMPTION_DETAILS_CURRENT_READING_PLACEHOLDER" />}
                                    style={styles.customWidth}
                                    hintStyle={styles.hintStyle}
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}

                                />

                            </Grid>

                        </Grid>
                        <Grid container >
                            <Grid item xs={12} sm={3} style={{ paddingTop: '20px' }}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    id="date"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={12} sm={3} style={{ paddingTop: '20px' }}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_CONSUMPTION_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} style={{ paddingTop: '20px' }}>
                                <Label
                                    labelName="25"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item xs={12} sm={3}>
                            </Grid>
                            <Grid item xs={12} sm={3} style={{ paddingTop: '20px' }}>
                                <Button variant="outlined" style={{ width: "50%" }} color="primary" className={classes.button}>
                                    <LabelContainer
                                        labelKey="WS_COMMON_BUTTON_SAVE"
                                        fontSize={14}
                                    // style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(MeterReading);
