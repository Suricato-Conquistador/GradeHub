type Props = {
<<<<<<< Updated upstream
    labelId: string,
    labelName: string,
    classLabel?: string,
    type: string,
    classInput?: string
    reference?: any
}
=======
    labelId: string;
    labelName: string;
    classLabel?: string;
    type: string;
    name?: string;
    value?: string;
    classInput?: string;
    reference?: any;
};
>>>>>>> Stashed changes

const Input = (props: Props) => {
    return(
        <>
            <label htmlFor={props.labelId} className={props.classLabel}>{props.labelName}</label>
            <input type={props.type} id={props.labelId} className={props.classInput} ref={props.reference} />
        </>
    );
};

export default Input;