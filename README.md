## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

## Running

```sh
node dist/bundle.js
```

## Project Outline:
- [ ] Add shape column
  - [x] Has Add Circle button
    - [x] Adds a circle of set proportions at a random location within canvas
  - [ ] Has Add Rectangle button
    - [ ] Adds a rectangle of set proportions at a random location within canvas
- [ ] Canvas
  - [ ] Contains Shapes
    - [ ] Shapes can be selected
      - [ ] Clicking selects it, clicking again deselects it
      - [ ] Selecting renders options for it in editor section
      - [ ] Can hold shift to select multiple shapes
    - [ ] Shape has outline
      - [ ] On hover, blue and transparent outline
      - [ ] On select, gold ring on edge of hover outline
- [ ] Edit Sidebar
  - [ ] Contains shape name
  - [ ] Has delete button to remove from canvas
  - [ ] Has properties to manipulate shape
    - [ ] ex: circle has radius (range input), color (html color input), center x, and center y
    - [ ] ex: Rectangle has width (range), height (range), color (html color input), center x, and center y