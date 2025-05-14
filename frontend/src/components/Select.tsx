type Props = {
    options: string[];
    optionsName: string[];
    reference?: any;
    classname?: string;
}


const Select = (props: Props) => {
    return(
        <select className={props.classname} ref={props.reference}>
            {props.options.map((value, index) => (
            <option key={value} value={value}>
                {props.optionsName[index]}
            </option>
        ))}
        </select>
    );
};

export default Select;
