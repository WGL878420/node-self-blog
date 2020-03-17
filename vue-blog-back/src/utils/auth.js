import Vue from 'vue'
import Storage from 'vue-ls';

let options = {
    namespace: '', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
};
Vue.use(Storage, options);
const TokenKey = 'token'

export function getToken() {
    return Vue.ls.get(TokenKey)
}

export function setToken(token) {
    return Vue.ls.set(TokenKey, token)
}

export function removeToken() {
    return Vue.ls.remove(TokenKey)
}
