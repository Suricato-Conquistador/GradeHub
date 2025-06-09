import { ChangeEventHandler, Ref } from "react";


export interface SelectProps {
    options: number[];
    optionsName: string[];
    title: string;
    value?: string;
    classname?: string;
    reference?: Ref<HTMLSelectElement>;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
}
