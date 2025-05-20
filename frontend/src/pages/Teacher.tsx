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
            const data = await subject.getSubject();
            const safeData = Array.isArray(data) ? data : [];
            setSubjectIds(safeData.map((subject: any) => subject.id));
            setSubjectNames(safeData.map((subject: any) => subject.name));
        };

        fetchSubjects();
    }, []);

    useEffect(() => {
        if (selectedSubjectId === null) return;

        const fetchGradesForSubject = async () => {
            // Aqui você deve implementar o método para buscar as notas baseadas no subjectId selecionado.
            const dataStudent = await user.getStudents()
            console.log(dataStudent)
            // getNameRa Aluno
            // get nota
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
            </div>
            <div>
                <Table thList={[]} tdList={[]} />
            </div>
        </>
    );
};

export default Teacher;
