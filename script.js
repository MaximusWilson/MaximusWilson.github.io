var gridX = 18
var gridY = 14
var arraySize = (gridX*gridY)
var mines = []
var safe = []
var flag = []
var flag_off = []
function setup() {
  createCanvas(gridX * 30 + 1, gridY * 30 + 1);
  background(3, 216, 0);
  noFill();
  flags = createElement('h1', 'Flags: 40');
  flags.position(200,0)
  
  while (mines.length < 40){
    for (let i = 0; i < 40 - mines.length; i++){
      mines.push(round(random(0,252)));
    }
    mines = mines.filter(function(item, index) {
      if (mines.indexOf(item) == index){
        return item;
      }
    });
    mines.sort(function(a, b){return a - b})
    mines.forEach(b => {
      mines.forEach(b2 => {
        if (mines[b] == mines[b2] && b != b2){
          mines.splice(b2);

        }
      });
    });
  }
  console.log(mines);
  
  for (let i = 0; i < 252; i++){
    let x = 0;
    mines.forEach(b => {
      if (b == i){
        x = x + 1;
      }
    });
    if (x == 0){
      safe.push(i);
    }
  }
  console.log(safe);
}

function draw() {
  var cellWidth = 30;
  var x = 0;
  var y = 0;
  for(let i = 0; i<arraySize;i++){
    mines.forEach(b => {
      if (i == b){
        fill(50);
      }
    });
    flag.forEach(b => {
      if (i == b){
        fill(150, 0, 0);
      }
    });
    flag_off.forEach(b => {
      if (i == b){
        fill(3, 216, 0);
        flag_off.splice(flag_off.indexOf(b), 1);
      }
    });
    rect(x, y, cellWidth, cellWidth);
    noFill();
    //fill(3, 216, 0);
    x += cellWidth;
  	if((i + 1) % gridX == 0){
      x = 0;
      y += cellWidth;
      //text(flags.length - 40, 0, 100)
    }
  }
}

function mouseClicked(){
  let pos = (floor(mouseX / 30)) + (18 * (floor(mouseY / 30)));
  console.log(pos);
  if (keyIsDown(13) || keyIsDown(16)){
    let x = 0;
    flag.forEach(b => {
      if (b == pos){
        flag.splice(flag.indexOf(b), 1);
        flag_off.push(b);
        x = 1;
      }
    });
    if (x == 0){
      flag.push(pos);
    }
    let flag_r = 40 - flag.length;
    flags.html('Flag: ' + flag_r); 
    console.log(flag);
  }else{
    let x = 0;
    flag.forEach(a => {
      if (a == pos){
        x = 1;
      }
    });
    
    if (x == 0){
      
      let num_mine = 0;
      mines.forEach(b => {
        if (b == pos){
          console.log("Game Over!");
        }
        if (b == (pos - 17) && pos >= 17 && pos % 18 != 17){
          num_mine = num_mine + 1;
        }if (b == (pos - 18) && pos >= 18){
          num_mine = num_mine + 1;
        }if (b == (pos - 19) && pos >= 19 && pos % 18 != 0){
          num_mine = num_mine + 1;
        }if (b == (pos + 17) && pos <= 251 - 17 && pos % 18 != 0){
          num_mine = num_mine + 1;
        }if (b == (pos + 18) && pos <= 251 - 18){
          num_mine = num_mine + 1;
        }if (b == (pos + 19) && pos <= 251 - 19 && pos % 18 != 17){
          num_mine = num_mine + 1;
        }if (b == (pos - 1) && pos % 18 != 0){
          num_mine = num_mine + 1;
        }if (b == (pos + 1) && pos % 18 != 17){
          num_mine = num_mine + 1;
        }
      });
      
      let num_mine_str = num_mine.toString();
      if (num_mine != 0){
        fill(50);
        noStroke();
        textAlign(CENTER, TOP);
        textSize(30);
        text(num_mine_str, ((floor(mouseX / 30)) * 30) + 15, ((floor(mouseY / 30)) * 30));
        stroke(0);
        noFill();
      }
      console.log(num_mine.toString())
    }
  }
}
