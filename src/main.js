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
  })
  .success((auth) => {
    if (!auth) {
      alert("Autenticação fallhou. Verifique o json e o flow do oauth");
    } else {
      Vue.$log.info("Authenticated");
      Vue.$log.info("Token: " + keycloak.token);

      alert(keycloak.token);
    }

    new Vue({
      render: (h) => h(App),
    }).$mount("#app");

    // TODO: Maybe dont store the token in the localstore, rather use it direct from the keycloak.token object
    localStorage.setItem("vue-token", keycloak.token);
    localStorage.setItem("vue-refresh-token", keycloak.refreshToken);

    setInterval(() => {
      keycloak
        .updateToken(70)
        .success((refreshed) => {
          if (refreshed) {
            Vue.$log.debug("Token refreshed");
          } else {
            Vue.$log.warn(
              "Token not refreshed, valid for " +
                Math.round(
                  keycloak.tokenParsed.exp +
                    keycloak.timeSkew -
                    new Date().getTime() / 1000
                ) +
                " seconds"
            );
          }
        })
        .error(() => {
          Vue.$log.error("Failed to refresh token");
        });
    }, 60000);
  })
  .error(() => {
    Vue.$log.error("Authenticated Failed");
  });
