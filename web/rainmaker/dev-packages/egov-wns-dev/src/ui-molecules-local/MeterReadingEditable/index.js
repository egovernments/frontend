import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Label from "../../ui-containers-local/LabelContainer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import SelectField from "material-ui/SelectField";
import DatePicker from 'material-ui/DatePicker';
import TextField from "@material-ui/core/TextField";
import { LabelContainer } from "egov-ui-framework/ui-containers";
import ListItem from '@material-ui/core/ListItem';
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
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_BILLING_PERIOD_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Label
                                    labelName="Q4-2018-19"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 12 }}>
                            <Grid item xs={3}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_METER_STATUS_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <ListItem
                                    autoWidth={true}
                                    // className="pt-action-dropDown"
                                    placeholder="WS_SELECT_METER_STATUS_PLACEHOLDER"
                                    // hintText={<Label label="PT_SELECT_ACTION" />}
                                    underlineStyle={styles.underlineStyle}
                                    iconStyle={styles.iconStyle}
                                    style={styles.customWidth}
                                    hintStyle={styles.hintStyle}
                                    onChange={(event, key, payload) =>
                                        onSelectFieldChange(event, key, payload, history, item)
                                    }
                                ></ListItem>
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 12 }}>
                            <Grid item xs={3}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_LAST_READING_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Label
                                    labelName="75"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 12 }}>
                            <Grid item xs={3}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_CURRENT_READING_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    placeholder="WS_CONSUMPTION_DETAILS_CURRENT_READING_PLACEHOLDER"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 12 }}>
                            <Grid item xs={3}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <DatePicker
                                    labelName="Active"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 12 }}>
                            <Grid item xs={3}>
                                <LabelContainer
                                    labelKey="WS_CONSUMPTION_DETAILS_CONSUMPTION_LABEL"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Label
                                    labelName="25"
                                    fontSize={14}
                                    style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.87" }}
                                />
                            </Grid>
                        </Grid>
                        {/* <Button labelKey="WS_COMMON_BUTTON_SAVE"
                            variant="outlined"
                            style={{
                                backgroundColor: "#FFFFFF",
                                border: "1px solid rgba(5, 5, 5, 0.11999999731779099)",
                                minWidth: 300,
                                justifyContent: "space-between"
                            }}
                        >

                        </Button> */}
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(MeterReading);
