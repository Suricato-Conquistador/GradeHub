import { createRef } from "react";
import Swal from "sweetalert2";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import Auth from "../server/routes/auth";
import User from "../server/routes/user";
import '../style/Admin.scss';



const auth = new Auth()
const user = new User()

const Admin = () => {
    const nameRef = createRef<HTMLInputElement>()
    const raRef = createRef<HTMLInputElement>()
    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()
    const confPassRef = createRef<HTMLInputElement>()
    const radioRef = createRef<HTMLInputElement>()

    const nameSubjectRef = createRef<HTMLInputElement>()


    const signUp = async() => {
        try {
            const name = nameRef.current?.value
            const ra = raRef.current?.value
            const email = emailRef.current?.value
            const password = passwordRef.current?.value
            const confPass = confPassRef.current?.value
            const radio = radioRef.current?.value
            
            if(!name || !ra || !email || !password || !confPass || !radio) {
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

            await auth.signUp(radio, ra, name, email, password, confPass)
            Swal.fire({
                title: "Sucesso",
                text: `O usuário foi logado`,
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
    }

    const getTeachers = async() => {
        try {

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Erro",
                text: `O usuário não foi cadastrado por conta de um erro: ${error}`,
                icon: "error"
                })
        }
    }
    
    const getStudents = async() => {
        try {
            
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Erro",
                text: `O usuário não foi cadastrado por conta de um erro: ${error}`,
                icon: "error"
                })
        }
    }

    return(
        <>
           return (
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
      </section>

      <section>
        <h3>Alunos</h3>
        {/* tabela alunos aqui */}
      </section>
    </div>
  </div>
);


        </>
    )
}

export default Admin;
