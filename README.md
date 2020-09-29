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
- [x] Add shape column (EXTRA: varies color based on predefined scheme)
  - [x] Has Add Circle button
    - [x] Adds a circle of set proportions at a random location within canvas
  - [x] Has Add Rectangle button
    - [x] Adds a rectangle of set proportions at a random location within canvas
- [x] Canvas
  - [x] Contains Shapes
    - [x] Shapes react to hover over
      - [x] Hovering over a shape creates a transparent blue ring around it
    - [x] Shapes can be dragged and dropped
    - [x] Shapes can be selected
      - [x] Clicking selects it
      - [x] Clicking another shape or outside of curr shape deselects it
      - [x] Selecting renders options for it in editor section
      - [x] Can hold shift to select multiple shapes
    - [x] Shape has outline
      - [x] On hover, blue and transparent outline
      - [x] On select, gold ring on edge of hover outline
- [ ] Edit Sidebar
  - [x] Contains shape name
  - [x] Has delete button to remove from canvas
  - [ ] Has properties to manipulate shape
    - [ ] ex: Circle has radius (range input), color (html color input), center x, and center y
    - [ ] ex: Rectangle has width (range), height (range), color (html color input), center x, and center y

Notes:
Figuring out the best way to handle mouseOver and onClick was a challenge, leaving me with multiple paths to take. From what I could gather, my options were (in order from simplest to most complex):
  - Itterate through array of shapes and calculate click (pro: easy / simpler, con: have to itterate through shapes every move (itterating though all of them on fail))
  - hit canvas to store shapes + detect which is being clicked based on color ids (pro: accurate, con: have to create + maintain 2 canvas')
  - QuadTree to detect intersection of mouse with drawn shapes (pro: most performant, con: complex)
Eventually I decided to go with the first option for simplicity sake, though I think that theres merit to the other options.