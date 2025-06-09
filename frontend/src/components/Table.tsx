import { TableProps } from "../interfaces/table.interface";


const Table = <T,>(props: TableProps<T>) => {
    return (
        <table className={props.classname}>
            <thead>
                <tr>
                    {props.thList.map((value, index) => (
                        <th key={index}>{value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.tdList.map((row, index) => (
                    <tr key={index}>
                        {props.renderRow(row)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
