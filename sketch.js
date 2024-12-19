let c;
let wood;
let snow = [];
let gravity;
let happy;
let christmas;
let points;

let spritesheet;
let textures = [];

let zOff = 0;

let font;

function preload() {
    spritesheet = loadImage('data/flakes32.png');
    font = loadFont("data/berkshireswash.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    gravity = createVector(0, 0.3);

    for (let x = 0; x < spritesheet.width; x += 32) {
        for (let y = 0; y < spritesheet.height; y += 32) {
            let img = spritesheet.get(x, y, 32, 32);
            image(img, x, y);
            textures.push(img);
        }
    }

    for (let i = 0; i < 400; i++) {
        let x = random(width);
        let y = random(height);
        let design = random(textures);
        snow.push(new Snowflake(x, y, design));
    }

    wood = [];
    wood.push(new Plant(0.42, 0));
    wood.push(new Plant(0.56,0));
    // for(let w = 0; w < 2; w++) {
    //     wood.push(new Plant(w/10, 0));
    // }
    c = 0;
    frameRate(30);
    textFont(font,getFontSize());
}

function draw() {
    background("#999999");
    for (tree of wood) {
        push();
        translate(tree.xpos, tree.ypos);
        rotate(-0.5*PI);
        tree.display();
        pop();    
    }
    for (tree of wood) {
        if (c < 10) {
            tree.expand();
        }
    }
    if (c < 10) {
        c++;
    }
    
    zOff += 0.1;

    for (flake of snow) {
        let xOff = flake.pos.x / width;
        let yOff = flake.pos.y / height;
        let wAngle = noise(xOff, yOff, zOff) * TWO_PI;
        // let wind = p5.Vector.fromAngle(wAngle);
        // wind.mult(0.1);

        flake.applyForce(gravity);
        //flake.applyForce(wind);
        flake.update();
        flake.render();
    }

    fill("#ffffff");
    textFont(font,getFontSize());
    text("Merry", width*0.1, 150);
    text("Christmas", width*0.1, 250);
    textFont(font,getFontSize()-35);
    text("and a Happy New Year", width*0.1, 350)
    // textFont(font,getFontSize()-45);
    // text("from px cx sx xx", width*0.1, height-150)
    textFont(font,getFontSize()-60);
    text("if the trees are wonky refresh the page", width*0.1, height-50)
}

function getFontSize() {
    let f = height/10;
    if (f > 100) {
        f = 100;
    }
    return f;
}