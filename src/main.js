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
      Vue.$log.info("Authenticated");
      Vue.$log.info("Token: " + keycloak.token);

      alert("Seu token : " + keycloak.token);
    }

    // TODO: Maybe dont store the token in the localstore, rather use it direct from the keycloak.token object
    localStorage.setItem("vue-token", keycloak.token);
    localStorage.setItem("vue-refresh-token", keycloak.refreshToken);

    return keycloak.loadUserInfo();
  })
  .then((userInfo) => {
    // Retorna os dados do usuário

    Vue.$log.info(userInfo);
    new Vue({
      render: (h) => h(App),
    }).$mount("#app");
  });
