/*
 * @name Simple Draw
 * @description Touch to draw on the screen using mouseX, mouseY, pmouseX, and pmouseY values.
 */
 // fix matmul error. big problem, take steps through to see where the error is, adn address, may need new lib
const scaler=10;
function setup() {
  var myCanvas=createCanvas(28*scaler, 28*scaler);
  myCanvas.parent("canvas");
  background(255);
  strokeWeight(25);
  stroke(0);
}
function touchMoved() {
  line(mouseX, mouseY, pmouseX, pmouseY);
  return false;
}
function clearButton(){
  background(255);
}
function averageFlip(x) {
  let average=0;
  for(let i=0;i<x.length;i++){
    average+=x[i];
  }
  average=average/x.length;
  return 255-average;
}
function sigmoid(t) {
  for(let i=0;i<t.length;i++){
    t[i]= 1/(1+Math.pow(Math.E, -t[i]));
  }
  return t;
}
function feed(data){
  for (let i=0;i<biases.length;i++){
    data=math.add(math.multiply(weights[i],data),biases[i]);
    for(let j=0;j<data.length;j++){
      data[j]=sigmoid(data[j]);
    }
  }
  var final=0;
  var answer;
  for (let i=0;i<data.length;i++){
    if(data[i][0]>final){
      final=data[i][0];
      answer=i;
    }
  }
  // console.log(answer);
  document.getElementById('ans').innerHTML=answer;
}
function calc(){
  let d=pixelDensity();
  loadPixels();
  var values=[];
  for(let i = 0; i <pixels.length; i+=4){
    values.push(pixels[i]);
  }
  var resize=[];
  for(let i=0; i<28*scaler*d; i++){
    var start=i*28*scaler*d;
    resize.push(values.slice(start,start+(28*scaler*d)));
  }
  values=resize;
  var avg=[];
  var final=[];
  for(let h=0; h<28;h++){
    for(let i=0;i<28;i++){
      for(let j=0;j<d*scaler;j++){
        for(let k=0; k<d*scaler;k++){
          avg.push(values[(h*d*scaler)+j][(i*d*scaler)+k]);
        }
      }
      final.push(averageFlip(avg));
      avg=[];
    }
  }
  resize=[];
  for (let i=0;i<final.length;i++){
    resize.push([final[i]]);
  }
  final=resize;
  feed(final);
}
