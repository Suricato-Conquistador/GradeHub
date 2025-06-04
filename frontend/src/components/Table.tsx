import { TableProps } from "../interfaces/table.interface";


const Table = <T,>({ thList, tdList, renderRow, classname }: TableProps<T>) => {
    return (
        <table className={classname}>
            <thead>
                <tr>
                    {thList.map((value, index) => (
                        <th key={index}>{value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tdList.map((row, index) => (
                    <tr key={index}>
                        {renderRow(row)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
