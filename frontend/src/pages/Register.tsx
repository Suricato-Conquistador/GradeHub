import { useNavigate } from "react-router";
import { createRef, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Auth from "../server/routes/auth";
import Swal from "sweetalert2";
import '../style/Register.scss';
import UserPreference from "../server/routes/userPreference";


const _auth = new Auth();
const _userPreference = new UserPreference();

const Register = () => {
    const [showModal, setShowModal] = useState(false);
    const [optInMarketing, setOptInMarketing] = useState(false);
    const [optInAnalytics, setOptInAnalytics] = useState(false);

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
            
            const userData = await _auth.signUp("2", name, email, password, confPass);
            console.log(userData);
            await _userPreference.postUserPreference(userData.data.id,"1",optInAnalytics,optInAnalytics, optInAnalytics );
            await _userPreference.postUserPreference(userData.data.id,"0",optInMarketing,optInMarketing,optInMarketing,);

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

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalSave = () => {
        console.log("Preferências salvas:", { optInMarketing, optInAnalytics });
        setShowModal(false);
    };

    return(
        <div className="content">
            <div className="cadastro-user">
                <h2>Registre-se no GradeHub</h2>

                <div className="input-container">
                    <Input labelId="name" labelName="Nome" type="text" reference={nameRef} />
                </div>
                <div className="input-container">
                    <Input labelId="email" labelName="Email" type="email" reference={emailRef} />
                </div>
                <div className="input-container">
                    <Input labelId="password" labelName="Senha" type="password" reference={passwordRef} />
                </div>
                <div className="input-container">
                    <Input labelId="confirmPassword" labelName="Confirme a senha" type="password" reference={confPassRef} />
                </div>

                <button type="button" onClick={() => setShowModal(true)} className="privacy-btn">
                    Gerenciar preferências de privacidade
                </button>

                <button onClick={signUp}>Cadastrar</button>
                <button onClick={toLoginPage}>Já possui uma conta?</button>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Preferências de Privacidade</h3>
                            <button className="modal-close" onClick={handleModalClose}>
                                ×
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="checkbox-container">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={optInMarketing}
                                        onChange={() => setOptInMarketing(!optInMarketing)}
                                    />
                                    <span className="checkmark"></span>
                                    Desejo receber e-mails sobre novas matérias.
                                </label>
                            </div>

                            <div className="checkbox-container">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={optInAnalytics}
                                        onChange={() => setOptInAnalytics(!optInAnalytics)}
                                    />
                                    <span className="checkmark"></span>
                                    Autorizo o uso dos meus dados acadêmicos para fins estatísticos.
                                </label>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={handleModalClose}>
                                Cancelar
                            </button>
                            <button className="btn-primary" onClick={handleModalSave}>
                                Salvar Preferências
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;

