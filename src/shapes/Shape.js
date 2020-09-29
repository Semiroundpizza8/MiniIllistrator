import { canvas } from "../globals";
import { propertyEditor } from "../page";

export default class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.hover = false;
    this.selected = false;
    this.editor = null;
  }

  /*
  Updates the location of a shape on the canvas before redrawing
  */
  move(xMovement, yMovement) {
    this.x = this.x + xMovement;
    this.y = this.y + yMovement;
    this.refillOptions();
    canvas.redrawCanvas();
  }

  /*
  Creates an element representing the editor for a shape and adds it to the dom.
  */
  addEditor() {
    // Create new editor
    this.editor = $(`
      <div id="${this.id}-Editor" class="editCell">
        <div class="editHeader">
          <p class="editHeaderTitle">${this.id} Editor</p>
        </div>
        <div class="editOptionTable">
        </div>
      </div>
    `);
    propertyEditor.append(this.editor[0]);

    // When working within an editor hilight the relevant shape
    this.editor.on("mouseenter", () => {
      this.hover = true;
      canvas.redrawCanvas();
    });
    this.editor.on("mouseleave", () => {
      this.hover = false;
      canvas.redrawCanvas();
    });

    // Add button for deleting a shape off of the canvas
    $(`<button class="editHeaderButton">Delete Shape</button>`)
      .on("click", () => canvas.removeShape(this))
      .appendTo(`div#${this.id}-Editor .editHeader`);

    // Fill the editor with options relevant to the shape
    this.refillOptions();
  }

  /*
  Empties the current options for an editor before refilling it
  */
  refillOptions() {
    $(`div#${this.id}-Editor .editOptionTable`).empty();

    let optionEles = this.editorOptions.map((option) =>
      this.createOptionRow(option)
    );
    $(`div#${this.id}-Editor .editOptionTable`).append(optionEles);
  }

  /*
  Creates an element focused on editing a specific property for a shape
  params:
    option || object || contains the properties needed to educate what kind of field is being created
  */
  createOptionRow(option) {
    let newOptionRow = $(`<div class="editOptionRow"></div>`);
    let nameElement = $(`<p>${option.name}</p>`);
    let valueElement;

    if (option.type === "static") {
      valueElement = $(`<p>${option.value()}</p>`);
    } else if (option.type === "slider") {
      valueElement = $(
        `<input type="range" value=${option.value()} min="5" max="500"></input>`
      );
      valueElement.on("input", (event) => option.update(+event.target.value));
    } else if (option.type === "color") {
      valueElement = $(`<input type="color" value=${option.value()}>`);
      valueElement.on("input", (event) => option.update(event.target.value));
    }
    newOptionRow.append(nameElement, valueElement);

    return newOptionRow;
  }

  /*
  Removes the editor for a shape from the dom
  */
  removeEditor() {
    this.editor.remove();
  }
}
