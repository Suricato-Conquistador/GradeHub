import { useEffect, useState } from "react";
import Table from "../components/Table";
import Button from "../components/Button";
import Grade from "../server/routes/grade";
import Subject from "../server/routes/subject";
import User from "../server/routes/user";
import SubjectStudents from "../server/routes/subjectStudents";
import { GradeTableStudent } from "../interfaces/grade.interface";
import  '../style/Student.scss';
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import UserPreference from "../server/routes/userPreference";
import PreferenceVersion from "../server/routes/preferenceVersion";
import Preferences from "../server/routes/preference";
import { UserPreferenceTable } from "../interfaces/userPreference.interface";


const _user = new User()
const _grade = new Grade()
const _subject = new Subject()
const _subjectStudents = new SubjectStudents()
const _userPreference = new UserPreference();
const _preferenceVersion = new PreferenceVersion();
const _preference = new Preferences();

const Student = () => {
    const [subjectsId, setSubjectsId] = useState<number[]>([]);
    const [subjectsName, setSubjectsName] = useState<string[]>([]);
    const [teachersName, setTeachersName] = useState<string[]>([]);
    const [gradeTable, setGradeTable] = useState<GradeTableStudent[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [userPreferences, setUserPreferences] = useState<UserPreferenceTable[]>([]);
    const [preferences, setPreferences] = useState<any[]>([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const allSubjects = await _subject.getSubjects();
                const enrolledSubjects = await _subjectStudents.getSubjectsByStudentId();

                const enrolledSubjectIds = enrolledSubjects.map((s: any) => s.subject_id);

                const availableSubjects = allSubjects.filter((s: any) => !enrolledSubjectIds.includes(s.id));

                const ids = availableSubjects.map((e: any) => e.id);
                const names = availableSubjects.map((e: any) => e.name);
                const teacherIds = availableSubjects.map((e: any) => e.teacherId);

                const teacherNames = await Promise.all(
                    teacherIds.map(async (id: number) => {
                        try {
                            const teacherData = await _user.getUserById(id);
                            return teacherData.name;
                        } catch (e) {
                            console.error(`Erro ao buscar professor com ID ${id}:`, e);
                            return "Desconhecido";
                        }
                    })
                );

                setSubjectsId(ids);
                setSubjectsName(names);
                setTeachersName(teacherNames);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };

        fetchSubjects();
    }, [refresh]);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const enrolledSubjects = await _subjectStudents.getSubjectsByStudentId();

                const tableData = await Promise.all(
                    enrolledSubjects.map(async (entry: any) => {
                        const subjectData = await _subject.getSubjectById(entry.subject_id);
                        const teacherData = await _user.getUserById(subjectData.teacherId);

                        return {
                            subject: subjectData.name,
                            grade: entry.grade ?? "-",
                            teacher: teacherData.name,
                        };
                    })
                );

                setGradeTable(tableData);
            } catch (error) {
                console.error("Erro ao carregar notas:", error);
            }
        };

        fetchGrades();
    }, [refresh]);

    useEffect(() => {
        const comparePreferences = async () => {
            try {
                // Busca as preferências disponíveis
                const preferences = await getPreference(); // Retorna as preferências disponíveis
                const preferenceIds = preferences.map((pref: { id: number }) => pref.id);

                // Busca as preferências do usuário
                const userPreferences = await getUserPreferences(); // Retorna as preferências do usuário
                const userPreferenceIds = userPreferences.map((userPref: { preferenceId: number }) => userPref.preferenceId);

                // Compara os IDs das preferências disponíveis com os IDs das preferências do usuário
                const missingPreferences = preferenceIds.filter((id) => !userPreferenceIds.includes(id));

                console.log("IDs das preferências disponíveis:", preferenceIds);
                console.log("IDs das preferências do usuário:", userPreferenceIds);
                console.log("IDs das preferências não aceitas pelo usuário:", missingPreferences);

                // Exibe uma mensagem apenas se houver termos diferentes
                if (missingPreferences.length > 0) {
                    Swal.fire({
                        title: "Termos Pendentes",
                        text: "Existem termos que ainda não foram aceitos. Por favor, revise os termos pendentes na tela de usuário.",
                        icon: "warning",
                    });
                }
            } catch (error) {
                console.error("Erro ao comparar preferências:", error);
            }
        };

        comparePreferences();
    }, [refresh]); // Executa toda vez que o estado de refresh mudar

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
            // console.log("Maior versionId encontrado:", maxVersionId);

            // Filtra as preferências com o maior versionId
            const latestPreferences = preferences.filter(pref => pref.versionId === maxVersionId);
            // console.log("Preferências filtradas com o maior versionId:", latestPreferences);


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

    const getUserPreferences = async () => {
        // console.log(userId)

        try {
            const userId = await _user.getLoggedUser(); // Obtém o ID do usuário logado
            // console.log("userId", userId.id);
            const data = await _userPreference.getUserPreferenceById(userId.id);
            const userPreferences = data.preferences; // Acessa o array de preferências do usuário
            setUserPreferences(userPreferences);
            return userPreferences; // Retorna as preferências do usuário
            // console.log("Dados do usuário:", userPreferences);
        } catch (error) {
            console.error("Erro ao buscar preferências do usuário:", error);
        }
    }

   


    const navigate = useNavigate();

    const toUserPage = () => {
        navigate("/user");
    };

    const postGrade = async (subjectId: number) => {
        try {
            await _grade.postGrade(subjectId);
            setRefresh(prev => !prev);
        } catch (error) {
            Swal.fire({
                title: "Erro",
                text: "A matéria não foi cadastrada por conta de um erro",
                icon: "error"
            });
        }
    };

    return (
        <>
        <Button title="Tela de usuário" onClick={toUserPage} className="button-user" />

        <div className="student-container">
          <div>
            {subjectsId.map((e, index) => (
              <div key={e}>
                <p>{subjectsName[index]}</p>
                <p>Professor: {teachersName[index]}</p>
                <Button title="Matricular" onClick={() => postGrade(e)} />
              </div>
            ))}
          </div>
          <div>
            <Table
              thList={["Matéria", "Nota", "Professor"]}
              tdList={gradeTable}
              renderRow={(row) => (
                <>
                  <td>{row.subject}</td>
                  <td>{row.grade}</td>
                  <td>{row.teacher}</td>
                </>
              )}
            />
          </div>
        </div>
    </>
      );
      
};

export default Student;
