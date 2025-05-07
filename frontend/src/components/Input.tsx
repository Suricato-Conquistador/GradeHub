type Props = {
    labelId: string,
    labelName: string,
    classLabel?: string,
    type: string,
    classInput?: string
    reference?: any
}

const Input = (props: Props) => {
    return(
        <>
            <label htmlFor={props.labelId} className={props.classLabel}>{props.labelName}</label>
            <input type={props.type} id={props.labelId} className={props.classInput} ref={props.reference} />
        </>
    )
}

export default Input;