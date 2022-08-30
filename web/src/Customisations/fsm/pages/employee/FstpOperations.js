import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { AddNewIcon } from "../../components/icons";
import { InboxIcon } from "../../components/icons";
import ULBHomeCard from "../../components/ULBHomeCard";
var Digit = window.Digit;

const FstpOperations = () => {
    const { t } = useTranslation();
    const state = Digit.ULBService.getStateId();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const stateId = Digit.ULBService.getStateId();
    const history = useHistory();
    const title = "ES_COMMON_FSTP_OPERATION"
    const module = [
        {
            name: "ES_FSM_ADD_NEW_BUTTON",
            link: "/digit-ui/employee/fsm/fstp-add-vehicle",
            icon: <AddNewIcon />
        },
        {
            name: "ES_COMMON_INBOX",
            link: "/digit-ui/employee/fsm/fstp-inbox",
            icon: <InboxIcon />
        }
    ]

    return (
        <React.Fragment>
            <ULBHomeCard title={title} module={module} > </ULBHomeCard>
        </React.Fragment>
    );
};

export default FstpOperations;
