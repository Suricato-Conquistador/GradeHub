import { UserTable } from "../interfaces/user.interface";
import { createRef, useEffect, useState } from "react";
import Subject from "../server/routes/subject";
import Button from "../components/Button";
import Select from "../components/Select";
import User from "../server/routes/user";
import Auth from "../server/routes/auth";
import Input from "../components/Input";
import Table from "../components/Table";
import Swal from "sweetalert2";


const subject = new Subject();
const auth = new Auth();
const user = new User();


const Admin = () => {
    const nameRef = createRef<HTMLInputElement>();
    const raRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const confPassRef = createRef<HTMLInputElement>();
    const [selected, setSelected] = useState('');

    const nameSubjectRef = createRef<HTMLInputElement>();
    const teacherIdRef = createRef<HTMLSelectElement>();

    const [userIds, setUserIds] = useState<number[]>([]);
    const [userNames, setUserNames] = useState<string[]>([]);

    const [teacherTable, setTeacherTable] = useState<UserTable[]>([]);
    const [studentTable, setStudentTable] = useState<UserTable[]>([]);


    useEffect(() => {
        const fetchUsers = async () => {
            const data = await user.getTeachers();
            setUserIds(data.map((user: any) => user.id));
            setUserNames(data.map((user: any) => user.name));
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchUsersTable = async () => {
            const dataTeachers = await user.getTeachers();
            // console.log("Teachers:", dataTeachers);
            setTeacherTable(dataTeachers.map((teacher: any) => ({
                ra: teacher.RA,
                name: teacher.name,
                email: teacher.email
            })));
            
            const dataStudents = await user.getStudents();
            // console.log("Students:", dataStudents);
            setStudentTable(dataStudents.map((student: any) => ({
                ra: student.RA,
                name: student.name,
                email: student.email
            })));
        };

        fetchUsersTable();
    }, []);


    const signUp = async () => {
        try {
            const name = nameRef.current?.value;
            const ra = raRef.current?.value;
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
            const confPass = confPassRef.current?.value;
            
            if(!name || !ra || !email || !password || !confPass || !selected) {
                return Swal.fire({
                    title: "Erro",
                    text: "Existe um campo não preenchido",
                    icon: "warning"
                })
            } if (password !== confPass) {
                return Swal.fire({
                    title: "Erro",
                    text: "As senhas não são iguais",
                    icon: "warning"
                })
            }

            await auth.signUp(selected, ra, name, email, password, confPass)
            return Swal.fire({
                title: "Sucesso",
                text: `O usuário foi cadastrado`,
                icon: "success"
            })

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Erro",
                text: `O usuário não foi cadastrado por conta de um erro: ${error}`,
                icon: "error"
                })
        }
    };

    const postSubject = async () => {
        try {
            const nameSubject = nameSubjectRef.current?.value;
            const teacherId = teacherIdRef.current?.value;
            
            console.log(nameSubject)
            console.log(teacherId)

            if(!nameSubject || !teacherId){
                return Swal.fire({
                    title: "Erro",
                    text: "Existe um campo não preenchido",
                    icon: "warning"
                });
            }

            await subject.postSubject(nameSubject, teacherId);

            return Swal.fire({
                title: "Sucesso",
                text: `A matéria foi cadastrada`,
                icon: "success"
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Erro",
                text: `A matéria não foi cadastrada por conta de um erro: ${error}`,
                icon: "error"
                })
        }
    };

    return(
        <>
            {/* criação de usuario */}
            <div>
                <Input labelId={"name"} labelName={"Nome"} type={"text"} reference={nameRef} />
                <Input labelId={"ra"} labelName={"RA"} type={"text"} reference={raRef} />
                <Input labelId={"email"} labelName={"Email"} type={"email"} reference={emailRef} />
                <Input labelId={"password"} labelName={"Senha"} type={"password"} reference={passwordRef} />
                <Input labelId={"confirmPassword"} labelName={"Confirme a senha"} type={"password"} reference={confPassRef} />

                <Input labelId={"teacher"} labelName={"Professor"} type={"radio"} name={"choice"} value={"1"} onChange={(e: any) => setSelected(e.target.value)} checked={selected === "1"} />
                <Input labelId={"student"} labelName={"Aluno"} type={"radio"} name={"choice"} value={"2"} onChange={(e: any) => setSelected(e.target.value)} checked={selected === "2"} />
                <Button title={"Cadastrar usuário"} onClick={signUp} />
            </div><br/>

            <div>
                {/* tabela professores */}
                <h1>Professores</h1>
                <section>
                    <Table thList={["RA", "Nome", "Email"]} tdList={teacherTable} />
                </section><br/>
                {/* tabela alunos */}
                <h1>Alunos</h1>
                <section>
                    <Table thList={["RA", "Nome", "Email"]} tdList={studentTable} />
                </section>
            </div><br/>
            {/* cadastrar matéria */}
            <div>
                <Input labelId={"subjectName"} labelName={"Nome da matéria"} type={"text"} reference={nameSubjectRef} />
                <Select options={userIds} optionsName={userNames} reference={teacherIdRef} />
                <Button title={"Cadastrar matéria"} onClick={postSubject} />
            </div>
        </>
    )
}

export default Admin;
