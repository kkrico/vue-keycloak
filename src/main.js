import Vue from "vue";
import App from "./App.vue";
import VueLogger from "vuejs-logger";
import * as Keycloak from "keycloak-js";

Vue.config.productionTip = false;

const options = {
  isEnabled: true,
  logLevel: Vue.config.productionTip ? "error" : "debug",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "|",
  showConsoleColors: true,
};
Vue.use(VueLogger, options);

//keycloak init options

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "client_credentials");
urlencoded.append("client_id", "exemplo-iron");
urlencoded.append("client_secret", "7878175c-b702-4ab6-98f3-ab9a3a9e2027");

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
  redirect: "follow",
};

fetch(
  "https://rhsso-np.paas.cassi.com.br/auth/realms/Colaborador/protocol/openid-connect/token",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => Vue.$log.info("Token de usuário de servico", result));

let keycloak = Keycloak("/keycloak.json");

keycloak
  .init({
    onLoad: "login-required",
    promiseType: "native",
  })
  .then((auth) => {
    if (!auth) {
      alert("Autenticação fallhou. Verifique o json e o flow do oauth");
    } else {
      Vue.$log.info(
        "Token de usuário autenticado autenticado: ",
        keycloak.token
      );
    }

    return keycloak.loadUserInfo();
  })
  .then((userInfo) => {
    // Retorna os dados do usuário
    // Já que autenticamos com usuário com senha, vamos pegar dados dele

    Vue.$log.info(
      "Informações de usuário autenticado de usuário autenticado:",
        userInfo
    );
    new Vue({
      render: (h) => h(App),
    }).$mount("#app");
  });
