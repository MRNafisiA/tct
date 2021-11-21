import {View} from "../../../view/View";
import {PrintOutput} from "../../../utils/Print";
import {ExcelOutput} from "../../../utils/Excel";

export type PXView = View & PrintOutput & ExcelOutput;