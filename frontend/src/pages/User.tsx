import { createRef, useEffect, useState } from "react";
import Input from "../components/Input";
import User from "../server/routes/user";
import Button from "../components/Button";
import Auth from "../server/routes/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


const _user = new User();
const _auth = new Auth();

const UserPage = () => {
    const nameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();

    const pass1Ref = createRef<HTMLInputElement>();
    const pass2Ref = createRef<HTMLInputElement>();

    const [userId, setUserId] = useState<number>(0);
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const [userType, setUserType] = useState<string>();

    const navigate = useNavigate();

    const backPage = () => {
        if(userType === "0") navigate("/admin");
        if(userType === "1") navigate("/teacher");
        if(userType === "2") navigate("/student");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await _user.getLoggedUser();
                setFormData({
                    name: userData.name || "",
                    email: userData.email || ""
                });
                setUserId(userData.id);
                setUserType(userData.userType);
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const changeUserData = async () => {
        const name = nameRef.current?.value;
        const email = emailRef.current?.value;

        try {
            await _user.patchUser(userId, name, email, undefined);
            Swal.fire({
                title: "Sucesso",
                text: "Os dados foram alterados com sucesso",
                icon: "success"
            });

        } catch (e) {
            Swal.fire({
                title: "Erro",
                text: "Os dados não foram alterados por conta de um erro",
                icon: "error"
            });
        }
    };

    const changePassword = async (pass1: string) => {
        try {
            await _user.patchUser(userId, undefined, undefined, pass1);

            Swal.fire({
                title: "Sucesso",
                text: "Sua senha foi alterada com sucesso",
                icon: "success"
            });

            if (passwordRef.current) passwordRef.current.value = "";
            if (pass1Ref.current) pass1Ref.current.value = "";
            if (pass2Ref.current) pass2Ref.current.value = "";
        } catch(e) {
            Swal.fire({
                title: "Erro",
                text: "A senha não foi mudada por conta de um erro",
                icon: "error"
            });
        }
    };

    const verifyPassword = async () => {
        const password = passwordRef.current?.value;
        const pass1 = pass1Ref.current?.value;
        const pass2 = pass2Ref.current?.value;
        if(!password || !pass1 || !pass2) {
            return Swal.fire({
                title: "Erro",
                text: "Existe um campo não preenchido",
                icon: "warning"
            });
        }

        if(pass1 !== pass2) {
            return Swal.fire({
                title: "Erro",
                text: "As senhas não são iguais",
                icon: "warning"
            });
        }

        const response = await _auth.login(formData.email, password);

        if(response.status === "success") {
            changePassword(pass1);
        } else {
            Swal.fire({
                title: "Erro",
                text: "Senha incorreta",
                icon: "error"
            });
        }
    };

    return (
        <>
            {/* Foto do usuário?? */}
            <div></div>

            {/* Botões */}
            <div>
                <h1>EDITAR USUÁRIO</h1>
                <Input labelId="name" labelName="Nome" type="text" value={formData.name} onChange={handleChange} reference={nameRef} />
                <Input labelId="email" labelName="Email" type="email" value={formData.email} onChange={handleChange} reference={emailRef} />
                <Button title={"Mudar dados"} onClick={changeUserData} />

                <h3>Deseja mudar sua senha?</h3>
                <Input labelId={"password"} labelName={"Senha"} type={"password"} reference={passwordRef} />
                <Input labelId={"pass1"} labelName={"Digite sua nova senha"} type={"password"} reference={pass1Ref} />
                <Input labelId={"pass2"} labelName={"Confirme sua nova senha"} type={"password"} reference={pass2Ref} />
                <Button title={"Mudar senha"} onClick={verifyPassword} />
            </div>
            <Button title={"Voltar"} onClick={backPage} />
        </>
    );
};

export default UserPage;
