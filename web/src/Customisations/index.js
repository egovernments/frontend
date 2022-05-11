import { ptComponents } from "./pt";
import { tlComponents } from "./tl";
import { fsmComponents } from './fsm';
import { OverideLogout } from "./Hooks";

var Digit = window.Digit || {};

const customisedComponent = {
    ...ptComponents,
    ...tlComponents,
    ...fsmComponents,
}

export const initCustomisationComponents = () => {
    Object.entries(customisedComponent).forEach(([key, value]) => {
        Digit.ComponentRegistryService.setComponent(key, value);
    });
};

export const customizations = [
    OverideLogout
];