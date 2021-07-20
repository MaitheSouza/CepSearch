import axios from "axios";
import "../styles/form.css";

export const Form = () => {
  const reset = () => {
    document.getElementById("error").textContent = "";
    document.getElementById("logradouro").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("localidade").value = "";
    document.getElementById("uf").value = "";
  };

  const verifyCep = (e) => {
    var cep = e.target.value.replace(/\D/gim, "");
    reset();
    if (cep.length === 8) {
      axios
        .get(`http://viacep.com.br/ws/${cep}/json/`)
        .then(async (res) => {
          const data = res.data;
          if (!data.logradouro) {
            throw new Error("Valores indefinido");
          }
          document.getElementById("logradouro").value = `${data.logradouro} ${
            data.complemento ? `- ${data.complemento}` : ""
          }`;
          document.getElementById("bairro").value = data.bairro;
          document.getElementById("localidade").value = data.localidade;
          document.getElementById("uf").value = data.uf;
        })
        .catch((error) => {
          document.getElementById("error").textContent =
            "Não consegui encontrar seu CEP. Houve um erro.";
        });
    }
  };
  return (
    <div className="form">
      <div className="form__cepForm">
        <label htmlFor="cep">Digite o CEP:</label>
        <input
          type="text"
          name="cep"
          id="cep"
          placeholder="Digite o CEP"
          onInput={(e) => verifyCep(e)}
        />
      </div>
      <div className="form__autoCompleteForm">
        <p id="error"></p>
        <div className="autoCompleteForm__logradouro">
          <input
            className="logradouro"
            type="text"
            id="logradouro"
            name="logradouro"
            placeholder="Logradouro"
            disabled
          />
        </div>
        <div className="autoCompleteForm__bairro">
          <input
            className="bairro"
            type="text"
            id="bairro"
            name="bairro"
            placeholder="Bairro"
            disabled
          />
        </div>
        <div className="autoCompleteForm__row">
          <input
            className="localidade"
            type="text"
            id="localidade"
            name="localidade"
            placeholder="Cidade"
            disabled
          />
          <input
            className="uf"
            type="text"
            id="uf"
            name="uf"
            placeholder="UF"
            disabled
          />
        </div>
      </div>
    </div>
  );
};
