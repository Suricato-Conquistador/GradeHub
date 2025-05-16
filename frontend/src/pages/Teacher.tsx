import { createRef, useEffect, useState } from "react";
import Select from "../components/Select";
import Grade from "../server/routes/grade";
import Subject from "../server/routes/subject";


const grade = new Grade();
const subject = new Subject();


const Teacher = () => {
    const subjectIdRef = createRef<HTMLSelectElement>();

    const [subjectIds, setSubjectIds] = useState<number[]>([]);
    const [subjectNames, setSubjectNames] = useState<string[]>([]);


    useEffect(() => {
        const fetchSubjects = async () => {
            const data = await subject.getSubject();
            setSubjectIds(data.map((subject: any) => subject.id));
            setSubjectNames(data.map((subject: any) => subject.name));
        };

        fetchSubjects();
    }, []);

    const postGrade = async () => {

    }

    return(
        <>
            {/* Cadastrar notas */}
            <div>
                <Select options={subjectIds} optionsName={subjectNames} />
            </div>
        </>
    );
};

export default Teacher;
