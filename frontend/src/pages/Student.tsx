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

const _user = new User()
const _grade = new Grade()
const _subject = new Subject()
const _subjectStudents = new SubjectStudents()
const _userPreference = new UserPreference();
const _preferenceVersion = new PreferenceVersion();

const Student = () => {
    const [subjectsId, setSubjectsId] = useState<number[]>([]);
    const [subjectsName, setSubjectsName] = useState<string[]>([]);
    const [teachersName, setTeachersName] = useState<string[]>([]);
    const [gradeTable, setGradeTable] = useState<GradeTableStudent[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [lastKnownPreferenceVersion, setLastKnownPreferenceVersion] = useState<number | null>(null);

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
        const fetchAndComparePreferenceVersions = async () => {
            try {
                const preferenceVersionsResponse = await _preferenceVersion.getPreferenceVersions();
                console.log("Versões de preferências:", preferenceVersionsResponse);
                const preferenceVersions = preferenceVersionsResponse.versions;
                console.log("Versões de preferências obtidas:", preferenceVersions);

                if (!preferenceVersions || preferenceVersions.length === 0) {
                    throw new Error("Nenhuma versão de preferências encontrada.");
                }

                const latestPreferenceVersion = Math.max(
                    ...preferenceVersions.map((version: { versionId: number }) => version.versionId)
                );

                const userPreferencesResponse = await _userPreference.getUserPreferenceById(userId);
                console.log("Preferências do usuário:", userPreferencesResponse);
                const userPreferences = userPreferencesResponse.preferences;
                console.log("Preferências do usuário obtidas:", userPreferences);

                if (!userPreferences || userPreferences.length === 0) {
                    throw new Error("Nenhuma preferência do usuário encontrada.");
                }

                const userHasLatestVersion = userPreferences.some(
                    (userPref: { versionId: number }) => userPref.versionId === latestPreferenceVersion
                );

                if (!userHasLatestVersion) {
                    Swal.fire({
                        title: "Novos Termos de Uso",
                        text: "Uma nova versão dos termos de uso foi criada. Por favor, revise os novos termos.",
                        icon: "info",
                    });
                }

                setLastKnownPreferenceVersion(latestPreferenceVersion);
            } catch (error) {
                console.error("Erro ao verificar as versões de preferências:", error);
            }
        };

        fetchAndComparePreferenceVersions();
    }, []);

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
