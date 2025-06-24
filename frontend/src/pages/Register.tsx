import { useNavigate } from "react-router";
import { createRef, useState } from "react";
import Input from "../components/Input";
import Auth from "../server/routes/auth";
import Swal from "sweetalert2";
import '../style/Register.scss';
import UserPreference from "../server/routes/userPreference";
import Preference from "../server/routes/preference";
import Student from "./Student";


const _auth = new Auth();
const _userPreference = new UserPreference();
const _preference = new Preference();

const Register = () => {
    const [showModal, setShowModal] = useState(false);
    const [optInMarketing, setOptInMarketing] = useState(false);
    const [optInAnalytics, setOptInAnalytics] = useState(false);
    const [userPreference, setUserPreference] = useState<{preferenceId: number; status: boolean }[]>([]);
    const [preferences, setPreferences] = useState<{ id: number; name: string; description: string ;optional: boolean}[]>([]);
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);


    const nameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const confPassRef = createRef<HTMLInputElement>();

    const navigate = useNavigate();

    const toLoginPage = () => {
        navigate("/")
    }
    
    const getPreference = async () => {
        try {
            const data = await _preference.getPreferences(); // Busca todas as preferências
            const preferences = data.preferences; // Acessa o array de preferências

            if (!Array.isArray(preferences) || preferences.length === 0) {
                console.error("Nenhuma preferência encontrada.");
                return [];
            }

            // Encontra o maior versionId
            const maxVersionId = Math.max(...preferences.map(pref => pref.versionId));

            // Filtra as preferências com o maior versionId
            const latestPreferences = preferences.filter(pref => pref.versionId === maxVersionId);

            console.log("Preferências com o maior versionId:", latestPreferences);
            return latestPreferences; // Retorna as preferências filtradas
        } catch (error) {
            console.error("Erro ao obter preferências:", error);
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao obter as preferências.",
                icon: "error",
            });
            return [];
        }
    };

    const signUp = async () => {
        if (!hasAcceptedTerms) {
            Swal.fire({
              title: "Erro",
              text: "Você precisa aceitar os termos antes de se cadastrar.",
              icon: "warning",
            });
            return;
          }
        
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
            console.log(userData, userData.data.id);
            for (const preference of userPreference) {
                await _userPreference.postUserPreference(userData.data.id, preference.preferenceId, preference.status);
            }

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

    const handleModalOpen = async () => {
        setShowModal(true);
        const latestPreferences = await getPreference(); // Chama a função para obter as preferências
        setPreferences(latestPreferences); // Atualiza o estado com as preferências retornadas
    };

    const handleModalClose = () => {
        setShowModal(false);
        setPreferences([]); // Limpa as preferências ao fechar o modal
    };

    const handleModalSave = () => {
        const selectedPreferences = preferences.map((preference) => {
            const isChecked = (document.getElementById(`preference-${preference.id}`) as HTMLInputElement)?.checked || false;
            return {
                preferenceId: preference.id,
                status: isChecked,
            };
        });

        console.log("Preferências selecionadas:", selectedPreferences);
        setUserPreference(selectedPreferences);
        
        setHasAcceptedTerms(true);
        // Aqui você pode armazenar `selectedPreferences` em um estado ou enviar para o backend
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

                <button type="button" onClick={handleModalOpen} className="privacy-btn">
                    Ver termos
                </button>

                <button onClick={signUp}>Cadastrar</button>
                <button onClick={toLoginPage}>Já possui uma conta?</button>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Termos</h3>
                            <button className="modal-close" onClick={handleModalClose}>
                                ×
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            {preferences.length > 0 ? (
                                preferences.map((preference) => (
                                <div key={preference.id}>
                                <div className="preference-item1">
                                    {preference.optional ? (
                                    <input type="checkbox" id={`preference-${preference.id}`} />
                                    ) : (
                                    <input type="checkbox" id={`preference-${preference.id}`} defaultChecked disabled />
                                    )}
                                    <h4>{preference.name}</h4>
                                </div>
                                <div className="preference-item2">
                                    <p>{preference.description}</p>
                                </div>
                                </div>

                                ))
                            ) : (
                                <p>Carregando preferências...</p>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={handleModalClose}>
                                Cancelar
                            </button>
                            <button className="btn-primary" onClick={handleModalSave}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
