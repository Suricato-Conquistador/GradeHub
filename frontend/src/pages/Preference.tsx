import React, { useState } from "react";
import "../style/Preference.scss";  // ajuste o caminho se o arquivo SCSS estiver em outra pasta
import Swal from "sweetalert2";
import preference from "../server/routes/preference"; // Ensure this path is correct and the module exports an object or class with a 'postPreference' method
import preferenceVersion from "../server/routes/preferenceVersion";


const _PreferenceVersion = new preferenceVersion();
const _Preference = new preference();

const Preference = () => {
  const [terms, setTerms] = useState<{ name: string; description: string; optional: boolean }[]>([
    { name: "", description: "", optional: false },
  ]);

  const handleChange = (index: number, field: "name" | "description" | "optional", value: string | boolean) => {
    const updatedTerms = [...terms];
    updatedTerms[index] = { ...updatedTerms[index], [field]: value };
    setTerms(updatedTerms);
  };

  const addTerm = () => {
    setTerms([...terms, { name: "", description: "", optional: false }]);
  };

  const getPreferenceVersion = async () => {
    try {
      const preferenceVersions = await _PreferenceVersion.getPreferenceVersions();
      console.log(preferenceVersions);
      return preferenceVersions.versions.length
    } 
    catch (error) {
      console.error("Erro ao obter a versão de preferências:", error);
      Swal.fire({
        title: "Erro",
        text: "Ocorreu um erro ao obter a versão de preferências.",
        icon: "error",
      });
    }
  }

  const postPreferenceVersion = async () => {
    try {
      const firstNumber = await getPreferenceVersion();

      const version = 1 + firstNumber+".0"
      const date = new Date(); // Use a data atual ou defina conforme necessário
      console.log(`Versão: ${firstNumber}, Data: ${date}`);

      const termVersion = await _PreferenceVersion.postPreferenceVersion(version, date);
      Swal.fire({
        title: "Sucesso",
        text: "Versão de preferências salva com sucesso!",
        icon: "success",
      });
      return termVersion;
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Erro",
        text: "Ocorreu um erro ao salvar a versão de preferências.",
        icon: "error",
      });
    }
  }

  const postPreference = async () => {

    try {
      const termVersion = await postPreferenceVersion();
      console.log(termVersion);
      for (const term of terms) {
        if (term.name && term.description) {
          console.log(`Termo adicionado: ${term.name}, Descrição: ${term.description}, ID${termVersion.data.version.id} Opcional: ${term.optional}`);
          await _Preference.postPreference(term.name, term.description, termVersion.data.version.id, term.optional);

        } else {
          Swal.fire({
            title: "Erro",
            text: "Todos os campos devem ser preenchidos",
            icon: "warning",
          });
          console.log(`Termo adicionado: ${term.name}, Descrição: ${term.description}, Opcional: ${term.optional}`);

          return;
        }
      }
      Swal.fire({
        title: "Sucesso",
        text: "Preferências salvas com sucesso!",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      
      Swal.fire({
        title: "Erro",
        text: "Ocorreu um erro ao salvar as preferências.",
        icon: "error",
      });
    }
  };

  const postTerm = async () => {
    postPreference();
  }

  return (
    <div className="preference-container">
      <h1>Criar nova versão de Termos</h1>
      {terms.map((term, index) => (
        <div key={index} className="term">
          <input
            type="text"
            placeholder="Nome"
            value={term.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={term.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
          />
          <label>
            Opcional:
            <input
              type="checkbox"
              checked={term.optional}
              onChange={(e) => handleChange(index, "optional", e.target.checked)}
            />
          </label>
        </div>
      ))}
      <button onClick={addTerm}>Adicionar Termo</button>
      <button onClick={postTerm}>Salvar Preferências</button>
      {/* <button onClick={getPreferenceVersion}>ver version</button> */}
    </div>
  );
};

export default Preference;
