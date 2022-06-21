import { Alert } from "react-native";
import lista from "./Lista";
import UserData from "./UserData";
import OperadorData from "../components/OperadorData";

const enviarDados = (operador) => {
  var myHeaders = new Headers();
  var control = 0;

  myHeaders.append(
    "Authorization",
    "Bearer 9ddaf7c7cddd8b0b4572c829e21414bd573a7f9c7854e99e5a09fbbb73b2ad2e"
  );
  myHeaders.append("Accept", "*/*");
  myHeaders.append("Connection", "keep-alive");
  myHeaders.append("Accept-Encoding", "gzip, deflate, br");
  myHeaders.append("Content-Type", "application/json");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var date = yyyy + "-" + mm + "-" + dd;
//txt
  var dados = {
    userInfo: {
      nome: OperadorData[0].operador,
      data: date,
      inventario: OperadorData[0].armazem,
    },

    // user para debug
    // userInfo: {
    //   nome: "debug",
    //   data: date,
    //   inventario: "teste",
    // },

    lista: lista,
  };

  var raw = JSON.stringify(dados);

  if (lista.length > 0 && OperadorData.length > 0) {
    // if (true) { // DEBUG

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("localhost/yoursystem/api/sgcoletor", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        var mResult = JSON.parse(result);
        Alert.alert("", mResult.message);
        lista.length = 0;
        return true;
      })
      .catch((error) => {
        console.log(error)
        Alert.alert("", "Falha ao enviar dados");
        return false;
      });
  } else if (lista.length < 1) {
    Alert.alert("", "Sem dados para enviar");
  } else if (OperadorData < 1) {
    Alert.alert("", "Informe os dados do operador");
  } else if ((control = 0)) {
    // Reenviar dados
    enviarDados();
    control = 1;
  } else if (lista.length === 0) {
    Alert.alert("", "Sem dados para enviar");
  }
};

global.enviarDados = enviarDados;
export default enviarDados;
