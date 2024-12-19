class Plant {
    word;
    len;
    angle;

    constructor(xpos, ypos) {
        this.word = "S";
        this.len = 4.5;
        this.angle = 0.1 * PI;
        this.xpos = width*xpos;
        this.ypos = height-ypos;
        this.sWeight = 20;
    }

    display() {
        for(let i = 0; i < this.word.length; i++) {
            switch(this.word.charAt(i)) {
                case 'F':
                    strokeWeight(this.sWeight);
                    line(0,0,this.len,0);
                    translate(this.len,0);
                    break;
                case 'l':
                    rotate(-this.angle);
                    break;
                case 'r':
                    rotate(this.angle);
                    break;
                case 'u':
                    this.sWeight -= 3;
                    break;            
                case 'd':
                    this.sWeight += 3;
                    break;        
                case '[':
                    push();
                    break;
                case ']': 
                    pop();
                    break;
                default:
                    break;
            }
        }
    }

    expand() {
        let newStr = "";
        for(let i = 0; i < this.word.length; i++) {
            switch(this.word.charAt(i)) {
                case 'S':
                    newStr += "FB";
                    break;
                case 'F':
                    if (random(100) < 55) {
                        newStr += "FF";
                    } else {
                        newStr += "F";
                    }
                    break;
                case 'B':
                    if (random(100) < 50) {
                        newStr += "[ullFBd][urFBd]";
                    } else {
                        newStr += "[ulFBd][urrFBd]";
                    }
                    break;
                default:
                    newStr += this.word.charAt(i);
                    break;
            }
        }
        this.word = newStr;
    }
}