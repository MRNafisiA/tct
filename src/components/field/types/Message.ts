import {View} from "../../../view/View";
import {Field} from "../Field";

export type Message = {
    text: string,
    icon: View<any, any, any, Field>
}