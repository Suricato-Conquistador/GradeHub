import { createRef, useEffect, useState } from "react";
import Select from "../components/Select";
import Grade from "../server/routes/grade";
import Subject from "../server/routes/subject";
import Table from "../components/Table";
import { GradeTableTeacher } from "../interfaces/grade.interface";
import SubjectStudents from "../server/routes/subjectStudents";
import Input from "../components/Input";
import Button from "../components/Button";
import '../style/Teacher.scss';


const _grade = new Grade();
const subject = new Subject();
const subjectStudent = new SubjectStudents()


const Teacher = () => {
    const gradeRef = createRef<HTMLInputElement>();

    const [subjectIds, setSubjectIds] = useState<number[]>([]);
    const [subjectNames, setSubjectNames] = useState<string[]>([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const [tableData, setTableData] = useState<GradeTableTeacher[]>([]);
    const [gradeIds, setGradeIds] = useState<number[]>([]);
    const [studentsName, setStudentsName] = useState<string[]>([]);

    const [refresh, setRefresh] = useState(false);

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
                const studentsWithGrades = await subjectStudent.getStudentsBySubjectId(selectedSubjectId);

                const tableRows = studentsWithGrades.map((entry: any) => ({
                    ra: entry.student_code,
                    name: entry.student_name,
                    grade: entry.grade ?? "-",
                    gradeId: entry.grade_id
                }));

                const idGrade = tableRows.map((entry: any) => entry.gradeId);
                const nameStudents = tableRows.map((entry: any) => entry.name);

                setTableData(tableRows);
                setGradeIds(idGrade);
                setStudentsName(nameStudents);
            } catch (error) {
            console.error("Erro ao carregar alunos e notas:", error);
            }
        };

        fetchGradesForSubject();
    }, [selectedSubjectId, refresh]);

    const postGrade = async () => {
        const grade = gradeRef.current?.value;

        if(!grade || !selectedStudentId) {
            console.log("Existem campos faltantes");
            return;
        }

        try {
            await _grade.patchGrade(selectedStudentId, Number.parseFloat(grade.replace(",", ".")));
            setRefresh(prev => !prev);
            if (gradeRef.current) gradeRef.current.value = "";
            setSelectedStudentId(null);
            
        } catch(e) {
            console.error(e);
        }
    };

    return (
        <div className="teacher-container">
          <div className="select-container">
            <Select
              options={subjectIds}
              optionsName={subjectNames}
              title="Selecione a matéria"
              value={selectedSubjectId?.toString() ?? ""}
              onChange={(e: any) => setSelectedSubjectId(Number(e.target.value))}
            />
          </div>
      
          <div>
            {selectedSubjectId !== null && (
              tableData.length > 0 ? (
                <>
                  <div className="select-container">
                    <Select
                      options={gradeIds}
                      optionsName={studentsName}
                      title={"Selecione o nome do aluno"}
                      value={selectedStudentId?.toString() ?? ""}
                      onChange={(e: any) => setSelectedStudentId(Number(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <Input labelId={"grade"} labelName={"Nota"} type={"text"} reference={gradeRef} />
                  </div>
                  <Button title={"Cadastrar Nota"} onClick={postGrade} />
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
                </>
                
              ) : (
                <p>Não existem alunos cadastrados nessa matéria.</p>
              )
            )}
          </div>
        </div>
      );
      
};

export default Teacher;
