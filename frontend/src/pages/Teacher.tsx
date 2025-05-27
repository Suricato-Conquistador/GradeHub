import { createRef, useEffect, useState } from "react";
import Select from "../components/Select";
import Grade from "../server/routes/grade";
import Subject from "../server/routes/subject";
import Table from "../components/Table";
import User from "../server/routes/user";


const grade = new Grade();
const subject = new Subject();
const user = new User();


const Teacher = () => {
    const subjectIdRef = createRef<HTMLSelectElement>();

    const [subjectIds, setSubjectIds] = useState<number[]>([]);
    const [subjectNames, setSubjectNames] = useState<string[]>([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            const data = await subject.getSubjects();
            const safeData = Array.isArray(data) ? data : [];
            setSubjectIds(safeData.map((subject: any) => subject.id));
            setSubjectNames(safeData.map((subject: any) => subject.name));
        };

        fetchSubjects();
    }, []);

    useEffect(() => {
        console.log("selectedSubjectId mudou para:", selectedSubjectId);
        if (selectedSubjectId === null) return;

        const fetchGradesForSubject = async () => {
            console.log("Buscando dados para subjectId:", selectedSubjectId);
            const a = user.getStudentsBySubjectId(selectedSubjectId);
            console.log("getStudentsBySubjectId result:", a);
            const dataStudent = await user.getStudents();
            console.log("getStudents result:", dataStudent);
        };

        fetchGradesForSubject();
    }, [selectedSubjectId]);

    const postGrade = async () => {
        
    }

    return(
        <>
            {/* Cadastrar notas */}
            <div>
                <Select options={subjectIds} optionsName={subjectNames} title="Selecione a matéria" 
                onChange={(e: any) => setSelectedSubjectId(Number(e.target.value))} />
                <button onClick={() => setSelectedSubjectId(1)}>Set Subject 1</button>
            </div>
            <div>
                {/* <Table thList={[]} tdList={[]} /> */}
            </div>
        </>
    );
};

export default Teacher;
