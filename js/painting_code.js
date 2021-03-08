let parent_div = document.getElementById('sketch-holder');
let good_width = parent_div.clientWidth;
let good_height = parent_div.clientHeight;


let canvas;
let instructions = [];

function setup() {
    canvas = createCanvas(good_width, good_height);
    canvas.parent('sketch-holder');
    background(51)
}



let prevx = -100,
    prevy = -100,
    pressed = 1;

function draw() {
    stroke(255);
    fill(255)
    strokeWeight(15)
        // noStroke()
    if (mouseIsPressed) {
        // ellipse(mouseX, mouseY, Math.min(good_height,good_width)/50);
        if (prevx == -100) {
            prevx = mouseX;
            prevy = mouseY;
        }
        if (valid()) {
            instructions.push([prevx, prevy, pressed])
            line(prevx, prevy, mouseX, mouseY)
        }
        pressed = 1;
    } else {
        pressed = 0;
    }
    prevx = mouseX;
    prevy = mouseY;

}

function windowResized() {
    let parent_div = document.getElementById('sketch-holder');
    let good_width = parent_div.clientWidth;
    let good_height = parent_div.clientHeight;
    let resized = createGraphics(good_width, good_height)
    resized.image(canvas, 0, 0, good_width, good_height)
    resizeCanvas(good_width, good_height);
    image(resized,0,0)
}

function valid() {
    let ilen = instructions.length;
    return (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) &&
        (ilen < 2 || (instructions[ilen - 2][0] != mouseX || instructions[ilen - 2][1] != mouseY))
}
/*
=============sending_canvas============
*/

function saveImage(event) {
    // fa un array de pasi si transmite-l ca instructiuni
    ins_json = JSON.stringify(instructions);
    data_json = {
        'instructions': ins_json,
        'width': width,
        'height': height
    }
    data_json = JSON.stringify(data_json)
    fetch('http://127.0.0.1:5000/saveImageForForm', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: data_json,
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Success:', data);
            goToForm()
        })

    // console.log(ins_json)

}

function goToForm() {
    id = 0;
    fetch('http://127.0.0.1:5000/getLastId', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            cache: 'default',
        })
        .then(response => response.json())
        .then(id => {
            window.location = `../aux_pages/adding_form.html?id=${id.id -1 }`;
        });
    // window.location = '../aux_pages/adding_form.html?id=6';
    // console.log('da')
}
document.getElementsByClassName('go_next')[0].addEventListener('click', (event) => {
    event.preventDefault();
    saveImage(event);

})