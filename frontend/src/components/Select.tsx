type Props = {
    options: number[];
    optionsName: string[];
    reference?: any;
    classname?: string;
}


const Select = (props: Props) => {
    return(
        <select defaultValue={""} ref={props.reference} className={props.classname}>
            <option value="" disabled>Selecione o professor</option>
            {props.options.map((value, index) => (
            <option key={value} value={value}>
                {props.optionsName[index]}
            </option>
        ))}
        </select>
    );
};

export default Select;
