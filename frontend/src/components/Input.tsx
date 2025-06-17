import { InputProps } from "../interfaces/input.interface";


const Input = (props: InputProps) => {
    return(
        <>
            <label htmlFor={props.labelId} className={props.classLabel}>{props.labelName}</label>
            <input type={props.type} id={props.labelId} className={props.classInput} ref={props.reference} name={props.name} value={props.value} 
            onChange={props.onChange} checked={props.checked} />
        </>
    );
};

export default Input;
