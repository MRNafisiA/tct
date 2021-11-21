import {Checkbox} from "../Checkbox";
import {Status} from "../enums/Status";
import {Condition} from "../enums/Condition";

export type Node = { checkbox: Checkbox, children: Node[], parent: Node | null, onClick: (event: MouseEvent | KeyboardEvent) => void };

type StatusChange = { checkbox: Checkbox, status: Status };

export class Manager {
    private readonly nodes: Node[];

    constructor() {
        this.nodes = [];
    }

    /*
    use this function to build a checkbox tree.
    example:
    let ch = new Checkbox(...);
    let node = CHECKBOX_MANAGER.join(ch, PARENT);

    pass null as parent when you are adding the root checkbox.
    returned value is a Node. use it to remove the checkbox from tree or for adding checkboxes as this checkbox children.
    example:
    let ch1 = new Checkbox(...);
    let subCh1 = new Checkbox(...);
    let subCh2 = new Checkbox(...);
    let subCh3 = new Checkbox(...);

    let node = CHECKBOX_MANAGER.join(ch1, null);
    let subNode1 = CHECKBOX_MANAGER.join(subCh1, node);
    let subNode2 = CHECKBOX_MANAGER.join(subCh2, node);
    let subNode3 = CHECKBOX_MANAGER.join(subCh3, node);
     */
    join(checkbox: Checkbox, parent: Node | null, force: boolean = false): Node | null {
        let onClick = (event: MouseEvent | KeyboardEvent) => {
            switch (checkbox.state.status) {
                case Status.UNCHECKED:
                    if (event.shiftKey) {
                        this.updateStatus(newNode, Status.CHECKED, true, false);
                    } else {
                        this.updateStatus(newNode, Status.CHECKED, false, false);
                    }
                    break;
                case Status.CHECKED:
                    if (event.shiftKey) {
                        this.updateStatus(newNode, Status.UNCHECKED, true, false);
                    } else {
                        this.updateStatus(newNode, Status.UNCHECKED, false, false);
                    }
                    break;
                case Status.SOME_CHECKED:
                    if (event.shiftKey) {
                        if (event.ctrlKey) {
                            this.updateStatus(newNode, Status.UNCHECKED, true, false);
                        } else {
                            this.updateStatus(newNode, Status.CHECKED, true, false);
                        }
                    } else {
                        if (event.ctrlKey) {
                            this.updateStatus(newNode, Status.UNCHECKED, false, false)
                        } else {
                            this.updateStatus(newNode, Status.CHECKED, false, false);
                        }
                    }
                    break;
            }
        };
        let nodes = (parent === null) ? this.nodes : parent.children;
        let newNode = nodes[nodes.push({checkbox: checkbox, children: [], parent: parent, onClick: onClick}) - 1];
        let changes = Manager.GetUpdateStatusUpChanges(newNode.parent, [], force);
        if (changes === false) {
            nodes.pop();
            return null;
        }
        changes.forEach((change) => change.checkbox.setStatus(change.status));
        checkbox.addOnClick(onClick);
        return newNode;
    }

    /*
    use this function to remove a node from a checkbox tree.
    example:
    let ch = new Checkbox(...);
    let node = CHECKBOX_MANAGER.join(ch);
    CHECKBOX_MANAGER.leave(node);
     */
    leave(node: Node, force: boolean = false): boolean {
        let nodes = (node.parent === null) ? this.nodes : node.parent.children;
        let index = nodes.indexOf(node);
        let deletedNode = nodes.splice(index, 1)[0];
        let changes = Manager.GetUpdateStatusUpChanges(node.parent, [], force);
        if (changes === false) {
            nodes.splice(index, 0, deletedNode);
            return false;
        }
        changes.forEach((change) => change.checkbox.setStatus(change.status));
        Manager.RemoveOnClicksRecursive(node);
        return true;
    }

    private static RemoveOnClicksRecursive(node: Node): void {
        node.checkbox.removeOnClick(node.onClick);
        for (const child of node.children) {
            Manager.RemoveOnClicksRecursive(child);
        }
    }

    updateStatus(node: Node, status: Status.CHECKED | Status.UNCHECKED, strict: boolean = false, force: boolean = false): boolean {
        // get sub tree changes
        let statusDownResult = Manager.GetUpdateStatusDownChanges(node, status, strict, force);
        if (statusDownResult === false) {
            node.checkbox.errorAnimation();
            return false;
        }
        let [nodeStatus, statusDownChanges] = statusDownResult;
        if (status !== nodeStatus && statusDownChanges.length === 0) {
            node.checkbox.errorAnimation();
        }

        // get higher nodes changes
        let changes = Manager.GetUpdateStatusUpChanges(node.parent, statusDownChanges, force);
        if (changes === false) {
            node.checkbox.errorAnimation();
            return false;
        }

        // apply changes
        for (const change of changes) {
            change.checkbox.setStatus(change.status);
        }
        return true;
    }

