import { TableProps } from "../interfaces/table.interface";


const Table = (props: TableProps) => {
    return(
        <table className={props.classname}>
            <thead>
                <tr>
                    {props.thList.map((value, index) => (
                        <th key={index}>{value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.tdList.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{row.ra}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
