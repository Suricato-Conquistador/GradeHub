type Props = {
    options: string[];
    optionsName: string[];
    classname?: string;
}


const Select = (props: Props) => {
    return(
        <select className={props.classname}>
            {props.options.map((value, index) => (
            <option key={value} value={value}>
                {props.optionsName[index]}
            </option>
        ))}
        </select>
    );
};

export default Select;
