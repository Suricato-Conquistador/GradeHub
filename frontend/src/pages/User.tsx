import { createRef, useEffect, useState } from "react";
import Input from "../components/Input";
import User from "../server/routes/user";
import Button from "../components/Button";
import Auth from "../server/routes/auth";
import '../style/User.scss';


const user = new User();
const auth = new Auth();

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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await user.getLoggedUser();
                setFormData({
                    name: userData.name || "",
                    email: userData.email || ""
                });
                setUserId(userData.id);
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
            const response = await user.patchUser(userId, name, email, undefined);
            console.log(response);
        } catch (e) {
            console.log(e)
        }
    };

    const changePassword = async (pass1: string) => {
        try {
            const response = await user.patchUser(userId, undefined, undefined, pass1);
            console.log(response)
        } catch(e) {
            console.log(e);
        }
    };

    const verifyPassword = async () => {
        const password = passwordRef.current?.value;
        const pass1 = pass1Ref.current?.value;
        const pass2 = pass2Ref.current?.value;
        if(!password || !pass1 || !pass2) {
            console.log("CAMPO VAZIO")
            return
        }

        if(pass1 !== pass2) {
            console.log("Senhas diferentes");
            return
        }

        const response = await auth.login(formData.email, password);

        if(response.status === "success") {
            changePassword(pass1);
        } else {
            console.log("Senha errada");
        }
    };

    return (
        <div className="userpage-container">
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
        </div>
      );
      
};

export default UserPage;
