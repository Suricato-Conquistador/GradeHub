import { createRef, useEffect, useState } from "react";
import Select from "../components/Select";
import Grade from "../server/routes/grade";
import Subject from "../server/routes/subject";
import Table from "../components/Table";
import User from "../server/routes/user";
import { GradeTableTeacher } from "../interfaces/grade.interface";
import SubjectStudents from "../server/routes/subjectStudents";


const grade = new Grade();
const subject = new Subject();
const user = new User();
const subjectStudent = new SubjectStudents()


const Teacher = () => {
    const subjectIdRef = createRef<HTMLSelectElement>();

    const [subjectIds, setSubjectIds] = useState<number[]>([]);
    const [subjectNames, setSubjectNames] = useState<string[]>([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
    const [tableData, setTableData] = useState<GradeTableTeacher[]>([]);

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
        if (selectedSubjectId === null) return;

        const fetchGradesForSubject = async () => {
            try {
            // 1. Buscar dados da view (alunos + notas)
            const studentsWithGrades = await subjectStudent.getStudentsBySubjectId(selectedSubjectId);

            // 2. Mapear para a estrutura esperada
            const tableRows = studentsWithGrades.map((entry: any) => ({
                ra: entry.student_code,
                name: entry.student_name,
                grade: entry.grade ?? "-" // Mostra "-" se nota for nula
            }));

            setTableData(tableRows);
            } catch (error) {
            console.error("Erro ao carregar alunos e notas:", error);
            }
        };

        fetchGradesForSubject();
    }, [selectedSubjectId]);

    return(
        <>
            {/* Cadastrar notas */}
            <div>
                <Select options={subjectIds} optionsName={subjectNames} title="Selecione a matéria" 
                value={selectedSubjectId?.toString() ?? ""} 
                onChange={(e: any) => setSelectedSubjectId(Number(e.target.value))} />
                {/* <button onClick={() => setSelectedSubjectId(1)}>Set Subject 1</button> */}
            </div>
            <div>
                {selectedSubjectId !== null && (
                    tableData.length > 0 ? (
                        <Table
                        thList={["RA", "Aluno", "Nota"]}
                        tdList={tableData}
                        renderRow={(row) => (
                            <>
                                <td>{row.ra}</td>
                                <td>{row.name}</td>
                                <td>{row.grade}</td>
                            </>
                        )}
                        />
                    ) : (
                        <p>Não existem alunos cadastrados nessa matéria.</p>
                    )
                )}
            </div>
        </>
    );
};

export default Teacher;
