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
} = require("@saltcorn/markup/tags");
const { link } = require("@saltcorn/markup");
const { isNode } = require("@saltcorn/data/utils");
const { select_options } = require("@saltcorn/markup/helpers");
const File = require("@saltcorn/data/models/file");
const path = require("path");

const signature_pad = {
  isEdit: true,
  multipartFormData: true,
  valueIsFilename: true,

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
    return (
      text(file_name || "") +
      (typeof attrs.files_accept_filter !== "undefined" ||
      attrs.files_accept_filter !== null
        ? input({
            class: `${cls} ${field.class || ""}`,
            "data-fieldname": field.form_name,
            name: text_attr(nm),
            id: `input${text_attr(nm)}`,
            type: "file",
            accept: attrs.files_accept_filter,
          })
        : input({
            class: `${cls} ${field.class || ""}`,
            "data-fieldname": field.form_name,
            name: text_attr(nm),
            id: `input${text_attr(nm)}`,
            type: "file",
          }))
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
  fileviews: { signature_pad },
};
