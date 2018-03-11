
var mySketch = function(myDrums) {

  let padRange = [9,10,11,12,25,26,27,28,36,37,38,39,40,41,42,43];
  let sounds = ['boom', 'kick', 'snare', 'tom', 'clap', 'hihat', 'openhat', 'ride', 'tink', 'beatbox', 'drum', 'kick_707', 'my_first_piano', 'piano_p6', 'snare_707', 'snare_707_b', 'thumb_piano_monotraum', 'triangle_01', 'violin', 'whistle'];
  var padNumber = 9;
  var indPadItem;
  var padWidth = 100;
  var padHeight = 100;
  var padX = 50;
  var padY = 50;
  var amplitude;
  var mic;

  myDrums.preload = function () {
    boom = myDrums.loadSound('sounds/boom.wav');
    kick = myDrums.loadSound('sounds/kick.wav');
    snare = myDrums.loadSound('sounds/snare.wav');
    tom = myDrums.loadSound('sounds/tom.wav');
    clap = myDrums.loadSound('sounds/clap.wav');
    hihat = myDrums.loadSound('sounds/hihat.wav');
    openhat = myDrums.loadSound('sounds/openhat.wav');
    ride = myDrums.loadSound('sounds/ride.wav');
    tink = myDrums.loadSound('sounds/tink.wav');
    beatbox = myDrums.loadSound('sounds/beatbox.mp3');
    drum = myDrums.loadSound('sounds/drum.mp3');
    kick_707 = myDrums.loadSound('sounds/Kick-707.mp3');
    my_first_piano = myDrums.loadSound('sounds/my_first_piano.mp3');
    piano_p6 = myDrums.loadSound('sounds/piano_p6.mp3');
    snare_707 = myDrums.loadSound('sounds/Snare-707.mp3');
    snare_707_b = myDrums.loadSound('sounds/Snare-707-b.mp3');
    thumb_piano_monotraum = myDrums.loadSound('sounds/thumb-piano_monotraum.mp3');
    triangle_01 = myDrums.loadSound('sounds/triangle_01.mp3');
    violin = myDrums.loadSound('sounds/violin-spiccato-g2.mp3');
    whistle = myDrums.loadSound('sounds/whistle.mp3');

    flute = myDrums.loadSound('sounds/flute.mp3');

  }

  p5.midi.onInput = function (event) {
    myDrums.clear();
    console.dir(event);
    myDrums.playSound();
    //myDrums.volumeControl();
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

    //console.log(boom);

    //myDrums.micOn();

    myDrums.amplitude = new p5.Amplitude();
    //boom.setVolume(0.5);
    //myDrums.amplitude.setInput(mic);
    myDrums.amplitude.setInput(boom);

    let sound = sounds.map(sound => {
      console.log(sound);
    });

    myDrums.amplitude.setInput(kick);
    myDrums.amplitude.setInput(snare);
    myDrums.amplitude.setInput(tom);
    myDrums.amplitude.setInput(clap);
    myDrums.amplitude.setInput(hihat);
    myDrums.amplitude.setInput(openhat);
    myDrums.amplitude.setInput(ride);

    myDrums.amplitude.smooth(0.9);

    // /console.log(myDrums.amplitude.getLevel());
  }

  myDrums.draw = function () {
    myDrums.background('#282828');
    myDrums.fill(255);
    var level = myDrums.amplitude.getLevel();
    //console.log(level);
    var size = myDrums.map(level, 0, 1, 0, 200);
    myDrums.ellipse(myDrums.width/2, myDrums.height/2, size, size);
  }

  myDrums.playSound = function () {
    const padNumber = (event.data[1]);
    //const audio = document.querySelector(`audio[data-key="${padNumber}"]`);
    const key = document.querySelector(`.key[data-key="${padNumber}"]`);
    //const pads = Array.from(document.querySelectorAll('.key'));
    //  pads.forEach(pad => {
    //});

    //console.log(pads);

    myDrums.textFont('sans-serif', 24);
    myDrums.textWidth(padWidth);
    myDrums.textAlign(myDrums.LEFT, myDrums.TOP);
    myDrums.fill(255, 255, 255);
    myDrums.strokeWeight(0);
    myDrums.text(padNumber, padX, padY);

    //console.log(padRange);
    //console.log(sounds);

    // trigger sound on pad down only (127)
    if (event.data[2] == 127) {
      //if (!audio) return;
      //audio.currentTime = 0;
      //audio.play();


      console.log(padNumber);

      key.classList.add('playing');

      if (padNumber == 9) {
        boom.play();
      }
      if (padNumber == 10) {
        kick.play();
      }
      if (padNumber == 11) {
        snare.play();
      }
      if (padNumber == 12) {
        tom.play();
      }
      if (padNumber == 25) {
        clap.play();
      }
      if (padNumber == 26) {
        hihat.play();
      }
      if (padNumber == 27) {
        openhat.play();
      }
      if (padNumber == 28) {
        ride.play();
      }

      // User setting pads

      if (padNumber == 36) {
        tink.play();
      }

      if (padNumber == 37) {
        beatbox.play();
      }

      if (padNumber == 38) {
        drum.play();
      }

      if (padNumber == 39) {
        kick_707.play();
      }

      if (padNumber == 40) {
        my_first_piano.play();
      }

      if (padNumber == 41) {
        piano_p6.play();
      }

      if (padNumber == 42) {
        snare_707.play();
      }

      if (padNumber == 43) {
        snare_707_b.play();
      }

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
  myDrums.micOn = function () {
    // Create an Audio input
    mic = new p5.AudioIn();
    // start the Audio Input.
    // By default, it does not .connect() (to the computer speakers)
    mic.start();
  }

}

var midiDrums = new p5(mySketch, 'canvas');

