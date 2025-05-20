import { useNavigate } from "react-router";
import { createRef } from "react";
import Swal from "sweetalert2";
import Input from "../components/Input";
import Button from "../components/Button";
import Auth from "../server/routes/auth";
import '../style/Login.scss';


const auth = new Auth();


const Login = () => {
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    const navigate = useNavigate();

    const signIn = async () => {
        try {
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;

            if (!email || !password) {
                return Swal.fire({
                    title: "Erro",
                    text: "Existe um campo não preenchido",
                    icon: "warning"
                });
            }

            const response = await auth.login(email, password);
            console.log(response);
            console.log(response.userType);
            sessionStorage.setItem("authentication", response.token);
            
            Swal.fire({
                title: "Sucesso",
                text: `O usuário foi logado`,
                icon: "success"
            });

            if (response.userType === "0") navigate("/admin")
            if (response.userType === "1") navigate("/teacher")
            if (response.userType === "2") navigate("/student")

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Erro",
                text: `O usuário não foi logado por conta de um erro: ${error}`,
                icon: "error"
              })
        }
    };

    return(
        <div className="content">
            

            <div className="p-rt">
                <div className="box">
                    <h1>LOGIN</h1>

                    <div>
                        <Input labelId={"email"} labelName={"Email"} type={"text"} reference={emailRef} />
                        <Input labelId={"password"} labelName={"Senha"} type={"password"} reference={passwordRef} />
                        <Button title={"Logar"} onClick={signIn} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
