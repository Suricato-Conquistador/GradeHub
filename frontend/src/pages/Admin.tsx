import { UserTable } from "../interfaces/user.interface";
import { createRef, useEffect, useState } from "react";
import Subject from "../server/routes/subject";
import Button from "../components/Button";
import Select from "../components/Select";
import User from "../server/routes/user";
import '../style/Admin.scss';
import Auth from "../server/routes/auth";
import Input from "../components/Input";
import Table from "../components/Table";
import Swal from "sweetalert2";


const subject = new Subject();
const auth = new Auth();
const user = new User();

const Admin = () => {
    const nameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const confPassRef = createRef<HTMLInputElement>();

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
                ra: teacher.userCode,
                name: teacher.name,
                email: teacher.email
            })));
            
            const dataStudents = await user.getStudents();
            // console.log("Students:", dataStudents);
            setStudentTable(dataStudents.map((student: any) => ({
                ra: student.userCode,
                name: student.name,
                email: student.email
            })));
        };

        fetchUsersTable();
    }, []);


    const signUp = async () => {
        try {
            const name = nameRef.current?.value;
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
            const confPass = confPassRef.current?.value;
            
            if(!name || !email || !password || !confPass) {
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

            await auth.signUp("1", name, email, password, confPass)

            if (nameRef.current) nameRef.current.value = "";
            if (emailRef.current) emailRef.current.value = "";
            if (passwordRef.current) passwordRef.current.value = "";
            if (confPassRef.current) confPassRef.current.value = "";

            return Swal.fire({
                title: "Sucesso",
                text: `O usuário foi cadastrado`,
                icon: "success"
            });

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Erro",
                text: `O usuário não foi cadastrado por conta de um erro: ${error}`,
                icon: "error"
            });
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

            if (nameSubjectRef.current) nameSubjectRef.current.value = "";
            if (teacherIdRef.current) teacherIdRef.current.value = "";

            return Swal.fire({
                title: "Sucesso",
                text: `A matéria foi cadastrada`,
                icon: "success"
            });
        } catch (error) {
            return Swal.fire({
                title: "Erro",
                text: `A matéria não foi cadastrada por conta de um erro: ${error}`,
                icon: "error"
            });
        }
    };

    return(
        <div className="admin-container">
            <div className="cadastros">
                <div className="cadastro-user">
                    <h2>Cadastro Aluno / Professor</h2>
                    <Input labelId="name" labelName="Nome" type="text" reference={nameRef} />
                    <Input labelId="email" labelName="Email" type="email" reference={emailRef} />
                    <Input labelId="password" labelName="Senha" type="password" reference={passwordRef} />
                    <Input labelId="confirmPassword" labelName="Confirme a senha" type="password" reference={confPassRef} />

                    <Button title="Cadastrar usuário" onClick={signUp} />
                </div>

                <div className="cadastro-materia">
                    <h2>Cadastro Matéria</h2>
                    <Input labelId="subjectName" labelName="Nome da matéria" type="text" reference={nameSubjectRef} />
                    <Select options={userIds} optionsName={userNames} title="Selecione o professor" reference={teacherIdRef} />
                    <Button title="Cadastrar matéria" onClick={postSubject} />
                </div>
            </div>

            <div className="tabelas">
                <section>
                    <h3>Professores</h3>
                    <Table thList={["RA", "Nome", "Email"]} tdList={teacherTable} />
                </section>

                <section>
                    <h3>Alunos</h3>
                    <Table thList={["RA", "Nome", "Email"]} tdList={studentTable} />
                </section>
            </div>
        </div>
    );
};

export default Admin;
