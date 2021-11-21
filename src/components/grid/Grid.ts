import {BaseView} from "../../view/BaseView";
import {View} from "../../view/View";
import {HeaderCell} from "./types/HeaderCell";
import {NpsOption} from "./interfaces/NpsOption";
import BasisStyle from "../../assets/basis.style.css";
import GridStyle from "./Grid.style.css";
import {HeaderCellType} from "./enums/HeaderCellType";
import {BodyCellType} from "./enums/BodyCellType";
import {BodyRow} from "./interfaces/BodyRow";
import {FooterRow} from "./interfaces/FooterRow";
import {FooterCellType} from "./enums/FooterCellType";
import {NpsOnClick} from "./types/NpsOnClick";
import {PageOnClick} from "./types/PageOnClick";
import {LineVerticalSvg} from "../../assets/svg/regular/LineVerticalSvg";
import {OnRowClick} from "./types/OnRowClick";

export interface Props {
    additionalClasses: string[];
}

export interface State {
    header: {
        headerCells: HeaderCell[];
    };
    body: {
        rows: BodyRow[];
        onRowClick: OnRowClick | null;
    };
    footer: {
        rows: FooterRow[];
    };
    pagination: {
        npsOptions: NpsOption[];
        activeNps: number;
        npsOnClick: NpsOnClick;
        page: number;
        pageOnClick: PageOnClick;
        rowsLength: number;
    };
}

export interface Variables {
    thead: HTMLTableSectionElement;
    theadTr: HTMLTableRowElement;
    tbody: HTMLTableSectionElement;
    tfoot: HTMLTableSectionElement;
    rowsLengthSpan: HTMLSpanElement;
    rowsRangeSpan: HTMLSpanElement;
    pagesDiv: HTMLDivElement;
    npsDiv: HTMLDivElement;
}

