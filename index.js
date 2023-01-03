var canvas = document.getElementById("gameCanvas");
var cornerSquare = document.getElementById("square-corner");
var cornerSquareRotated = document.getElementById("square-corner-rotated");
var groundSquare = document.getElementById("square-ground");
var outputTileSet = document.getElementById("json");
var getOutput = document.getElementById("getOutput");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// Set tile size and number of rows and columns
var tileSize = 32;
var numRows = 18;
var numCols = 32;
var list = [];
let indexvalue = 0;
const undoStack = [];
// Use a nested loop to fill the list with zeros
for (var row = 0; row < numRows; row++) {
    list[row] = [];
    for (var col = 0; col < numCols; col++) {
        list[row][col] = 0;
    }
}
console.log(list);
const groundImage = new Image();
groundImage.src = "../ground.png";

for (var row = 0; row < list.length; row++) {
    for (var col = 0; col < list[0].length; col++) {
        if (list[row][col] == 0) {
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

groundSquare.addEventListener("click", () => {
    indexvalue = 1;

    groundImage.src = "./ground.png";
});
cornerSquare.addEventListener("click", () => {
    indexvalue = 2;
    groundImage.src = "./corner.png";
});
cornerSquareRotated.addEventListener("click", () => {
    indexvalue = 3;
    groundImage.src = "./corner.png";
});
groundImage.addEventListener("load", () => {
    canvas.addEventListener("mousedown", function (event) {
        console.log("mousedown");
        var x = Math.floor(event.offsetX / tileSize);
        var y = Math.floor(event.offsetY / tileSize);
        list[y][x] = indexvalue;

        ctx.drawImage(
            groundImage,
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
        );
    });
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
