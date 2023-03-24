import { BreadCrumb } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

var Digit = window.Digit;

export const FsmBreadCrumb = ({ location }) => {
  const { t } = useTranslation();
  const DSO = Digit.UserService.hasAccess(["FSM_DSO"]);
  const FSTPO = Digit.UserService.hasAccess(["FSM_EMP_FSTPO"]);
  const isApplicationDetails = location?.pathname?.includes(
    "application-details"
  );
  const isVehicleLog = location?.pathname?.includes("fstp-operator-details");
  const isInbox = location?.pathname?.includes("inbox");
  const isFsm = location?.pathname?.includes("fsm");
  const isSearch = location?.pathname?.includes("search");
  const isRegistry = location?.pathname?.includes("registry");
  const isVendorDetails = location?.pathname?.includes("vendor-details");
  const isVendorEdit = location?.pathname?.includes("modify-vendor");
  const isNewApplication = location?.pathname?.includes("new-application");
  const isVehicleDetails = location?.pathname?.includes("vehicle-details");
  const isVehicleEdit = location?.pathname?.includes("modify-vehicle");
  const isDriverDetails = location?.pathname?.includes("driver-details");
  const isDriverEdit = location?.pathname?.includes("modify-driver");
  const isModifyApplication =
    location?.pathname?.includes("modify-application");
  const isNewVendor = location?.pathname?.includes("new-vendor");
  const isNewVehicle = location?.pathname?.includes("new-vehicle");
  const isNewDriver = location?.pathname?.includes("new-driver");

  const [search, setSearch] = useState(false);
  const [id, setId] = useState(false);

  useEffect(() => {
    if (!search) {
      setSearch(isSearch);
    } else if (isFsm || (isInbox && search)) {
      setSearch(false);
    }
    if (location?.pathname) {
      let path = location?.pathname.split("/");
      let id = path[path.length - 1];
      setId(id);
    }
  }, [location]);

  const crumbs = [
    {
      path: DSO ? "/digit-ui/citizen/fsm/dso-dashboard" : "/digit-ui/employee",
      content: t("ES_COMMON_HOME"),
      show: isFsm,
    },
    {
      path: isRegistry
        ? "/digit-ui/employee/fsm/registry"
        : FSTPO
        ? "/digit-ui/employee/fsm/fstp-inbox"
        : "/digit-ui/employee",
      content: isVehicleLog ? t("ES_TITLE_INBOX") : "FSM",
      show: isFsm,
    },
    {
      path: isNewApplication ? "/digit-ui/employee/fsm/new-application" : "",
      content: t("FSM_NEW_DESLUDGING_APPLICATION"),
      show: isFsm && isNewApplication,
    },
    {
      path: "",
      content: `${t("FSM_SUCCESS")}`,
      show: location.pathname.includes("/employee/fsm/response") ? true : false,
    },
    {
      path:
        isInbox || isSearch || isApplicationDetails
          ? "/digit-ui/employee/fsm/inbox"
          : "",
      content: t("ES_TITLE_INBOX"),
      show: (isFsm && isInbox) || isSearch || isApplicationDetails,
    },
    {
      path: "/digit-ui/employee/fsm/search",
      content: t("ES_TITILE_SEARCH_APPLICATION"),
      show: search,
    },
    { content: t("ES_TITLE_APPLICATION_DETAILS"), show: isApplicationDetails },
    { content: t("ES_TITLE_VEHICLE_LOG"), show: isVehicleLog },
    {
      path: "/digit-ui/employee/fsm/registry/vendor-details/" + id,
      content: t("ES_TITLE_VENDOR_DETAILS"),
      show: isRegistry && (isVendorDetails || isVendorEdit),
    },
    {
      path: "/digit-ui/employee/fsm/registry/vehicle-details/" + id,
      content: t("ES_TITLE_VEHICLE_DETAILS"),
      show: isRegistry && (isVehicleDetails || isVehicleEdit),
    },
    {
      path: "/digit-ui/employee/fsm/registry/driver-details/" + id,
      content: t("ES_TITLE_DRIVER_DETAILS"),
      show: isRegistry && (isDriverDetails || isDriverEdit),
    },
    {
      content: t("ES_TITLE_VENDOR_EDIT"),
      show: isRegistry && (isVendorEdit || isVehicleEdit || isDriverEdit),
    },
    {
      path: "digit-ui/employee/fsm/modify-application/" + id,
      content: t("ES_FSM_APPLICATION_UPDATE"),
      show: isModifyApplication,
    },
    {
      content: isNewVendor
        ? t("ES_FSM_ACTION_CREATE_VENDOR")
        : isNewVehicle
        ? t("ES_FSM_REGISTRY_DETAILS_TYPE_VEHICLE")
        : isNewDriver
        ? t("ES_FSM_REGISTRY_DETAILS_TYPE_DRIVER")
        : null,
      show: isRegistry && (isNewVendor || isNewVehicle || isNewDriver),
    },
  ];

  return <BreadCrumb crumbs={crumbs} />;
};
