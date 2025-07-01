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
import Preference from "../server/routes/preference";

const _user = new User();
const _auth = new Auth();
const _userPreference = new UserPreference();
const _preference = new Preference();

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
    const [preferences, setPreferences] = useState<{ id: number; name: string; description: string; optional: boolean }[]>([]);
    const [nonOptionalAccepted, setNonOptionalAccepted] = useState(false);
    


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
    

    const getUserPreferences = async () => {
        // console.log(userId)
        try {
            const data = await _userPreference.getUserPreferenceById(userId);
            const userPreferences = data.preferences; // Acessa o array de preferências do usuário
            setUserPreferences(userPreferences);
            
            console.log("Dados do usuário:", userPreferences);
        } catch (error) {
            console.error("Erro ao buscar preferências do usuário:", error);
        }
    }



    const getPreference = async () => {
        try {
            const data = await _preference.getPreferences(); // Busca todas as preferências
            const preferences = data.preferences; // Acessa o array de preferências

            if (!Array.isArray(preferences) || preferences.length === 0) {
                console.error("Nenhuma preferência encontrada.");
                setPreferences([]);
                return [];
            }

            // Encontra o maior versionId
            const maxVersionId = Math.max(...preferences.map(pref => pref.versionId));

            // Filtra as preferências com o maior versionId
            const latestPreferences = preferences.filter(pref => pref.versionId === maxVersionId);
            
            setPreferences(latestPreferences); // Atualiza o estado com as preferências filtradas
            // console.log("Preferências com o maior versionId:", latestPreferences);
            // console.log(preferences)
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

    const getMostRecentUserPreferences = () => {
        const preferenceMap = new Map<number, { preferenceId: number; status: boolean; updatedAt: string }>();
      
        userPreferences.forEach((userPref) => {
          const existing = preferenceMap.get(userPref.preferenceId);
      
          // Substitui a preferência se for mais recente ou se ainda não existir no mapa
          if (!existing || new Date(userPref.updatedAt) > new Date(existing.updatedAt)) {
            preferenceMap.set(userPref.preferenceId, userPref);
          }
        });
      
        return Array.from(preferenceMap.values());
    };

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


    const handleModalOpen = async () => {
        setShowModal(true);
        const latestPreferences = await getPreference(); // Carrega as preferências ao abrir o modal
        await getUserPreferences(); // Carrega as preferências do usuário
        // await getUserPreferencesByStudentIdAndPreferenceId(userId,); // Exemplo de chamada para obter uma preferência específica
        setPreferences(latestPreferences); // Atualiza o estado com as preferências retornadas
    }

    const handleModalClose = async () => {
        try {
            // Filtra os termos opcionais
            const optionalPreferences = preferences.filter((preference) => preference.optional);
        
            for (const preference of optionalPreferences) {
                const userPreference = userPreferences.find(
                    (userPref) => userPref.preferenceId === preference.id
                );
        
                // Se o termo opcional não existe no banco de dados, registra como false
                if (!userPreference) {
                    await handlePreferenceChange(preference.id, false); // Envia false para o banco
                }
            }
        
            // Fecha o modal após salvar os dados
            setShowModal(false);
        } catch (error) {
            console.error("Erro ao salvar termos opcionais:", error);
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao salvar os termos opcionais.",
                icon: "error",
            });
        }
    };

    const handleModalSave = () => {

    };

    const handlePreferenceChange = async (preferenceId: number, status: boolean) => {
        try {
            // Faz o POST para registrar o log da preferência
            await _userPreference.postUserPreference(userId, preferenceId, status);
        
            // Atualiza o estado local para refletir a mudança e registrar a data/hora atual
            setUserPreferences((prev) =>
            prev.map((pref) =>
                pref.preferenceId === preferenceId
                ? { ...pref, status, updatedAt: new Date().toISOString() } // Atualiza o status e a data/hora
                : pref
            )
            );
        
            console.log(`Log registrado: Preferência ${preferenceId} atualizada para ${status}`);
        } catch (error) {
            console.error(`Erro ao registrar o log da preferência ${preferenceId}:`, error);
            Swal.fire({
            title: "Erro",
            text: "Ocorreu um erro ao registrar o log da preferência.",
            icon: "error",
            });
        }
    };

    useEffect(() => {
        // Aceita automaticamente os termos não opcionais
        const acceptNonOptionalPreferences = async () => {
            const nonOptionalPreferences = preferences.filter((preference) => !preference.optional);
        
            for (const preference of nonOptionalPreferences) {
                const alreadyAccepted = userPreferences.find(
                    (userPref) => userPref.preferenceId === preference.id && userPref.status === true
                );
        
                // Se o termo não foi aceito ainda, registra a aceitação
                if (!alreadyAccepted) {
                    await handlePreferenceChange(preference.id, true); // Aceita automaticamente
                }
            }

            // Marca que os termos não opcionais foram aceitos
            setNonOptionalAccepted(true);
        };
        
        if (!nonOptionalAccepted && preferences.length > 0 && userPreferences.length > 0) {
            acceptNonOptionalPreferences();
        }
    }, [preferences, userPreferences, nonOptionalAccepted]); // Executa sempre que preferences ou userPreferences forem atualizados

    return (
        <>
        <Button title={"Voltar"} onClick={backPage} className="button-back" />
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

            <h3>Termos</h3>

           < Button title={"Atualizar Termos"} onClick={handleModalOpen} />
            <h3>Deletar conta</h3>  
            <Button title={"Deletar conta"} onClick={deleteAccount} />
            {showModal && (
                <div className="modal-overlay" onClick={handleModalClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Termos</h3>
                        </div>
                        
                        <div className="modal-body">
                            {preferences.length > 0 && userPreferences.length > 0 ? (
                                preferences.map((preference) => {
                                    // Filtra as userPreferences para obter apenas a mais recente para cada preferenceId
                                    const filteredUserPreferences = getMostRecentUserPreferences();

                                    // Encontra a preferência correspondente no array filtrado
                                    const userPreference = filteredUserPreferences.find(
                                        (userPref) => userPref.preferenceId === preference.id
                                    );

                                    const isAccepted = userPreference?.status === true;

                                    return (
                                        <div key={preference.id} className="checkbox-container">
                                            <label className="checkbox-label">
                                                {preference.optional ? (
                                                    <input
                                                        type="checkbox"
                                                        id={`preference-${preference.id}`}
                                                        defaultChecked={isAccepted} // Marca o checkbox se o status for true
                                                        onChange={(e) =>
                                                            handlePreferenceChange(preference.id, e.target.checked)
                                                        } // Chama a função ao alterar o estado do checkbox
                                                    />
                                                ) : (
                                                    <input
                                                        type="checkbox"
                                                        id={`preference-${preference.id}`}
                                                        defaultChecked
                                                        disabled // Desabilita o checkbox se a preferência não for opcional
                                                    />
                                                )}
                                                {preference.name}
                                            </label>
                                            <p>{preference.description}</p>

                                            {/* Exibe a mensagem com a data e horário de aceitação ou negação */}
                                            {userPreference && (
                                                <p>
                                                    Este termo foi{" "}
                                                    <strong>{isAccepted ? "Aceito" : "Negado"}</strong> em{" "}
                                                    {new Date(userPreference.updatedAt).toLocaleString("pt-BR", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Carregando preferências...</p>
                            )}
                        </div>

                        <div className="modal-footer">

                            <button className="btn-primary" onClick={handleModalClose}>
                                Salvar 
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
          </div>
        </div>
    </>
        
      );
};

export default UserPage;
