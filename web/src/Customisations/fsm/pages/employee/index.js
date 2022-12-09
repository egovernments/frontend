import { BreadCrumb } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

var Digit = window.Digit;

export const FsmBreadCrumb = ({ location }) => {
    const { t } = useTranslation();
    const DSO = Digit.UserService.hasAccess(["FSM_DSO"]);
    const isApplicationDetails = location?.pathname?.includes("application-details");
    const isInbox = location?.pathname?.includes("inbox");
    const isFsm = location?.pathname?.includes("fsm");
    const isSearch = location?.pathname?.includes("search");
    const [search, setSearch] = useState(false);
    const FSTPO = Digit.UserService.hasAccess(["FSM_EMP_FSTPO"])
    const isSwachhSathi = Digit.UserService.hasAccess(["FSM_SWACHH_SATHI"])

    useEffect(() => {
      if (!search) {
        setSearch(isSearch);
      } else if (isInbox && search) {
        setSearch(false);
      }
    }, [location]);
  
    const crumbs = [
      {
        path: DSO ? "/digit-ui/citizen/fsm/dso-dashboard" : "/digit-ui/employee",
        content: t("ES_COMMON_HOME"),
        show: isFsm,
      },
      {
        path: FSTPO ? "/digit-ui/employee/fsm/fstp-inbox" : "/digit-ui/employee/fsm/inbox",
        content: isInbox || isApplicationDetails || search ? t("ES_TITLE_INBOX") : "FSM",
        show: isFsm && !isSwachhSathi,
      },
      {
        path: "/digit-ui/employee/fsm/search",
        content: t("ES_TITILE_SEARCH_APPLICATION"),
        show: search,
      },
      { content: t("ES_TITLE_APPLICATION_DETAILS"), show: isApplicationDetails },
    ];
  
    return <BreadCrumb crumbs={crumbs} />;
};