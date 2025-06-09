import { ChangeEventHandler, Ref } from "react";


export interface InputProps {
    labelId: string;
    labelName: string;
    type: string;
    classLabel?: string;
    name?: string;
    value?: string;
    classInput?: string;
    reference?: Ref<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    checked?: boolean;
};