import {BaseView} from "../view/BaseView";
import {View} from "../view/View";
import {FOCUS_MANAGER} from "../view/FocusManager";
import {Grid} from "../components/grid/Grid";
import {HeaderCellType} from "../components/grid/enums/HeaderCellType";
import {Align} from "../components/grid/enums/Align";
import {BodyCellType} from "../components/grid/enums/BodyCellType";
import {FooterCellType} from "../components/grid/enums/FooterCellType";
import BasisStyle from "../assets/basis.style.css";

class Container extends View<null, null> {
    render(props: any): Element {
        let root = document.createElement("div");
        root.style.height = "60%";

        let grid = new Grid(
            {additionalClasses: []},
            {
                header: {
                    headerCells: [
                        {
                            type: HeaderCellType.TEXT,
                            value: "ردیف",
                            align: Align.CENTER,
                            width: 7,
                            draggable: true,
                            tools: [],
                            hasSeparator: true,
                            responsive: true,
                            minWidth: 5
                        },
                        {
                            type: HeaderCellType.TEXT,
                            value: "شماره سند",
                            align: Align.CENTER,
                            width: 7,
                            draggable: true,
                            tools: [],
                            hasSeparator: true,
                            responsive: true,
                            minWidth: 5
                        },
                        {
                            type: HeaderCellType.TEXT,
                            value: "کد مبنا",
                            align: Align.CENTER,
                            width: 7,
                            draggable: true,
                            tools: [],
                            hasSeparator: true,
                            responsive: true,
                            minWidth: 5
                        },
                        {
                            type: HeaderCellType.TEXT,
                            value: "تاریخ",
                            align: Align.CENTER,
                            width: 7,
                            draggable: true,
                            tools: [],
                            hasSeparator: true,
                            responsive: true,
                            minWidth: 5
                        },
                        {
                            type: HeaderCellType.TEXT,
                            value: "عنوان حساب",
                            align: Align.CENTER,
                            width: 7,
                            draggable: true,
                            tools: [],
                            hasSeparator: true,
                            responsive: true,
                            minWidth: 5
                        },
                        {
                            type: HeaderCellType.TEXT,
                            value: "",
                            align: Align.CENTER,
                            width: -1,
                            draggable: false,
                            tools: [],
                            hasSeparator: false,
                            responsive: false
                        }
                    ]
                },
                body: {
                    rows: [
                        {
                            id: "1",
                            cells: [
                                {
                                    type: BodyCellType.TEXT,
                                    value: "1",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "500",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "700",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "1400/01/01",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "حساب های دریافتنی",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "",
                                    colSpan: -1,
                                }
                            ],
                            active: false
                        },
                        {
                            id: "2",
                            cells: [
                                {
                                    type: BodyCellType.TEXT,
                                    value: "2",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "501",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "701",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "1400/01/02",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "حساب های پرداختنی",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "",
                                    colSpan: -1,
                                }
                            ],
                            active: false
                        },
                        {
                            id: "3",
                            cells: [
                                {
                                    type: BodyCellType.TEXT,
                                    value: "3",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "502",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "702",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "1400/01/03",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "حساب های دریافتنی",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "",
                                    colSpan: -1,
                                }
                            ],
                            active: false
                        },
                        {
                            id: "4",
                            cells: [
                                {
                                    type: BodyCellType.TEXT,
                                    value: "4",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "503",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "703",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "1400/01/04",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "حساب های خرید",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "",
                                    colSpan: -1,
                                }
                            ],
                            active: false
                        },
                        {
                            id: "5",
                            cells: [
                                {
                                    type: BodyCellType.TEXT,
                                    value: "5",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "504",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "704",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "1400/01/05",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "حساب های فروش",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "",
                                    colSpan: -1,
                                }
                            ],
                            active: false
                        },
                        {
                            id: "6",
                            cells: [
                                {
                                    type: BodyCellType.TEXT,
                                    value: "6",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "505",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "705",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "1400/01/06",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "حساب های مالی",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "",
                                    colSpan: -1,
                                }
                            ],
                            active: true
                        },
                        {
                            id: "7",
                            cells: [
                                {
                                    type: BodyCellType.TEXT,
                                    value: "7",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "506",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "706",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "1400/01/07",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "حساب های سال گذشته",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "",
                                    colSpan: -1,
                                }
                            ],
                            active: false
                        },
                        {
                            id: "8",
                            cells: [
                                {
                                    type: BodyCellType.TEXT,
                                    value: "8",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "507",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "707",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "1400/01/08",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "حساب های چک",
                                    colSpan: -1,
                                },
                                {
                                    type: BodyCellType.TEXT,
                                    value: "",
                                    colSpan: -1,
                                }
                            ],
                            active: false
                        },
                        {
                            id: "100",
                            cells: [
                                {
                                    type: BodyCellType.TEXT,
                                    value: "",
                                    colSpan: 6,
                                }
                            ],
                            active: false
                        },
                    ],
                    onRowClick: null
                },
                footer: {
                    rows: [
                        {
                            id: "1",
                            cells: [
                                {
                                    type: FooterCellType.TEXT,
                                    value: "B-5-3",
                                    colSpan: 2
                                },
                                {
                                    type: FooterCellType.TEXT,
                                    value: "B-5-4",
                                    colSpan: 2
                                },
                                {
                                    type: FooterCellType.TEXT,
                                    value: "B-5-5",
                                    colSpan: -1
                                },
                                {
                                    type: FooterCellType.TEXT,
                                    value: "",
                                    colSpan: 1
                                }
                            ]
                        },
                        {
                            id: "2",
                            cells: [
                                {
                                    type: FooterCellType.TEXT,
                                    value: "B-6-5",
                                    colSpan: 5
                                },
                                {
                                    type: FooterCellType.TEXT,
                                    value: "",
                                    colSpan: 1
                                }
                            ]
                        }
                    ]
                },
                pagination: {
                    npsOptions: [
                        {
                            title: "5",
                            value: 5
                        },
                        {
                            title: "10",
                            value: 10
                        },
                        {
                            title: "25",
                            value: 25
                        },
                        {
                            title: "50",
                            value: 50
                        }
                    ],
                    activeNps: 5,
                    npsOnClick: () => {

                    },
                    page: 4,
                    rowsLength: 79,
                    pageOnClick: () => {

                    }
                }
            },
            this
        );
        grid.moveIn(root);

        return root;
    }

    initState(): null {
        return null;
    }

    initVariables(): any {
        return {};
    }
}

class EmptyView extends View<null, null, null, BaseView, HTMLDivElement> {
    initState(): any {
    }

    render(props: any): HTMLDivElement {
        return document.createElement("div");
    }

    initVariables(): null {
        return null;
    }
}

let root = new EmptyView(null, null);
root.root.classList.add(BasisStyle["tct-root"]);
document.body.appendChild(root.root);

FOCUS_MANAGER.init([root], root);

let container = new Container(null, null, root);
container.moveIn();