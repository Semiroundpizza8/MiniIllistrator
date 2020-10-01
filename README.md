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

## Project Notes:
Figuring out the best way to handle mouseOver and onClick was a challenge, leaving me with multiple paths to take. From what I could gather, my options were (in order from simplest to most complex):
  - Itterate through array of shapes and calculate click (pro: easy / simpler, con: have to itterate through shapes every move (itterating though all of them on fail))
  - hit canvas to store shapes + detect which is being clicked based on color ids (pro: accurate, con: have to create + maintain 2 canvas')
  - QuadTree to detect intersection of mouse with drawn shapes (pro: most performant, con: complex)
Eventually I decided to go with the first option for simplicity sake, though I think that theres merit to the other options.

LocalStorage Based Persistance:
  - For local storage based persistance I'd plan to save only the state of the canvas itself, which would include the background color and the array of shapes being shown on the canvas. Since the rest of the application deals with the state of the editor as opposed to the state of the canvas, I'm guessing we'd be able to live without those in order to keep the amount of information we're storing on the ligher side. I think the implementation would looks something like:
  ```javascript
  saveToLocalStorage() {
    window.localStorage.setKey("mini-illustrator/canvas-1/shapes", JSON.stringify(this.shapes));
    window.localStorage.setKey("mini-illustrator/canvas-1/background-color", this.backgroundColor);
  }
  getFromLocalStorage() {
    this.shapes = JSON.parse(window.localStorage.getItem("mini-illustrator/canvas-1/shapes"));
    this.backgroundColor = window.localStorage.getItem("mini-illustrator/canvas-1/background-color");
  }
  ```

Download Image:
  - For this I'd make use of canvas elements 'toDataURL()' method which will allow us to convert our current canvas into an image. The `Download` branch should have a working implementation of this feature.

Undo/Redo:
  - For Undo/Redo I'd most likely want to explore creating an "Actions" array that we could save to our canvas. This array would hold a series of object representing a recent action we took that affected the canvas along with relevant actions, looking similar to:
  ```javascript
  {
    actionTitle: "moveItem",
    affectedShape: this,
    params: [100, 100],
    action: () => affectedShape.move(...this.params);
    reverseAction: () => {
      let [xDiff, yDiff] = params;
      affectedShape.move(xDiff * -1, yDiff * -1);
    },
    // (possibly former and next action if we want to set it up as a linked list)
  }
  ```
  We could then set up undo and redo functions to navigate this array, affecting the canvas using their action and reverse action functions and moving along the current action accordingly.
  In addition, we'd also need to be ready to remove all recent actions after navigating back to a previous action and making an edit that would invalidate the "redo" actions - creating a new timeline for the canvas.