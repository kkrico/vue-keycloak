# vue-keycloak

Neste exemplo uso um adaptador especifico do keycloak para conectar com vue
Mostro como conectar, além de como trazer dados do usuário logado

Aqui uso o keycloak-js para conectar no Rhsoo. Estou configurando um exemplo com adapter OIDC;
Vou criar um branch quando terminar o exemplo com adapter OIDC e coloco aqui

Usamos 2x fluxos:

- Usuário de servico (exemplo-iron). Adapters js terceiro não dao suporte ao fluxo client_credentials. Este fluxo foi criado para cenários de aplicações legadas, ou integração sistemica. Logo, fazemos um fetch para gerar o token
- Usuário normal (osvaldo.melo). Aqui, usamos o adapter js para gerar token, bem como pegar informações extras do usuário
  
Qualquer duvida, entrar em contato comigo ou Osvaldo

Usuário para teste:

osvaldo.melo
12345678

Favor ver video enviado também

## Install
```
npm install
```

### Develop
```
npm run serve
```