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
  <div className="admin-container">
    {/* Área de cadastros lado a lado */}
    <div className="cadastros">
      
      {/* Cadastro de Aluno/Professor */}
      <div className="cadastro-user">
        <h2>Cadastro Aluno / Professor</h2>
        <Input labelId="name" labelName="Nome" type="text" reference={nameRef} />
        <Input labelId="ra" labelName="RA" type="text" reference={raRef} />
        <Input labelId="email" labelName="Email" type="email" reference={emailRef} />
        <Input labelId="password" labelName="Senha" type="password" reference={passwordRef} />
        <Input labelId="confirmPassword" labelName="Confirme a senha" type="password" reference={confPassRef} />

        <div className="radio-group">
          <label>
            <Input labelId="teacher" labelName="Professor" type="radio" name="choice" reference={radioRef} value="1" />
            
          </label>
          <label>
            <Input labelId="student" labelName="Aluno" type="radio" name="choice" reference={radioRef} value="2" />
            
          </label>
        </div>

        <Button title="Cadastrar usuário" onClick={signUp} />
      </div>

      {/* Cadastro de Matéria */}
      <div className="cadastro-materia">
        <h2>Cadastro Matéria</h2>
        <Input labelId="subjectName" labelName="Nome da matéria" type="text" reference={nameSubjectRef} />
        <Select options={[]} optionsName={[]} />
        <Button title="Cadastrar matéria" />
      </div>
    </div>

    {/* Área de tabelas abaixo */}
    <div className="tabelas">
      <section>
        <h3>Professores</h3>
        {/* tabela professores aqui */}
        <Table thList={["RA", "Nome", "Email"]} tdList={teacherTable} />
      </section>

      <section>
        <h3>Alunos</h3>
        {/* tabela alunos aqui */}
        <Table thList={["RA", "Nome", "Email"]} tdList={studentTable} />
      </section>
    </div>
  </div>
        </>
    )
}

export default Admin;
