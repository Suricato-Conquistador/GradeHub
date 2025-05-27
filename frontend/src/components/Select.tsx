import { SelectProps } from "../interfaces/select.interface";


const Select = (props: SelectProps) => {
    return(
        <select value={props.value ?? ""} ref={props.reference} className={props.classname} onChange={props.onChange}>
            <option value="" disabled>{props.title}</option>
            {props.options.map((value, index) => (
            <option key={value} value={value}>
                {props.optionsName[index]}
            </option>
        ))}
        </select>
    );
};

export default Select;
