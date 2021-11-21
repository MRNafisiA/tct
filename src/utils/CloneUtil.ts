import {BaseView} from "../view/BaseView";

export function clone<I>(input: I, customClones: { instance: any, clone: (element: any) => any }[]): I {
    if (typeof input !== "object" || input === null) {
        return input;
    }
    if (Array.isArray(input)) {
        return <I><unknown>input.map((element) => clone(element, customClones));
    } else {
        for (const customClone of customClones) {
            if (input instanceof customClone.instance) {
                return customClone.clone(input);
            }
        }
        let result: any = {};
        for (const inputKey in input) {
            if ((<object><unknown>input).hasOwnProperty(inputKey)) {
                result[inputKey] = clone(input[inputKey], customClones);
            }
        }
        return result;
    }
}

export function viewClone<I>(input: I, customClones: { instance: any, clone: (element: any) => any }[]): I {
    return clone(input, customClones.concat({
        instance: BaseView,
        clone: (element) => {
            return new element.constructor(element.props, element.state);
        }
    }))
}