    private static GetUpdateStatusDownChanges(node: Node, status: Status.CHECKED | Status.UNCHECKED, strict: boolean = false, force: boolean): [Status, StatusChange[]] | false {
        if (node.checkbox.state.condition === Condition.DISABLED && !force) {
            if (node.checkbox.state.status === status) {
                return [status, []];
            } else {
                if (strict) {
                    return false;
                } else {
                    return [node.checkbox.state.status, []];
                }
            }
        }
        if (node.checkbox.state.status === status) {
            return [status, []];
        }
        if (node.children.length === 0) {
            if (node.checkbox.state.status === status) {
                return [status, []];
            } else {
                return [status, [{checkbox: node.checkbox, status: status}]];
            }
        }

        let changes = [];
        let [checkedNumber, uncheckedNumber, someCheckedNumber] = [0, 0, 0];
        for (const child of node.children) {
            let statusDownResult = Manager.GetUpdateStatusDownChanges(child, status, strict, force);
            if (statusDownResult === false) {
                return false;
            }
            let [childStatus, childChanges] = statusDownResult;
            switch (childStatus) {
                case Status.CHECKED:
                    checkedNumber++;
                    break;
                case Status.UNCHECKED:
                    uncheckedNumber++;
                    break;
                case Status.SOME_CHECKED:
                    someCheckedNumber++;
                    break;
            }
            changes.push(...childChanges);
        }

        if (checkedNumber === node.children.length) {
            if (node.checkbox.state.status !== Status.CHECKED) {
                changes.push({checkbox: node.checkbox, status: Status.CHECKED});
            }
            return [Status.CHECKED, changes];
        } else if (uncheckedNumber === node.children.length) {
            if (node.checkbox.state.status !== Status.UNCHECKED) {
                changes.push({checkbox: node.checkbox, status: Status.UNCHECKED});
            }
            return [Status.UNCHECKED, changes];
        } else if (checkedNumber > 0 || someCheckedNumber > 0) {
            if (node.checkbox.state.status !== Status.SOME_CHECKED) {
                changes.push({checkbox: node.checkbox, status: Status.SOME_CHECKED});
            }
            return [Status.SOME_CHECKED, changes];
        } else {
            return [node.checkbox.state.status, changes];
        }
    }

    private static GetUpdateStatusUpChanges(node: Node | null, changes: StatusChange[], force: boolean): StatusChange[] | false {
        for (; node !== null; node = node.parent) {
            if (node.children.length === 0) {
                continue;
            }
            let [checkedNumber, uncheckedNumber, someCheckedNumber] = [0, 0, 0];
            for (const child of node.children) {
                // simulate future value if the checkbox status supposed to change.
                let status = changes.find((value) => child.checkbox === value.checkbox)?.status ?? child.checkbox.state.status;
                switch (status) {
                    case Status.CHECKED:
                        checkedNumber++;
                        break;
                    case Status.UNCHECKED:
                        uncheckedNumber++;
                        break;
                    case Status.SOME_CHECKED:
                        someCheckedNumber++;
                        break;
                }
            }
            if (checkedNumber === node.children.length) {
                if (node.checkbox.state.status === Status.CHECKED) {
                    // for optimization, if a node does not change, the higher nodes will be unchanged.
                    break;
                } else {
                    if (node.checkbox.state.condition === Condition.DISABLED && !force) {
                        return false;
                    }
                    changes.push({checkbox: node.checkbox, status: Status.CHECKED});
                }
            } else if (uncheckedNumber === node.children.length) {
                if (node.checkbox.state.status === Status.UNCHECKED) {
                    // for optimization, if a node does not change, the higher nodes will be unchanged.
                    break;
                } else {
                    if (node.checkbox.state.condition === Condition.DISABLED && !force) {
                        return false;
                    }
                    changes.push({checkbox: node.checkbox, status: Status.UNCHECKED});
                }
            } else if (checkedNumber > 0 || someCheckedNumber > 0) {
                if (node.checkbox.state.status === Status.SOME_CHECKED) {
                    // for optimization, if a node does not change, the higher nodes will be unchanged.
                    break;
                } else {
                    if (node.checkbox.state.condition === Condition.DISABLED && !force) {
                        return false;
                    }
                    changes.push({checkbox: node.checkbox, status: Status.SOME_CHECKED});
                }
            }
        }
        return changes;
    }
}

export const CHECKBOX_MANAGER = new Manager();