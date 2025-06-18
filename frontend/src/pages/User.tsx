import { createRef, useEffect, useState } from "react";
import Input from "../components/Input";
import User from "../server/routes/user";
import Button from "../components/Button";
import Auth from "../server/routes/auth";
import '../style/User.scss';
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Table from "../components/Table";
import { UserPreferenceTable } from "../interfaces/userPreference.interface";
import UserPreference from "../server/routes/userPreference";
import { formatDateString } from "../utils/formatDate";


const _user = new User();
const _auth = new Auth();
const _userPreference = new UserPreference();

const UserPage = () => {
    const [showModal, setShowModal] = useState(false);
    const nameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    

    const pass1Ref = createRef<HTMLInputElement>();
    const pass2Ref = createRef<HTMLInputElement>();
    
    const [optInAnalytics, setOptInAnalytics] = useState(false);
    const [optInMarketing, setOptInMarketing] = useState(false);
    const [userId, setUserId] = useState<number>(0);
    const [preferenceId0, setPreferenceId0] = useState<number>(0);
    const [preferenceId1, setPreferenceId1] = useState<number>(0);

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const [userPreferences, setUserPreferences] = useState<UserPreferenceTable[]>([]);
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
    
    useEffect(() => {
        const fetchUserPreferences = async () => {
            try {
                const userData = await _user.getLoggedUser();
                const preferences = await _userPreference.getUserPreferenceByStudentId(userData.id);
                console.log(preferences.preferences);
                setUserPreferences(preferences.preferences);
                setPreferenceId0(preferences.preferences[0]?.id);
                setPreferenceId1(preferences.preferences[1]?.id);
            } catch (error) {
                console.error("Erro ao buscar preferências do usuário:", error);
            }
        }
        fetchUserPreferences();
    },[])

    const patchUserPreference = async ( status1: boolean, status2: boolean) => {
        try {
            
            await _userPreference.patchUserPreference(preferenceId0, "0" , status1);
            await _userPreference.patchUserPreference(preferenceId1, "1" ,status2);

        
        } catch (error) {
            console.error("Erro ao atualizar preferências do usuário:", error);
            
        }
    }


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

    const deleteAccount = async () => {
        try {
            const result = await Swal.fire({
                title: "Digite a sua senha",
                input: "password",
                inputLabel: "Senha",
                inputPlaceholder: "Digite sua senha",
                inputAttributes: {
                    autocapitalize: "off",
                    autocorrect: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar"
            });

            if (result.isConfirmed && result.value) {
                const password = result.value;

                const response = await _auth.login(formData.email, password);
                
                if(response.status === "success") {
                    await _user.deleteUser(userId);

                    Swal.fire({
                        title: "Sucesso",
                        text: "O usuário foi deletado com sucesso",
                        icon: "success"
                    });

                    navigate("/")
                } else {
                    Swal.fire({
                        title: "Erro",
                        text: "Senha incorreta",
                        icon: "error"
                    });
                }
            }
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
        patchUserPreference(optInMarketing, optInAnalytics);
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

            <h3>Preferencia de Privacidade</h3>
            <Table
              thList={["Nome", "Aceita", "Rejeitada","Status"]}
              tdList={userPreferences}
              renderRow={(row:any) => (
                <>
                  <td>{row.type == "0" ? "Emails de Marketing" : "Participar de Feedbacks" }</td>
                  <td>{row.accepted ? formatDateString(row.accepted.toString()):"-"}</td>
                  <td>{row.rejected ? formatDateString(row.rejected.toString()):"-"}</td>
                  <td>{row.status ? "Aceito": "Rejeitado" }</td>
                </>
              )
            }
            />
           < Button title={"Atualizar preferências"} onClick={() => setShowModal(true)} />
            <h3>Deletar conta</h3>
            <Button title={"Deletar conta"} onClick={deleteAccount} />
            {showModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Preferências de Privacidade</h3>

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
                                        checked={optInAnalytics } 
                                        defaultChecked 
                                        onChange={() => setOptInAnalytics(!optInAnalytics)}
                                    />
                                    <span className="checkmark"></span>
                                    Autorizo receber pedidos de feedback.
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
        </div>
        
      );
};

export default UserPage;
