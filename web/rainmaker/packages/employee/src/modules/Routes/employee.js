// User related routes
import React from "react"
import Loadable from "react-loadable";
// Employee specific routes
import { TrackLocation } from "modules/common";
import { ImageModalDisplay } from "modules/common";
import { PrivacyPolicy } from "modules/common";

import pgrRoutes from "pgr-employee/Routes/pgr-routes";
import ptRoutes from "pt-employee/Routes/pt-routes";
import frameworkScreens from "./frameworkScreens";
import externalRoutes from "./exterenalURL";

function LoadingComponent() {
  return <div>Loading...</div>;
}


const Login = Loadable({
  loader: () => import("modules/employee/User/Login"),
  loading: LoadingComponent
});
const OTP = Loadable({
  loader: () => import("modules/employee/User/OTP"),
  loading: LoadingComponent
});
const LanguageSelection = Loadable({
  loader: () => import("modules/employee/User/LanguageSelection"),
  loading: LoadingComponent
});
const ChangePassword = Loadable({
  loader: () => import("modules/employee/User/ChangePassword"),
  loading: LoadingComponent
});
const Profile = Loadable({
  loader: () => import("modules/employee/User/Profile"),
  loading: LoadingComponent
});
const ForgotPassword = Loadable({
  loader: () => import("modules/employee/User/ForgotPassword"),
  loading: LoadingComponent
});

const LandingPage = Loadable({
  loader: () => import("modules/employee/LandingPage"),
  loading: LoadingComponent
});
const Inbox = Loadable({
  loader: () => import("modules/employee/Inbox"),
  loading: LoadingComponent
});
const MDMS = Loadable({
  loader: () => import("modules/common/MDMS"),
  loading: LoadingComponent
});
const Home = Loadable({
  loader: () => import("modules/employee/Home"),
  loading: LoadingComponent
});
const Report = Loadable({
  loader: () => import("modules/employee/reports/report"),
  loading: LoadingComponent
});
const EGFFinance = Loadable({
  loader: () => import("modules/employee/Erp/EGF"),
  loading: LoadingComponent
});

// import PTHome from "modules/employee/PropertyTax/PTHome";

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
  ...pgrRoutes,
  ...ptRoutes,
  ...frameworkScreens,
  ...externalRoutes,
];

export default routes;
