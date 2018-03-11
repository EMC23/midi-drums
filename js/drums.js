
var mySketch = function(myDrums) {

  let padRange = [9,10,11,12,25,26,27,28];
  var padNumber = 9;
  var indPadItem;
  var padWidth = 100;
  var padHeight = 100;
  var padX = 50;
  var padY = 50;
  var amplitude;
  var boom;
  var volumeBoom;



  myDrums.preload = function () {
    boom = myDrums.loadSound('sounds/Broke_For_Free_-_01_-_As_Colorful_As_Ever.mp3');
  }

  p5.midi.onInput = function (event) {
    myDrums.clear();
    console.dir(event);
    myDrums.playSound();
    //Drums.volumeControl();
  }

  myDrums.setup = function (event) {
    var myCanvas = myDrums.createCanvas(padWidth, padHeight, padX, padY);
    //myDrums.background(153);
    myDrums.line(0, 0, myDrums.width, myDrums.height);

    const keys = Array.from(document.querySelectorAll('.key'));

    keys.forEach(key => key.addEventListener('transitionend', removeTransition));

    //console.log(keys);

    function removeTransition(event) {
      if (event.propertyName !== 'transform') return;
      this.classList.remove('playing');
    }

    console.log(boom);

    myDrums.amplitude = new p5.Amplitude();
    boom.setVolume(0.5);
    //myDrums.amplitude.smooth(0.9);
  }

  myDrums.draw = function () {
    myDrums.background(0);
    myDrums.fill(255);
    var level = myDrums.amplitude.getLevel();
    var size = myDrums.map(level, 0, 1, 0, 200);
    myDrums.ellipse(myDrums.width/2, myDrums.height/2, size, size);
  }

  myDrums.playSound = function () {
    const padNumber = (event.data[1]);
    const audio = document.querySelector(`audio[data-key="${event.data[1]}"]`);
    const key = document.querySelector(`.key[data-key="${event.data[1]}"]`);
    const pads = Array.from(document.querySelectorAll('.key'));
      pads.forEach(pad => {
    });

    //console.log(pads);

    myDrums.textFont('sans-serif', 24);
    myDrums.textWidth(padWidth);
    myDrums.textAlign(myDrums.LEFT, myDrums.TOP);
    myDrums.fill(255, 255, 255);
    myDrums.strokeWeight(0);
    myDrums.text(padNumber, padX, padY);

    // trigger sound on pad down only (127)
    if (event.data[2] == 127) {
      if (!audio) return;
      audio.currentTime = 0;
      audio.play();
      key.classList.add('playing');
    }

  }

  myDrums.volumeControl = function () {
    const volume = (event.data[2]);
    console.log('amplitude ' + amplitude);
    console.log('volume ' + volume);

    // trigger sound on pad down only (127)
    if (event.data[2] <= 127) {


    }

  }

}

var midiDrums = new p5(mySketch, 'canvas');

