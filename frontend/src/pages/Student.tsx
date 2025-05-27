import { createRef, useEffect, useState } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Swal from "sweetalert2";
import Grade from "../server/routes/grade";
import Subject from "../server/routes/subject";
import User from "../server/routes/user";
import SubjectStudents from "../server/routes/subjectStudents";


const user = new User()
const grade = new Grade()
const subject = new Subject()
const subjectStudents = new SubjectStudents()

const Student = () => {
    const [subjectsId, setSubjectsId] = useState<number[]>([]);
    const [subjectsName, setSubjectsName] = useState<string[]>([]);
    const [teachersName, setTeachersName] = useState<string[]>([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            const data = await subject.getSubjects();

            const ids = data.map((e: any) => e.id);
            const names = data.map((e: any) => e.name);
            const teacherIds = data.map((e: any) => e.teacherId);

            console.log(await subjectStudents.getSubjectsByStudentId())

            const teachers = await Promise.all(
                teacherIds.map(async (id: number) => {
                    const teacherData = await user.getUserById(id);
                    return teacherData.name;
                })
            );
            setSubjectsId(ids);
            setSubjectsName(names);
            setTeachersName(teachers);
        };

        fetchSubjects();
    }, []);

    const postGrade = async (id: number) => {
        try {

            await grade.postGrade(id);

        } catch (error) {
            Swal.fire({
                title: "Erro",
                text: `A matéria não foi cadastrada por conta de um erro: ${error}`,
                icon: "error"
            })
        }
    };

    const subjectAndTeacher = async () => {
        try {
            await subjectStudents.getSubjectsByStudentId()
            return subjectStudents;
        } catch(e) {
            console.log(e)
        }
    }

    return(
        <>
            <div>
                <div>
                    {subjectsId.map((e, index) => (
                        <div key={e}>
                            <p>{subjectsName[index]}</p>
                            <p>{teachersName[index]}</p>
                            <Button title="Matricular" onClick={() => postGrade(e)} />
                        </div>
                    ))}
                </div>
                {/* <div>
                    <Table thList={["a", "b", "c"]} tdList={[]} />
                </div> */}
            </div>
        </>
    );
};

export default Student;
