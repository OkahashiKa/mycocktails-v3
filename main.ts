import { createApp } from "vue";
import App from "./app.vue";
import router from "./router"; // router.tsをインポート

const app = createApp(App);
app.use(router); // Vue Routerを使用する
app.mount("#app");