export class Grid<ParentView extends BaseView>
    extends View<Props, State, Variables, ParentView, HTMLDivElement> {
    // abstract implementation
    initState(): State {
        return {
            header: {
                headerCells: []
            },
            body: {
                rows: [],
                onRowClick: null
            },
            footer: {
                rows: []
            },
            pagination: {
                npsOptions: [],
                activeNps: -1,
                npsOnClick: <NpsOnClick><unknown>null,
                page: -1,
                pageOnClick: <PageOnClick><unknown>null,
                rowsLength: -1
            }
        };
    }

    initVariables(): Variables {
        return {
            thead: document.createElement("thead"),
            theadTr: document.createElement("tr"),
            tbody: document.createElement("tbody"),
            tfoot: document.createElement("tfoot"),
            rowsLengthSpan: document.createElement("span"),
            rowsRangeSpan: document.createElement("span"),
            pagesDiv: document.createElement("div"),
            npsDiv: document.createElement("div")
        };
    }

    render(props: Props): HTMLDivElement {
        let root = document.createElement("div");
        root.classList.add(BasisStyle["tct"], GridStyle["grid"], ...props.additionalClasses);

        // table
        let tableContainerDiv = document.createElement("div");
        tableContainerDiv.classList.add(GridStyle["table-container"]);
        let table = document.createElement("table");

        // pagination
        let paginationDiv = document.createElement("div");
        paginationDiv.classList.add(GridStyle["pagination"]);
        let rowsLengthRangeDiv = document.createElement("div");
        rowsLengthRangeDiv.classList.add(GridStyle["pagination-rows-range"])
        this.v.pagesDiv.classList.add(GridStyle["pagination-pages"]);

        // append
        this.v.thead.appendChild(this.v.theadTr);
        table.appendChild(this.v.thead);
        table.appendChild(this.v.tbody);
        table.appendChild(this.v.tfoot);
        tableContainerDiv.appendChild(table);
        rowsLengthRangeDiv.appendChild(this.v.rowsRangeSpan);
        rowsLengthRangeDiv.appendChild(this.v.rowsLengthSpan);
        paginationDiv.appendChild(rowsLengthRangeDiv);
        paginationDiv.appendChild(this.v.pagesDiv);
        paginationDiv.appendChild(this.v.npsDiv);
        root.appendChild(tableContainerDiv);
        root.appendChild(paginationDiv);

        return root;
    }

    // custom overrides
    setState(nextState: State) {
        // headerCells
        this.setHeaderCells(nextState.header.headerCells);

        // bodyRows
        this.setBodyRows(nextState.body.rows);

        // onRowClick
        this.setOnRowClick(nextState.body.onRowClick);

        // footerRows
        this.setFooterRows(nextState.footer.rows);

        // npsOnClick
        this.setNpsOnClick(nextState.pagination.npsOnClick);

        // pageOnClick
        this.setPageOnClick(nextState.pagination.pageOnClick);

        // rowsNumber
        this.setRowsLength(nextState.pagination.rowsLength, false);

        // npsOptions
        this.setNpsOptions(nextState.pagination.npsOptions, false);

        // activeNps
        this.setActiveNps(nextState.pagination.activeNps, false);

        // page
        this.setPage(nextState.pagination.page, true);
    }

    // private utils
    private static MoveElements<Element>(start: number, length: number, nextStart: number, elements: Element[], root: HTMLElement): void {
        if (nextStart < 0) {
            nextStart += elements.length + 1;
        }
        elements.splice((start < nextStart) ? nextStart - length : nextStart, 0, ...elements.splice(start, length));
        if (start < nextStart) {
            for (let i = 0; i < length; i++) {
                root.insertBefore(root.children[start], root.children[nextStart]);
            }
        } else {
            for (let i = 0; i < length; i++) {
                root.insertBefore(root.children[start + i], root.children[nextStart + i]);
            }
        }
    };

    private getLastPageNumber(): number {
        let lastPage = this.state.pagination.rowsLength / this.state.pagination.activeNps;
        if (lastPage !== parseInt(lastPage.toString())) {
            return parseInt(lastPage.toString()) + 1;
        } else {
            return lastPage;
        }
    };

    private getFirstAndLastRecord(): [start: number, end: number] {
        let firstRecord = (this.state.pagination.activeNps * (this.state.pagination.page - 1));
        let lastRecord = firstRecord + this.state.pagination.activeNps - 1;
        if (lastRecord > this.state.pagination.rowsLength - 1) {
            lastRecord = this.state.pagination.rowsLength - 1;
        }
        return [firstRecord, lastRecord];
    }

    private updateRowsRange(): void {
        let [start, end] = this.getFirstAndLastRecord();
        this.v.rowsRangeSpan.innerText = "سطرهای " +
            (start + 1) +
            " تا " +
            (end + 1);
    }

    // view interface
    setHeaderCells(cells: HeaderCell[]): void {
        this.deleteHeaderCells(0, this.state.header.headerCells.length);
        this.addHeaderCells(cells, 0);
    }

    addHeaderCells(cells: HeaderCell[], start: number): void {
        if (start < 0) {
            start += this.state.header.headerCells.length + 1;
        }
        for (const cell of cells) {
            let td = document.createElement("td");
            let thDiv = document.createElement("div");
            thDiv.classList.add(GridStyle["header-cell"]);

            // width
            if (cell.width !== -1) {
                td.style.width = cell.width + "rem";
            }

            // value
            let titleDiv = document.createElement("div");
            if (cell.type === HeaderCellType.TEXT) {
                let titleSpan = document.createElement("span");
                titleSpan.classList.add(GridStyle["header-cell-title"]);
                titleSpan.innerText = cell.value;
                titleDiv.appendChild(titleSpan);
            } else if (cell.type === HeaderCellType.VIEW) {
                cell.value.parent = this;
                cell.value.moveIn(titleDiv);
            }

            // left
            let leftDiv = document.createElement("div");
            leftDiv.classList.add(GridStyle["header-cell-left"]);
            // tools
            for (const tool of cell.tools) {
                tool.parent = this;
                tool.moveIn(leftDiv);
            }
            // separator
            if (cell.hasSeparator) {
                let separatorDiv = document.createElement("div");
                separatorDiv.classList.add(GridStyle["header-cell-separator"]);
                let separatorSvg = new LineVerticalSvg(this);
                if (cell.responsive) {
                    let responsiveActivated = false;
                    const mouseDown = () => {
                        if (responsiveActivated) {
                            return;
                        }
                        document.addEventListener("mousemove", mouseMove);
                        document.addEventListener("mouseup", mouseUp);
                        responsiveActivated = true;
                    };
                    const mouseMove = (event: MouseEvent) => {
                        if (!responsiveActivated) {
                            return;
                        }
                        let remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
                        let newWidth = ((td.getBoundingClientRect().right - event.clientX) / remInPx) + (parseFloat(getComputedStyle(separatorDiv).width) / remInPx) / 2;
                        if (newWidth > cell.minWidth) {
                            td.style.width = newWidth.toString() + "rem";
                        }
                    };
                    const mouseUp = () => {
                        if (!responsiveActivated) {
                            return;
                        }
                        document.removeEventListener("mousemove", mouseMove);
                        document.removeEventListener("mouseup", mouseUp);
                        responsiveActivated = false;
                    };
                    separatorDiv.addEventListener("mousedown", mouseDown);
                    separatorDiv.addEventListener("dblclick", () => {
                        td.style.width = cell.width + "rem";
                    });
                }
                separatorSvg.moveIn(separatorDiv);
                leftDiv.appendChild(separatorDiv);
            }

            thDiv.appendChild(document.createElement("div"));
            thDiv.appendChild(titleDiv);
            thDiv.appendChild(leftDiv);
            td.appendChild(thDiv);
            this.v.theadTr.insertBefore(td, this.v.theadTr.children[start]);

            this.state.header.headerCells.splice(start, 0, cell);
            start++;
        }
    }

    deleteHeaderCells(start: number, length: number): void {
        for (let i = start + length - 1; i !== start - 1; i--) {
            let cell = this.state.header.headerCells[i];
            if (cell.type === HeaderCellType.VIEW) {
                cell.value.moveOut();
            }
            for (const tool of cell.tools) {
                tool.moveOut();
            }
            this.v.theadTr.children[i].remove();
        }
        this.state.header.headerCells.splice(start, length);
    }

    moveHeaderCells(start: number, length: number, nextStart: number): void {
        Grid.MoveElements(start, length, nextStart, this.state.header.headerCells, this.v.theadTr);
    }

    setBodyRows(rows: BodyRow[]): void {
        this.deleteBodyRows(0, this.state.body.rows.length);
        this.addBodyRows(rows, 0);
    }

    addBodyRows(rows: BodyRow[], start: number): void {
        let i = 0;
        for (const row of rows) {
            let tr = document.createElement("tr");
            tr.addEventListener("click", (event) => {
                if (this.state.body.onRowClick !== null) {
                    this.state.body.onRowClick(event);
                }
            });
            for (const cell of row.cells) {
                let td = document.createElement("td");
                if (cell.type === BodyCellType.TEXT) {
                    let valueSpan = document.createElement("span");
                    valueSpan.classList.add(GridStyle["body-cell-span"])
                    valueSpan.innerText = cell.value;
                    td.appendChild(valueSpan);
                } else if (cell.type === BodyCellType.VIEW) {
                    cell.value.moveIn(td);
                }
                if (cell.colSpan !== -1) {
                    td.colSpan = cell.colSpan;
                }
                tr.appendChild(td);
            }
            if (row.active) {
                tr.classList.add(GridStyle["body-row-active"]);
            }
            this.v.tbody.insertBefore(tr, this.v.tbody.children[start + i]);
            i++;
        }
        this.state.body.rows.splice(start, 0, ...rows);
    }

    deleteBodyRows(start: number, length: number): void {
        for (let i = start + length - 1; i !== start - 1; i--) {
            let row = this.state.body.rows[i];
            for (const cell of row.cells) {
                if (cell.type === BodyCellType.VIEW) {
                    cell.value.moveOut();
                }
            }
            this.v.tbody.children[i].remove();
        }
        this.state.body.rows.splice(start, length);
    }

    moveBodyRows(start: number, length: number, nextStart: number): void {
        Grid.MoveElements(start, length, nextStart, this.state.body.rows, this.v.tbody);
    }

    setOnRowClick(onRowClick: OnRowClick | null) {
        this.state.body.onRowClick = onRowClick;
    }

    setFooterRows(rows: FooterRow[]): void {
        this.deleteFooterRows(0, this.state.footer.rows.length);
        this.addFooterRows(rows, 0);
    }

    addFooterRows(rows: FooterRow[], start: number): void {
        let i = 0;
        for (const row of rows) {
            let tr = document.createElement("tr");
            for (const cell of row.cells) {
                let td = document.createElement("td");
                if (cell.type === FooterCellType.TEXT) {
                    let valueSpan = document.createElement("span");
                    valueSpan.innerText = cell.value;
                    td.appendChild(valueSpan);
                } else if (cell.type === FooterCellType.VIEW) {
                    cell.value.moveIn(td);
                }
                if (cell.colSpan !== -1) {
                    td.colSpan = cell.colSpan;
                }
                tr.appendChild(td);
            }
            this.v.tfoot.insertBefore(tr, this.v.tfoot.children[start + i]);
            i++;
        }
        this.state.footer.rows.splice(start, 0, ...rows);
    }

    deleteFooterRows(start: number, length: number): void {
        for (let i = start + length - 1; i !== start - 1; i--) {
            let row = this.state.footer.rows[i];
            for (const cell of row.cells) {
                if (cell.type === FooterCellType.VIEW) {
                    cell.value.moveOut();
                }
            }
            this.v.tfoot.children[i].remove();
        }
        this.state.footer.rows.splice(start, length);
    }

    moveFooterRows(start: number, length: number, nextStart: number): void {
        Grid.MoveElements(start, length, nextStart, this.state.footer.rows, this.v.tfoot);
    }

    setRowsLength(rowsLength: number, updateRowsRange: boolean = true): void {
        this.v.rowsLengthSpan.innerText = "( " + rowsLength + " سطر )";
        this.state.pagination.rowsLength = rowsLength;

        if (updateRowsRange) {
            this.updateRowsRange();
        }
    }

    setNpsOnClick(npsOnClick: NpsOnClick): void {
        this.state.pagination.npsOnClick = npsOnClick;
    }

    setNpsOptions(npsOptions: NpsOption[], updateRowsRange: boolean = true): void {
        while (this.v.npsDiv.lastChild) {
            this.v.npsDiv.lastChild.remove();
        }
        for (const npsOption of npsOptions) {
            let npsSpan = document.createElement("span");
            npsSpan.innerText = npsOption.title;
            npsSpan.addEventListener("click", () => {
                this.state.pagination.npsOnClick(npsOption.value);
            });
            this.v.npsDiv.appendChild(npsSpan);
        }

        if (updateRowsRange) {
            this.updateRowsRange();
        }
    }

    setActiveNps(activeNps: number, updateRowsRange: boolean = true): void {
        for (let i = 0; i < this.state.pagination.npsOptions.length; i++) {
            let npsOption = this.state.pagination.npsOptions[i];
            if (npsOption.value === activeNps) {
                if (!this.v.npsDiv.children[i].classList.contains(GridStyle["pagination-nps-active"])) {
                    this.v.npsDiv.children[i].classList.add(GridStyle["pagination-nps-active"]);
                }
            } else {
                if (this.v.npsDiv.children[i].classList.contains(GridStyle["pagination-nps-active"])) {
                    this.v.npsDiv.children[i].classList.remove(GridStyle["pagination-nps-active"]);
                }
            }
        }

        this.state.pagination.activeNps = activeNps;

        if (updateRowsRange) {
            this.updateRowsRange();
        }
    }

    setPage(page: number, updateRowsRange: boolean = true): void {
        let lastPage = this.getLastPageNumber();
        if (page < 0) {
            page += lastPage + 1;
        }

        // clear
        while (this.v.pagesDiv.lastChild) {
            this.v.pagesDiv.lastChild.remove();
        }

        // start
        const createPage = (page: number) => {
            let span = document.createElement("span");
            span.classList.add(GridStyle["pagination-page"]);
            span.innerText = page.toString();
            span.addEventListener("click", () => {
                this.state.pagination.pageOnClick(page);
            });
            this.v.pagesDiv.appendChild(span);
        };
        if (page >= 3) {
            createPage(1);
        }
        if (page >= 4) {
            createPage(2);
        }

        // start exception
        if (page === 5) {
            createPage(3);
        } else if (page > 5) {
            let span = document.createElement("span");
            span.innerText = "...";
            this.v.pagesDiv.appendChild(span);
        }

        // number left
        if (page !== 1) {
            createPage(page - 1);
        }

        // number self
        let span = document.createElement("span");
        span.classList.add(GridStyle["pagination-page"], GridStyle["pagination-active-page"]);
        span.innerText = page.toString();
        this.v.pagesDiv.appendChild(span);

        // number right
        if (page !== lastPage) {
            createPage(page + 1);
        }

        // end exception
        if (lastPage - (page - 1) === 5) {
            createPage(lastPage - 2);
        } else if (lastPage - (page - 1) > 5) {
            let span = document.createElement("span");
            span.innerText = "...";
            this.v.pagesDiv.appendChild(span);
        }

        // end
        if (lastPage - (page - 1) >= 4) {
            createPage(lastPage - 1);
        }
        if (lastPage - (page - 1) >= 3) {
            createPage(lastPage);
        }

        this.state.pagination.page = page;

        if (updateRowsRange) {
            this.updateRowsRange();
        }
    }

    setPageOnClick(pageOnClick: PageOnClick): void {
        this.state.pagination.pageOnClick = pageOnClick;
    }
}