import { JSX } from "react";


export interface TableProps<T = any> {
    thList: string[];
    tdList: T[];
    renderRow: (row: T) => JSX.Element;
    classname?: string;
}

