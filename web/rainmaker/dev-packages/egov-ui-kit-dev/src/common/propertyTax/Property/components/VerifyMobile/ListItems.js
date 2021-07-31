import React, { Component } from 'react'
import "./index.css"
import { Dialog, Button } from "components";
import { httpRequest } from "egov-ui-kit/utils/api";
export default class ListItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify: false,
            submitButton: false,
            verifyItems: [],
            currentItem: {
                verifytext: ''
            }
        }
        this.addVerifyItem = this.addVerifyItem.bind(this);
        this.handleVerify = this.handleVerify.bind(this);
    }

    addVerifyItem(e) {
        e.preventDefault();
        debugger;
        const newItem = this.state.currentItem;
        console.log("=======Verify===newItem", newItem);

        if (newItem.text !== "") {
            const verifyItems = [...this.state.verifyItems, newItem];
            this.setState({
                verifyItems: verifyItems,
                currentItem: {
                    verifytext: ''
                }
            })
        }
        debugger;
    }
    getVerifyResponse = async (items,e) => {
        debugger;
        console.log("====this.props.items",items[0].key);
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
                [], body,null,null,true
            );

        } catch (e) {
            console.log(e);
        }
        debugger;
        this.setState(
            {
                verify: true
            }
        )
    }
    getOtpResponse = async (e) => {
        debugger;
        console.log("--------otp-------", this.state.currentItem.verifytext);
        console.log("----------eeee-----", e);
        let body = {
            user:
            {
                "name": "p",
                "otpReference": this.state.currentItem.verifytext,
                "permanentCity": "pb.amritsar",
                "tenantId": "pb",
                "username": "7013637446"
            }
        };
        try {
            debugger;
            const payload = await httpRequest(
                "user/citizen/_create",
                "_create",
                [], body
            );
                debugger;
        } catch (e) {
            console.log(e);
        }
        debugger;
    }
    handleVerify = args => (e) => {
        debugger;
        this.setState({
          currentItem: {
            ...this.state.currentItem,
            [args]: e.target.value,
          }
        })
      }

    // handleInputSecond(e){
    //   debugger;
    //   this.setState({
    //     currentItem:{
    //       verifytext:e.target.value,
    //     }
    //   })
    // }
    render() {
        const items = this.props.items;
        const listItems = items.map(item => {
            return <div className="list" key={item.key}>
                <p>
                    <div style={{ width: "24%", display: "inline-block", fontSize: "14px" }}>{item.text} </div>

                    {!this.state.verify && <div style={{ width: "75%", display: "inline-block", fontSize: "14px" }}><div style={{ width: "53%", display: "inline-block"}} >{item.key} </div> <button style={{ background: "none", color: "red", border: "none", width: "20%", display: "inline-block", fontSize: "14px" }}
                        onClick={(e) => {
                            this.getVerifyResponse(items,e);
                        }}>VERIFY</button>
                        <button style={{ background: "none", color: "red", border: "none", width: "10%", display: "inline-block", fontSize: "14px" }} onClick={(e) => {
                        this.getVerifyResponse(e)
                    }}>UPDATE</button>
                        </div>}
                    {this.state.verify && <div style={{ width: "53%", display: "inline-block", fontSize: "14px" }}>
                        <form id="to-do-verification" onSubmit={this.getOtpResponse(items)}  >
                            <input type="text"
                                id="to-do-verification-input"
                                placeholder="Enter OTP"
                                value={this.state.currentItem.verifytext}
                                onChange={this.handleVerify('verifytext')}>
                            </input>
                            <button className="otpBUtton" type="submit" >SUBMIT</button>
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
