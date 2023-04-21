import grapesjs from "grapesjs/dist/grapes.js";
import basics from "grapesjs-blocks-basic";

import baseReactComponent from "./base-react-component";

import Listing from "./Listing";



import Chart from "react-apexcharts";
 

import "./styles.css";
import MuiComponents from "./mui-components";

const editor = grapesjs.init({
  container: "#gjs",
  fromElement: 1,
  height: "100%",
  storageManager: { type: 0 },
  allowScripts: 1,
  plugins: [basics]
});

const { baseReactComponentModel, baseReactComponentView } = baseReactComponent(
  editor
);

MuiComponents(editor);

editor.BlockManager.add("listing", {
  label: "<div class='gjs-fonts gjs-f-b1'>Listing</div>",
  content: "<Listing>Foo</Listing>"
});


editor.DomComponents.addType("Listing", {
  model: {
    ...baseReactComponentModel,
    defaults: {
      component: Listing,
      stylable: false,
      resizable: false,
      editable: false,
      void: true,
      draggable: true,
      droppable: true,
      traits: [
        {
          type: "number",
          label: "MLS ID",
          name: "mlsid"
        }
      ]
    }
  },
  view: baseReactComponentView,
  isComponent: (el) => el.tagName === "LISTING"
});


editor.DomComponents.addType("Chart", {
  model: {
    ...baseReactComponentModel,
    defaults: {
      component: Chart,
      stylable: false,
      resizable: false,
      editable: false,
      draggable: false,
      droppable: false,
      type: "line"
    }
  },
  view: baseReactComponentView,
  isComponent: (el) => el.tagName === "CHART"
});

editor.setComponents(`
  <html>
  <head>
  </head>
  <body>
    <div>
      <span>
        Foo
      </span>
      <Listing>
        <div>
          Bar
        </div>
        <MuiButton variant='contained' color='primary'>
          Click Me
        </MuiButton>
        <Slider />
      </Listing>
      <Snackbar>
        <MuiButton variant='contained' color='secondary'>
          Click Me
        </MuiButton>
      </Snackbar>
      <Slider />
      <Apexchart />
    </div>
  </body>
`);
