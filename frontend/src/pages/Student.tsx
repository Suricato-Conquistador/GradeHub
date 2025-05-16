import { useState } from "react";
import Table from "../components/Table";



const Student = () => {
    const [gradeTable, setGradeTable] = useState<string[]>([]);

    return(
        <>
            <div>
                <Table thList={["Matéria", "Nota", "Professor"]} tdList={[]} />
            </div>
        </>
    );
};

export default Student;
