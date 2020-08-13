import React from "react";
// User related routes
import Loadable from "react-loadable";
import LoadingIndicator from "egov-ui-framework/ui-molecules/LoadingIndicator";
import pgrRoutes from "pgr-employee/Routes/pgr-routes";
import ptRoutes from "pt-employee/Routes/pt-routes";
import frameworkScreens from "./frameworkScreens";
import externalRoutes from "./exterenalURL";

const Loading = () => <LoadingIndicator />;



const Login = Loadable({
  loader: () => import("modules/employee/User/Login"),
  loading: Loading,
});

// import Login from "modules/employee/User/Login";

const OTP = Loadable({
  loader: () => import("modules/employee/User/OTP"),
  loading: Loading,
});
// import OTP from "modules/employee/User/OTP";

const LanguageSelection = Loadable({
  loader: () => import("modules/employee/User/LanguageSelection"),
  loading: Loading,
});
// import LanguageSelection from "modules/employee/User/LanguageSelection";

const ChangePassword = Loadable({
  loader: () => import("modules/employee/User/ChangePassword"),
  loading: Loading,
});
// import ChangePassword from "modules/employee/User/ChangePassword";

const Profile = Loadable({
  loader: () => import("modules/employee/User/Profile"),
  loading: Loading,
});
// import Profile from "modules/employee/User/Profile";

const ForgotPassword = Loadable({
  loader: () => import("modules/employee/User/ForgotPassword"),
  loading: Loading,
});
// import ForgotPassword from "modules/employee/User/ForgotPassword";

const PushLocalization = Loadable({
  loader: () => import("modules/employee/PushLocalization"),
  loading: Loading,
});
// import PushLocalization from "modules/employee/PushLocalization";

// Employee specific routes
const { TrackLocation } = Loadable({
  loader: () => import("modules/common"),
  loading: Loading,
});
// import { TrackLocation } from "modules/common";

const { ImageModalDisplay } = Loadable({
  loader: () => import("modules/common"),
  loading: Loading,
});
// import { ImageModalDisplay } from "modules/common";

const { PrivacyPolicy } = Loadable({
  loader: () => import("modules/common"),
  loading: Loading,
});

// import { PrivacyPolicy } from "modules/common";

const LandingPage = Loadable({
  loader: () => import("modules/employee/LandingPage"),
  loading: Loading,
});

// import LandingPage from "modules/employee/LandingPage";

const Inbox = Loadable({
  loader: () => import("modules/employee/Inbox"),
  loading: Loading,
});
// import Inbox from "modules/employee/Inbox";

const MDMS = Loadable({
  loader: () => import("modules/common/MDMS"),
  loading: Loading,
});
// import MDMS from "modules/common/MDMS";

const Home = Loadable({
  loader: () => import("modules/employee/Home"),
  loading: Loading,
});
// import Home from "modules/employee/Home";

const Report = Loadable({
  loader: () => import("modules/employee/reports/report"),
  loading: Loading,
});
// import Report from "modules/employee/reports/report";

const EGFFinance = Loadable({
  loader: () => import("modules/employee/Erp/EGF"),
  loading: Loading,
});
// import EGFFinance from "modules/employee/Erp/EGF";

const Notifications = Loadable({
  loader: () => import("modules/employee/Notifications"),
  loading: Loading,
});
// import Notifications from "modules/employee/Notifications";




//Redirection Url
const redirectionUrl = "/user/login";

const routes = [
  {
    path: "user/login",
    component: Login,
    needsAuthentication: false,
    redirectionUrl: "/inbox",
  },
  {
    path: "user/otp",
    component: OTP,
    needsAuthentication: false,
    redirectionUrl: "/inbox",
  },
  {
    path: "forgot-password",
    component: ForgotPassword,
    needsAuthentication: false,
    // redirectionUrl: "/inbox",
  },
  {
    path: "language-selection",
    component: LanguageSelection,
    needsAuthentication: false,
    redirectionUrl: "/user/login",
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicy,
    needsAuthentication: false,
    redirectionUrl: "/",
  },
  {
    path: "user/change-password",
    component: ChangePassword,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CORE_COMMON_CHANGE_PASSWORD" },
  },
  {
    path: "user/profile",
    component: Profile,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_HOME_HEADER_PROFILE" },
  },
  {
    path: "notifications",
    component: Notifications,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideTitle: true,
      isHomeScreen: true,
      hideFor: "ao",
      customFor: "csr",
    },
  },
  {
    path: "services/*",
    component: EGFFinance,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideTitle: true,
      isHomeScreen: true,
      hideFor: "ao",
      customFor: "csr",
    },
  },
  {
    path: "landing-page",
    component: LandingPage,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      redirectionUrl,
      title: "Home",
      hideTitle: true,
      isHomeScreen: true,
    },
  },
  {
    path: "inbox",
    component: Inbox,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      redirectionUrl,
      title: "Inbox",
      hideTitle: true,
      isHomeScreen: true,
    },
  },
  {
    path: "image",
    component: ImageModalDisplay,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideTitle: true,
      hideHeader: true,
    },
  },
  {
    path: "mdms/:moduleName/:masterName",
    component: MDMS,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_MDMS_COMMON",
      hideFooter: true,
      redirectionUrl,
    },
  },
  {
    path: "/",
    component: Home,
    needsAuthentication: true,
    options: {
      title: "COMMON_BOTTOM_NAVIGATION_HOME",
      hideFooter: false,
      redirectionUrl: "/user/login",
      //isHomeScreen: true,
    },
  },
  {
    path: "map",
    component: TrackLocation,
    needsAuthentication: true,
    options: { hideHeader: true, hideFooter: true, title: "CS_HEADER_TRACK_LOCATION", hideTitle: true, hideActionMenu: true },
  },
  {
    path: "report/:moduleName/:reportName",
    component: Report,
    needsAuthentication: true,

    options: {
      hideFooter: true,
      title: "CS_PGR_REPORTS_HEADER",
      hideTitle: true,
      redirectionUrl,
    },
  },
  {
    path: "push-localization",
    component: PushLocalization,
    needsAuthentication: true,

    options: {
      hideFooter: true,
      title: "CS_PUSH_LOCALIZATION",
      hideTitle: true,
      redirectionUrl,
    },
  },
  ...pgrRoutes,
  ...ptRoutes,
  ...frameworkScreens,
  ...externalRoutes,
];

export default routes;
