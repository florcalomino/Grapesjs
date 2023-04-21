import ReactDOM from "react-dom";

import { ServerStyleSheets } from "@material-ui/styles";

import baseReactComponent from "../base-react-component";

import Button from "./Button";
import Slider from "./Slider";
import Snackbar from "./Snackbar";

const sheets = new ServerStyleSheets();

export default editor => {
  const {
    baseReactComponentModel,
    baseReactComponentView
  } = baseReactComponent(editor);

  const model = {
    ...baseReactComponentModel
  };

  const view = {
    ...baseReactComponentView,
    mount: function(component) {
      const s = sheets.collect(component);
      ReactDOM.render(s, this.getRenderTarget());
      const css = sheets.toString();

      const style = document.createElement("style");
      style.innerHTML = css;
      this.em
        .get("Canvas")
        .getDocument()
        .head.appendChild(style);
      return this;
    }
  };

  const params = { editor, model, view };
  Button(params);
  Slider(params);
  Snackbar(params);
};
