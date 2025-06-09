import { useNavigate } from "react-router";
import { createRef } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Auth from "../server/routes/auth";
import Swal from "sweetalert2";


const _auth = new Auth();

const Register = () => {
    const nameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const confPassRef = createRef<HTMLInputElement>();

    const navigate = useNavigate();

    const toLoginPage = () => {
        navigate("/")
    }

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
                });
            } if (password !== confPass) {
                return Swal.fire({
                    title: "Erro",
                    text: "As senhas não são iguais",
                    icon: "warning"
                });
            }

            await _auth.signUp("2", name, email, password, confPass);

            if (nameRef.current) nameRef.current.value = "";
            if (emailRef.current) emailRef.current.value = "";
            if (passwordRef.current) passwordRef.current.value = "";
            if (confPassRef.current) confPassRef.current.value = "";
                
            navigate("/")

            return Swal.fire({
                title: "Sucesso",
                text: `O usuário foi cadastrado`,
                icon: "success"
            });

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Erro",
                text: "O usuário não foi cadastrado por conta de um erro",
                icon: "error"
            });
        }
    };

    return(
        <div className="cadastro-user">
            <h2>Registre-se no GradeHub</h2>
            <Input labelId="name" labelName="Nome" type="text" reference={nameRef} />
            <Input labelId="email" labelName="Email" type="email" reference={emailRef} />
            <Input labelId="password" labelName="Senha" type="password" reference={passwordRef} />
            <Input labelId="confirmPassword" labelName="Confirme a senha" type="password" reference={confPassRef} />

            <Button title="Cadastrar" onClick={signUp} />
            <Button title="Já possui uma conta?" onClick={toLoginPage} />
        </div>
    );
};

export default Register;
