import React from "react";
import ViewMobileDialog from ".";

export default class VerifyMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    render() {
        return (<div>
            <button onClick={() => this.setState({ open: !this.state.open })}>Verify Mobile</button>
            {this.state.open && <ViewMobileDialog></ViewMobileDialog>}
        </div>)

    }
}
