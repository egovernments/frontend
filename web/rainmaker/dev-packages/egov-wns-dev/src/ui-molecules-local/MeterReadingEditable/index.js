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
                        <Grid container style={{ marginBottom: 12 }}>
                            <Grid item xs={3}>
                                <Label
                                    labelKey="WS_CONSUMPTION_DETAILS_BILLING_PERIOD_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <SelectField
                                    autoWidth={true}
                                    className="pt-action-dropDown"
                                    hintText={<Label label="PT_SELECT_ACTION" />}
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
                        <Grid container style={{ marginBottom: 12 }}>
                            <Grid item xs={3}>
                                <Label
                                    labelName="Meter Status"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <SelectField
                                    autoWidth={true}
                                    className="pt-action-dropDown"
                                    hintText={<Label label="PT_SELECT_ACTION" />}
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
                        <Grid container style={{ marginBottom: 12 }}>
                            <Grid item xs={3}>
                                <Label
                                    labelName="WS_SERV_DETAIL_LAST_METER_READ"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="order"
                                    label="Order No."
                                    placeholder="Enter Remarks"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 12 }}>
                            <Grid item xs={3}>
                                <Label
                                    labelName="Address"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                {/* <Col xs={12} md={6}> */}
                                <DatePicker
                                    hintText="From Date"
                                    floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                    underlineStyle={styles.underlineStyle}
                                    underlineFocusStyle={styles.underlineFocusStyle}
                                    style={styles.topGap}
                                />
                                {/* </Col> */}
                                {/* <DatePicker
                                    onChange={(first, object) => {
                                        let e = { target: { value: object } };
                                        handleFieldChange("receiptDate", e.target.value);
                                    }}
                                    formatDate={(date) => changeDateToFormat(date)}
                                    textFieldStyle={{ cursor: "pointer" }}
                                    {...fields.receiptDate}
                                /> */}
                                {/* <div className="datepicker-icon" onClick={(e) => e.preventDefault}>
                                    <Icon action="action" name="date-range" />
                                </div> */}
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 12 }}>
                            <Grid item xs={3}>
                                <Label
                                    labelName="Status"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Label
                                    labelName="Active"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(MeterReading);
