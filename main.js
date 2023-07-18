img = "";
status1 = "";
objects = [];


function preload() {
img = loadImage("dog_cat.jpg");
}

function setup() {
canvas = createCanvas(600, 400);
canvas.center();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
    console.log("Model is Loaded!");
    status1 = true;
    objectDetector.detect(img, gotResult);  
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
image(img, 0, 0, 600, 400);
if (status1 != "") {
    for( i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 30, objects[i].y + 30);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

}