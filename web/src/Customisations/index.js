import { ptComponents } from "./pt";
import { tlComponents } from "./tl";
import { fsmComponents } from './fsm';

import { OverideLogout } from "./Hooks";
import { engagementComponents } from './engagement';


var Digit = window.Digit || {};

const customisedComponent = {
    ...ptComponents,
    ...tlComponents,
    ...fsmComponents,
    ...engagementComponents,
}

export const initCustomisationComponents = () => {
    Object.entries(customisedComponent).forEach(([key, value]) => {
        Digit.ComponentRegistryService.setComponent(key, value);
    });
};

export const customizations = [
    OverideLogout
];