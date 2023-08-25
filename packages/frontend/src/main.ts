import { createApp } from "vue";
// import "./style.scss";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const audiColors = {
  black: "#000",
  grayDarker: "#394249",
  grayDark: "#434C53",
  gray: "#6D7579",
  grayLight: "#B0B6B8",
  grayLighter: "#D5D9D8",

  audiRed: "#CC0033",
  audiDarkRed: "#AA142D"
};

export const audiTheme: ThemeDefinition = {
  dark: false,
  colors: {
    surface: audiColors.grayLighter,
    background: audiColors.grayLighter,
    primary: audiColors.audiRed,
    secondary: audiColors.grayDark,
    accent: audiColors.audiDarkRed,
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  }
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "audiTheme",
    themes: {
      audiTheme
    }
  }
});

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.mount("#app");
