type Props = {
    labelId: string;
    labelName: string;
    type: string;
    classLabel?: string;
    name?: string;
    value?: string;
    classInput?: string;
    reference?: any;
    onChange?: any;
    checked?: any;
};


const Input = (props: Props) => {
    return(
        <>
            <label htmlFor={props.labelId} className={props.classLabel}>{props.labelName}</label>
            <input type={props.type} id={props.labelId} className={props.classInput} ref={props.reference} name={props.name} value={props.value} 
            onChange={props.onChange} checked={props.checked} />
        </>
    );
};

export default Input;
