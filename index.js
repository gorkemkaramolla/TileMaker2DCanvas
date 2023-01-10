const canvas = document.getElementById("gameCanvas");
const palette = document.getElementById("palette");
const outputTileSet = document.getElementById("json");
const getOutput = document.getElementById("getOutput");

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// Set tile size and number of rows and columns
var tileSize = 32;
var numRows = 18;
var numCols = 128;
canvas.width = numCols * tileSize;
canvas.height = numRows * tileSize;
var list = [];
let indexvalue = 0;
const undoStack = [];
// Use a nested loop to fill the list with zeros
for (var row = 0; row < numRows; row++) {
    list[row] = [];
    for (var col = 0; col < numCols; col++) {
        list[row][col] = -1;
    }
}
images.map((imageSrc, i) => {
    const image = document.createElement("img");
    console.log(image);

    image.src = `${imageSrc}`;
    image.style.padding = "10px";
    image.addEventListener("click", () => {
        indexvalue = i;
    });
    palette.appendChild(image);
});
console.log(list);

for (var row = 0; row < list.length; row++) {
    console.log(row);
    for (var col = 0; col < list[0].length; col++) {
        if (list[row][col] == -1) {
            // Draw empty tile

            ctx.fillStyle = "white";
            ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);

            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        } else if (list[row][col] == 1) {
            // Draw wall
            ctx.strokeStyle = "purple";

            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}

canvas.addEventListener("mousedown", function (event) {
    console.log("mousedown");
    var x = Math.floor(event.offsetX / tileSize);
    var y = Math.floor(event.offsetY / tileSize);
    list[y][x] = indexvalue;
    const paletImage = new Image();
    paletImage.src = images[indexvalue];
    ctx.drawImage(
        paletImage,
        x * tileSize,
        y * tileSize,
        paletImage.width,
        paletImage.height
    );
});

getOutput.addEventListener("click", () => {
    outputTileSet.innerHTML = "data=" + JSON.stringify(list);
});
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "z") {
        list = list[undoStack[0]];
    }
});
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "z") {
        // Ctrl+Z was pressed
        console.log("Ctrl+Z was pressed");

        // Pop the top element off the stack and restore the canvas
        if (undoStack.length > 0) {
            var imageData = undoStack.pop();
            ctx.putImageData(imageData, 0, 0);
        }
    }
});
