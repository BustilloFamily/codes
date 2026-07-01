(function(){

const canvas = document.getElementById("nesScreen");
const ctx = canvas.getContext("2d");
const imageData = ctx.createImageData(256,240);

const nes = new jsnes.NES({
  onFrame: function(frame){
    for(let i=0;i<frame.length;i++){
      const p=frame[i];
      imageData.data[i*4]=p>>16&255;
      imageData.data[i*4+1]=p>>8&255;
      imageData.data[i*4+2]=p&255;
      imageData.data[i*4+3]=255;
    }
    ctx.putImageData(imageData,0,0);
  }
});

fetch("https://yourname.github.io/nes/game.nes")
.then(r=>r.arrayBuffer())
.then(b=>{
  nes.loadROM(new Uint8Array(b));
  requestAnimationFrame(loop);
});

function loop(){
  nes.frame();
  requestAnimationFrame(loop);
}

// Controls
document.addEventListener("keydown",e=>{
  if(e.repeat) return;
  switch(e.code){
    case "ArrowUp": nes.buttonDown(1,jsnes.Controller.BUTTON_UP); break;
    case "ArrowDown": nes.buttonDown(1,jsnes.Controller.BUTTON_DOWN); break;
    case "ArrowLeft": nes.buttonDown(1,jsnes.Controller.BUTTON_LEFT); break;
    case "ArrowRight": nes.buttonDown(1,jsnes.Controller.BUTTON_RIGHT); break;
    case "KeyZ": nes.buttonDown(1,jsnes.Controller.BUTTON_A); break;
    case "KeyX": nes.buttonDown(1,jsnes.Controller.BUTTON_B); break;
    case "Enter": nes.buttonDown(1,jsnes.Controller.BUTTON_START); break;
  }
});

document.addEventListener("keyup",e=>{
  switch(e.code){
    case "ArrowUp": nes.buttonUp(1,jsnes.Controller.BUTTON_UP); break;
    case "ArrowDown": nes.buttonUp(1,jsnes.Controller.BUTTON_DOWN); break;
    case "ArrowLeft": nes.buttonUp(1,jsnes.Controller.BUTTON_LEFT); break;
    case "ArrowRight": nes.buttonUp(1,jsnes.Controller.BUTTON_RIGHT); break;
    case "KeyZ": nes.buttonUp(1,jsnes.Controller.BUTTON_A); break;
    case "KeyX": nes.buttonUp(1,jsnes.Controller.BUTTON_B); break;
    case "Enter": nes.buttonUp(1,jsnes.Controller.BUTTON_START); break;
  }
});

})();