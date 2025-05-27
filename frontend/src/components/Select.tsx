import { SelectProps } from "../interfaces/select.interface";


const Select = (props: SelectProps) => {
    return(
        <select className={props.classname} onChange={props.onChange} ref={props.reference}>
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
