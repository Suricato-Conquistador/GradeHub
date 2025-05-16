type User = {
    name: string;
    ra: string;
};

type Props = {
    thList: string[];
    tdList: User[];
    classname?: string;
};

const Table = (props: Props) => {
    return(
        <table className={props.classname}>
            <thead>
                {props.thList.map(value => (
                    <th>{value}</th>
                ))}
            </thead>
            <tbody>
                {props.tdList.map(value => (
                    <tr>
                        <td>{value.name}</td>
                        <td>{value.ra}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
