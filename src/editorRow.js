import { canvas } from './globals';

const createEditorTab = (shape, options) => {
  let newEditorTab = document.createElement("div");
  newEditorTab.className = "editCell";

  let editorHeader = createEditorHeader(shape);
  newEditorTab.appendChild(editorHeader);

  let editorOptions = createEditorOptions(shape, options);
  newEditorTab.appendChild(editorOptions);

  return newEditorTab;
};

const createEditorHeader = (shape) => {
  let editorHeader = document.createElement("div");
  editorHeader.className = "editHeader";

  let editorTitle = document.createElement("p");
  editorTitle.className = "editHeaderTitle";
  editorTitle.innerHTML = shape.id;
  editorHeader.appendChild(editorTitle);

  let editorDeleteButton = document.createElement("button");
  editorDeleteButton.className = "editHeaderButton";
  editorDeleteButton.innerHTML = "Delete Shape";
  editorDeleteButton.addEventListener("click", () => {
    canvas.removeShape(shape);
  });
  editorHeader.appendChild(editorDeleteButton);

  return editorHeader;
};

const createEditorOptions = (shape, options) => {
  const editorOptions = document.createElement("div");
  editorOptions.className = "editOptionTable";

  for (var optionName in options) {
    let optionRow = createOptionRow(optionName, options[optionName]);
    editorOptions.appendChild(optionRow);
  }

  return editorOptions;
};

const createOptionRow = (optionName, option) => {
  let optionRow = document.createElement("div");
  optionRow.className = "editOptionRow";

  let optionLabel = document.createElement("p");
  optionLabel.innerHTML = optionName;
  optionRow.appendChild(optionLabel);

  let editCol;
  if (option.type === "static") {
    editCol = document.createElement("p");
    editCol.innerHTML = option.value;
  } else if (option.type === "range") {
    editCol = document.createElement("input");
    editCol.type = "range";
  }
  optionRow.appendChild(editCol);
  return optionRow;
};

export const createEditor = (shape, options) => {
  //   <div id="circle1-Editor" class="editCell">
  let newEditorTab = createEditorTab(shape, options);
  document.getElementById("propertyEditor").appendChild(newEditorTab);
  return newEditorTab;
};
