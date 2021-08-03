import React, { Component } from 'react'
import "./index.css"
import { Dialog, Button } from "components";
import { httpRequest } from "egov-ui-kit/utils/api";
import { TextField } from "components";

export default class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify: false,
            updatte: false,
            phoneNumber:[],
            
            submitButton: false,
            verifyItems: [],
            currentItem: {
                verifytext: '',
                updatedMobile:'',
            }
        }
        this.addVerifyItem = this.addVerifyItem.bind(this);
        this.handleVerify = this.handleVerify.bind(this);
    }

    addVerifyItem(e) {
        e.preventDefault();

        const newItem = this.state.currentItem;

        if (newItem.text !== "") {
            const verifyItems = [...this.state.verifyItems, newItem];
            this.setState({
                verifyItems: verifyItems,
                currentItem: {
                    verifytext: ''
                }
            })
        }

    }
    getVerifyResponse = async (items, e) => {
        debugger;

        let body = {
            otp:
            {
                "mobileNumber": items[0].key,
                "tenantId": "pb",
                "type": "register",
                "userType": "CITIZEN"
            }
        };
        try {
            const payload = await httpRequest(
                "user-otp/v1/_send",
                "_send",
                [], body, null, null, true
            );
        } catch (e) {
            console.log(e);
        }
        this.setState(
            {
                verify: true,
                phoneNumber : items[0].key
            }
        )
    }
    getUpdateResponse = async (items, e) => {
        this.setState(
            {   
                verify: true,
                update: true
            }
        )
    }
    getOtpResponse = async (phonenumber, e) => {
        debugger;
        let body = {
            User:
            {
                "name": "p",
                "otpReference": this.state.currentItem.verifytext,
                "permanentCity": "pb.amritsar",
                "tenantId":"pb.amritsar",
                "username": phonenumber
            }
        };
        try {

            const payload = await httpRequest(
                "user/citizen/_create",
                "_create",
                [], body
            );
                console.log("===================payload=",payload);
        } catch (e) {
            console.log(e);
        }
    }
    getNextResponse = async (items, e) => {
        e.preventDefault();
        this.setState(
            {   
                verify: false,
                update: true
            }
        )
    }
    handleVerify = args => (e) => {

        this.setState({
            currentItem: {
                ...this.state.currentItem,
                [args]: e.target.value,
            }
        })
    }
    handleUpdate =args => (e) => {
        this.setState({
            currentItem: {
                ...this.state.currentItem,
                [args]: e.target.value,
            }
        })
    }
    // handleInputSecond(e){
    //   
    //   this.setState({
    //     currentItem:{
    //       verifytext:e.target.value,
    //     }
    //   })
    // }
    render() {
        const items = this.props.items;
        const phonenumber= this.state.phoneNumber;
        const updateNumbers= this.state.currentItem.updatedMobile;
        debugger;

        const listItems = items.map(item => {
            return <div className="list" key={item.key}>
                <p>
                    <div style={{ width: "24%", display: "inline-block", fontSize: "14px" }}>{item.text} </div>

                    {!this.state.verify && <div style={{ width: "75%", display: "inline-block", fontSize: "14px" }}><div style={{ width: "53%", display: "inline-block" }} >{item.key} </div> <button style={{ background: "none", color: "red", border: "none", width: "20%", display: "inline-block", fontSize: "14px" }}
                        onClick={(e) => {
                            this.getVerifyResponse(items, e);
                        }}>VERIFY</button>
                        <button style={{ background: "none", color: "red", border: "none", width: "10%", display: "inline-block", fontSize: "14px" }} onClick={(e) => {
                            this.getUpdateResponse(items, e)
                        }}>UPDATE</button>
                    </div>}
                    {(this.state.verify && !this.state.update) && <div style={{ width: "53%", display: "inline-block", fontSize: "14px" }}>
                        <form id="to-do-verification" >
                            <TextField type="text"
                                placeholder="Enter OTP"
                                value={this.state.currentItem.verifytext}
                                onChange={this.handleVerify('verifytext')}>
                            </TextField>
                            <button className="otpBUtton" onClick={(items, e) => {
                                this.getOtpResponse(phonenumber, e);
                            }}>SUBMIT</button>
                        </form>
                    </div>}

                    {(this.state.update) && <div style={{ width: "53%", display: "inline-block", fontSize: "14px" }}>
                        <form id="to-do-updation" >
                            <TextField type="text"
                                placeholder="Enter Mobile No."
                                value={this.state.currentItem.updatedMobile}
                                onChange={this.handleUpdate('updatedMobile')}>
                            </TextField>
                            <button className="otpBUtton" onClick={(items, e) => {
                                this.getNextResponse(items, e)}} >NEXT</button>
                        </form>
                    </div>}
                </p>
            </div>
        })
        return (
            <div>
                {listItems}
            </div>
        )
    }
}
