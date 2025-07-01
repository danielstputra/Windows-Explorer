import { createApp, h, Suspense } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./style.css";

const Root = {
  render() {
    return h(Suspense, null, {
      default: () => h(App),
    });
  },
};

createApp(Root).use(createPinia()).mount("#app");
