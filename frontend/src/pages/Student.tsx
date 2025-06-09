import { useEffect, useState } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Grade from "../server/routes/grade";
import Subject from "../server/routes/subject";
import User from "../server/routes/user";
import SubjectStudents from "../server/routes/subjectStudents";
import { GradeTableStudent } from "../interfaces/grade.interface";
import Swal from "sweetalert2";


const _user = new User()
const _grade = new Grade()
const _subject = new Subject()
const _subjectStudents = new SubjectStudents()

const Student = () => {
    const [subjectsId, setSubjectsId] = useState<number[]>([]);
    const [subjectsName, setSubjectsName] = useState<string[]>([]);
    const [teachersName, setTeachersName] = useState<string[]>([]);

    const [gradeTable, setGradeTable] = useState<GradeTableStudent[]>([]);

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const allSubjects = await _subject.getSubjects();
                const enrolledSubjects = await _subjectStudents.getSubjectsByStudentId();

                const enrolledSubjectIds = enrolledSubjects.map((s: any) => s.subject_id);

                const availableSubjects = allSubjects.filter((s: any) => !enrolledSubjectIds.includes(s.id));

                const ids = availableSubjects.map((e: any) => e.id);
                const names = availableSubjects.map((e: any) => e.name);
                const teacherIds = availableSubjects.map((e: any) => e.teacherId);

                const teacherNames = await Promise.all(
                    teacherIds.map(async (id: number) => {
                        try {
                            const teacherData = await _user.getUserById(id);
                            return teacherData.name;
                        } catch (e) {
                            console.error(`Erro ao buscar professor com ID ${id}:`, e);
                            return "Desconhecido";
                        }
                    })
                );

                setSubjectsId(ids);
                setSubjectsName(names);
                setTeachersName(teacherNames);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchSubjects();
    }, [refresh]);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const enrolledSubjects = await _subjectStudents.getSubjectsByStudentId();

                const tableData = await Promise.all(
                    enrolledSubjects.map(async (entry: any) => {
                        const subjectData = await _subject.getSubjectById(entry.subject_id);
                        const teacherData = await _user.getUserById(subjectData.teacherId);

                        return {
                            subject: subjectData.name,
                            grade: entry.grade ?? "-",
                            teacher: teacherData.name,
                        };
                    })
                );

                setGradeTable(tableData);
            } catch (error) {
                console.error("Erro ao carregar notas:", error);
            }
        };

        fetchGrades();
    }, [refresh]);

    const postGrade = async (subjectId: number) => {
        try {
            await _grade.postGrade(subjectId);
            setRefresh(prev => !prev);
        } catch (error) {
            Swal.fire({
                title: "Erro",
                text: "A matéria não foi cadastrada por conta de um erro",
                icon: "error"
            });
        }
    };

    return(
        <>
            <div>
                <div>
                    {subjectsId.map((e, index) => (
                        <div key={e}>
                            <p>{subjectsName[index]}</p>
                            <p>Professor: {teachersName[index]}</p>
                            <Button title="Matricular" onClick={() => postGrade(e)} />
                        </div>
                    ))}
                </div>
                <div>
                    <Table
                        thList={["Matéria", "Nota", "Professor"]}
                        tdList={gradeTable}
                        renderRow={(row) => (
                            <>
                                <td>{row.subject}</td>
                                <td>{row.grade}</td>
                                <td>{row.teacher}</td>
                            </>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default Student;
