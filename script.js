function get_request(link) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', link, true);
  xhr.send();
  return xhr.responseText;
}

function startup(){
  document.getElementById("canvas").style.background = "url(" + link + "get)";
}

function s_color(){
  input = document.getElementById("width");
  width = input.value;
}
function s_color(){
  input = document.getElementById("color");
  color = input.value;
  //p_color = 
}

function hexToSTR(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(result){
      var r= parseInt(result[1], 16);
      var g= parseInt(result[2], 16);
      var b= parseInt(result[3], 16);
      return String.fromCharCode(r) + String.fromCharCode(g) + String.fromCharCode(b);//return 23,14,45 -> reformat if needed 
  } 
  return null;
}

function rgbToSTR(r, g, b) {
  return String.fromCharCode(r) + String.fromCharCode(g) + String.fromCharCode(b);
}

const canvas = document.getElementById("canvas");
const link = "https://2846-46-190-9-210.ngrok.io/";
startup();
canvas.style = "background-color: " + "white" + ";";
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };
let color = "#000000";
let width = 5;

let STR_color = hexToSTR(color.replace('#', ''));

function submit(){
  cname = document.getElementById("name").value;

  //raw = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  //strdata = "";
  //size = canvas.width * canvas.height;
  //for (let i=0; i < size; i+=4)
  //  strdata += rgbToSTR(raw[i], raw[i+1], raw[i+2]);
  
  data = {
    client: cname,
    x: canvas.width,
    y: canvas.height,
    pixels: canvas.toDataURL()
  }
  let xhr = new XMLHttpRequest();
  xhr.open("POST", link+"submit", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  xhr.send(JSON.stringify(data));

}

document.getElementById("canvas").addEventListener("mousedown", start);
document.getElementById("canvas").addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

resize();

function resize() {
  ctx.canvas.width = 1280;
  ctx.canvas.height = 720;
}
function reposition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}
function start(event) {
  document.addEventListener("mousemove", draw);
  reposition(event);
}
function stop() {
  document.removeEventListener("mousemove", draw);
}
function draw(event) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(coord.x, coord.y);
  reposition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}