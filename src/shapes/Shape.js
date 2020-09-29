import { canvas } from "../globals";

export default class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.hover = false;
    this.selected = false;
    this.editor = null;
  }

  move(xMovement, yMovement) {
    this.x = this.x + xMovement;
    this.y = this.y + yMovement;
    this.refillOptions();
    canvas.redrawCanvas();
  }

  addEditor() {
    // Create new editor tab
    this.editor = $(`
      <div id="${this.id}-Editor" class="editCell">
        <div class="editHeader">
          <p class="editHeaderTitle">${this.id} Editor</p>
        </div>
        <div class="editOptionTable">
        </div>
      </div>
    `).appendTo("#propertyEditor");
    this.editor.on("mouseenter", () => {
      this.hover = true
      canvas.redrawCanvas();
    });
    this.editor.on("mouseleave", () => {
      this.hover = false
      canvas.redrawCanvas();
    });

    // Add Delete Button
    $(`<button class="editHeaderButton">Delete Shape</button>`)
      .on("click", () => canvas.removeShape(this))
      .appendTo(`div#${this.id}-Editor .editHeader`);

    this.refillOptions();
  }

  createOptionRow(option) {
    let newOptionRow = $(`<div class="editOptionRow"></div>`);
    let nameElement = $(`<p>${option.name}</p>`);
    let valueElement;

    if (option.type === "static") {
      valueElement = $(`<p>${option.value()}</p>`);
    }
    else if(option.type === "slider") {
      valueElement = $(`<input type="range" value=${option.value()} min="5" max="500"></input>`);
      valueElement.on("input", event => option.update(+event.target.value));
    }
    else if(option.type === "color") {
      valueElement = $(`<input type="color" value=${option.value()}>`)
      valueElement.on("input", event => option.update(event.target.value));
    }
    newOptionRow.append(nameElement, valueElement);
    
    return newOptionRow;
  }

  refillOptions() {
    $(`div#${this.id}-Editor .editOptionTable`).empty();
    let optionEles = this.editorOptions.map((option) =>
      this.createOptionRow(option)
    );
    $(`div#${this.id}-Editor .editOptionTable`).append(optionEles);
  }

  removeEditor() {
    this.editor.remove();
  }
}
