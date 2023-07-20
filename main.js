status1 = "";
objects = [];


function preload() {

}

function setup() {
canvas = createCanvas(300, 300);
canvas.center();
video=createCapture(VIDEO);
video.size(300,300);
video.hide();
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
    console.log("Model is Loaded!");
    status1 = true;
    objectDetector.detect(video, gotResult);  
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
image(video, 0, 0, 600, 400);
if (status1 != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    for( i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("number-of-objects").innerHTML = "No. of objects detected :"+ objects.length;
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 30, objects[i].y + 30);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

}