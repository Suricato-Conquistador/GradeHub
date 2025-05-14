import { createRef } from "react";
import Swal from "sweetalert2";
import Input from "../components/Input";
import Button from "../components/Button";
import Auth from "../server/routes/auth";
import '../style/Login.scss';



const auth = new Auth()

const Login = () => {
    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()

    const signIn = async() => {
        try {
            const email = emailRef.current?.value
            const password = passwordRef.current?.value

            if(!email || !password) {
                return Swal.fire({
                    title: "Erro",
                    text: "Existe um campo não preenchido",
                    icon: "warning"
                })
            }

            const token = await auth.login(email, password)
            console.log(token.token)
            sessionStorage.setItem("authentication", token.token)
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

    return(
        <div className="content">
            

            <div className="p-rt">
                <div className="box">
                    <h1>LOGIN</h1>

                    <div>
                        <Input labelId={"email"} labelName={"Email"} type={"text"} reference={emailRef} />
                        <Input labelId={"password"} labelName={"Senha"} type={"password"} reference={passwordRef} />
                        <a href="/admin">
                            <Button title={"Logar"} onClick={signIn} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
