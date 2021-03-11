let x = 500,
    y = 200,
    len, angle = 0,step;

function setup() {
    let form_base = document.getElementById('adding_to_db');
    canvas = createCanvas(form_base.clientWidth + 20, form_base.clientHeight);
    canvas.style('z-index', '-99')
    canvas.style('position', 'absolute')
    let ClientRectProp = form_base.getBoundingClientRect()
    for (i in ClientRectProp) {
        if (['top', 'right', 'bottom', 'left'].indexOf(i) >= 0) {
            // console.log(i, ClientRectProp[i])
            canvas.style(str(i), str(ClientRectProp[i]) + 'px')
        }
    }
    canvas.style('border-radius', '30px')
    canvas.style('opacity','0.44')
    noStroke();
    len = min(width, height) / 4;
    // len=10;
    // background(255,255,255)
    step=TWO_PI /240
}

function draw() {

    background('rgba(54,79,107, 0.1)')
    let center = createVector(width / 2, height / 2);
    ellipse(center.x+ len *cos(angle), center.y +len* sin(angle), 25, 25)
    ellipse(center.x- len *sin(angle), center.y -len* cos(angle), 25, 25)
    angle+=step;
}

function windowResized() {
    let form_base = document.getElementById('adding_to_db');
    resizeCanvas(form_base.clientWidth + 20, form_base.clientHeight);
    let ClientRectProp = form_base.getBoundingClientRect()
    for (i in ClientRectProp) {
        if (['top', 'right', 'bottom', 'left'].indexOf(i) >= 0) {
            canvas.style(str(i), str(ClientRectProp[i]) + 'px')
        }
    }
}