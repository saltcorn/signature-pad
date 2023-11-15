const {
  a,
  img,
  script,
  domReady,
  select,
  input,
  div,
  text,
  text_attr,
  canvas,
  button,
} = require("@saltcorn/markup/tags");
const { link } = require("@saltcorn/markup");
const { isNode } = require("@saltcorn/data/utils");
const { select_options } = require("@saltcorn/markup/helpers");
const File = require("@saltcorn/data/models/file");
const path = require("path");

const signature_pad = {
  isEdit: true,
  setsDataURL: {
    get_filename: ({ id }) => (id ? `signature${id}.png` : "signature.png"),
    get_folder: ({ folder }) => folder,
  },
  configFields: async () => {
    const dirs = await File.allDirectories();
    return [
      {
        name: "folder",
        label: "Folder",
        type: "String",
        attributes: { options: dirs.map((d) => d.path_to_serve) },
      },
    ];
  },
  run: (nm, file_name, attrs, cls, reqd, field) => {
    //console.log("in run attrs.files_accept_filter", attrs.files_accept_filter);
    return div(
      { id: "signature-pad" },
      canvas({ class: "border" }),
      input({
        type: "hidden",
        "data-fieldname": field.form_name,
        name: text_attr(nm),
        id: `input${text_attr(nm)}`,
      }),
      button(
        {
          class: "btn btn-sm btn-secondary d-block",
          type: "button",
          onClick: "window.theSignaturePad.clear()",
        },
        "Clear"
      ),
      script(
        domReady(`
        const canvas = document.querySelector("canvas");
        window.theSignaturePad = new SignaturePad(canvas);
        const form = $("div#signature-pad").closest("form");
        const isNode = typeof parent.saltcorn === "undefined";
        window.theSignaturePad.addEventListener("endStroke", () => {
          $("#input${text_attr(nm)}").val(window.theSignaturePad.toDataURL());
          form.trigger("change");
        });      
        if (!isNode)
          form.attr('onsubmit', 'javascript:void(0)');
        form.submit(()=>{
          $("#input${text_attr(nm)}").val(window.theSignaturePad.toDataURL());
          if (!isNode) {
            const locTokens = parent.currentLocation().split("/");
            formSubmit(form[0], '/view/', locTokens[locTokens.length - 1], true);
          }
        })
    `)
      )
    );
  },
};

module.exports = {
  headers: [
    {
      script: `/plugins/public/signature-pad${
        "@" + require("./package.json").version
      }/signature_pad.umd.min.js`,
    },
  ],
  sc_plugin_api_version: 1,
  plugin_name: "signature-pad",
  fileviews: { "Signature Pad": signature_pad },
};
