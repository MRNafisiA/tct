import {RadioButton} from "../RadioButton";
import {Status} from "../enums/Status";
import {Condition} from "../enums/Condition";

export type Node = { radioButton: RadioButton, group: Group, onClick: (event: MouseEvent | KeyboardEvent) => void };
type Group = Node[];

export class Manager {
    private readonly groups: Group[];

    constructor() {
        this.groups = [];
    }

    /*
    use this function to build a radio button group.
    example:
    let rb = new RadioButton(...);
    let group = RADIO_BUTTON_MANAGER.join(rb, PARENT);

    pass null as parent when you are creating new group.
    returned value is a Node. use it to remove the radio button from group or for adding radio buttons to the group.
    example:
    let rb1 = new RadioButton(...);
    let subRb1 = new RadioButton(...);
    let subRb2 = new RadioButton(...);
    let subRb3 = new RadioButton(...);

    let node = RADiO_BUTTON_MANAGER.join(rb1, null);
    let subNode1 = RADiO_BUTTON_MANAGER.join(subRb1, rb1.group);
    let subNode2 = RADiO_BUTTON_MANAGER.join(subRb2, rb1.group);
    let subNode3 = RADiO_BUTTON_MANAGER.join(subRb3, rb1.group);
     */
    join(radioButton: RadioButton, group: Group | null, force: boolean = false): Node | null {
        let onClick = () => {
            switch (radioButton.state.status) {
                case Status.UNCHECKED:
                    this.updateStatus(newNode, Status.CHECKED, false);
                    break;
                case Status.CHECKED:
                    this.updateStatus(newNode, Status.UNCHECKED, false);
                    break;
            }
        };
        if (group === null) {
            group = this.groups[this.groups.push([]) - 1];
        }
        let newNode = group[group.push({radioButton: radioButton, group: group, onClick: onClick}) - 1];
        if (radioButton.state.status === Status.CHECKED) {
            for (const node of group) {
                if (node.radioButton.state.status === Status.CHECKED && node.radioButton !== radioButton) {
                    if (node.radioButton.state.condition === Condition.ENABLED || force) {
                        node.radioButton.setStatus(Status.UNCHECKED);
                        return newNode;
                    } else {
                        ((group.length === 1) ? this.groups : group).pop();
                        return null;
                    }
                }
            }
        }
        radioButton.addOnClick(onClick);
        return newNode;
    }

    /*
    use this function to remove a node from a checkbox tree.
    example:
    let rb = new RadioButton(...);
    let node = RADIO_BUTTON_MANAGER.join(rb);
    RADIO_BUTTON_MANAGER.leave(node);
     */
    leave(node: Node): void {
        node.group.splice(node.group.indexOf(node), 1);
        node.radioButton.removeOnClick(node.onClick);
    }

    updateStatus(node: Node, status: Status, force: boolean = false): boolean {
        if (status === Status.CHECKED) {
            for (const _node of node.group) {
                if (_node.radioButton.state.status === Status.CHECKED && _node !== node) {
                    if ((_node.radioButton.state.condition === Condition.ENABLED && node.radioButton.state.condition === Condition.ENABLED) || force) {
                        _node.radioButton.setStatus(Status.UNCHECKED);
                        node.radioButton.setStatus(Status.CHECKED);
                        return true;
                    } else {
                        node.radioButton.errorAnimation();
                        return false;
                    }
                }
            }
            if (node.radioButton.state.condition === Condition.ENABLED || force) {
                node.radioButton.setStatus(Status.CHECKED);
                return true;
            } else {
                node.radioButton.errorAnimation();
                return false;
            }
        } else {
            if (node.radioButton.state.condition === Condition.ENABLED || force) {
                node.radioButton.setStatus(Status.UNCHECKED);
                return true;
            } else {
                node.radioButton.errorAnimation();
                return false;
            }
        }
    }
}

export const RADIO_BUTTON_MANAGER = new Manager();