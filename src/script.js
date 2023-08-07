/**
 * for documentation and more demos,
 * visit https://audiomotion.dev
 */

// load module from Skypack CDN
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';

// audio source
const audioEl = document.getElementById('audio');

// container
const container = document.getElementById('container');

// instantiate analyzer
const audioMotion = new AudioMotionAnalyzer( container, {
  source: audioEl,
  fsElement: container,
  mode: 10,
  gradient: 'rainbow',
  lineWidth: 1.5,
  fillAlpha: .5,
  showPeaks: false
});

// file upload
document.getElementById('upload').addEventListener( 'change', e => {
	const fileBlob = e.target.files[0];

	if ( fileBlob ) {
		audioEl.src = URL.createObjectURL( fileBlob );
		audioEl.play();
	}
});

/* ======== CONTROLS (dat-gui) ======== */

const gui = new dat.GUI({ autoPlace: false });

const buttons = {
  link: () => window.parent.location = 'https://audiomotion.dev',
  loadFile: () => document.getElementById('upload').click(),
  playStream: () => {
    audioEl.src = 'https://icecast2.ufpel.edu.br/live';
    audioEl.play();
  },
  fullscreen: () => audioMotion.toggleFullscreen(),
}

gui.add( buttons, 'loadFile' ).name('Upload audio file');
gui.add( buttons, 'playStream' ).name('Play live stream');
gui.add( buttons, 'fullscreen' ).name('Fullscreen');

gui.add( audioMotion, 'gradient', ['classic','prism','rainbow'] );

gui.add( audioMotion, 'mode', {
    'Discrete frequencies' : 0,
    '1/24th octave bands' : 1,
    '1/12th octave bands' : 2,
    '1/8th octave bands' : 3,
    '1/6th octave bands' : 4,
    '1/4th octave bands' : 5,
    '1/3rd octave bands' : 6,
    'Half octave bands' : 7,
    'Full octave bands' : 8,
    'Line / Area graph' : 10    
});

gui.add( audioMotion, 'mirror', -1, 1, 1 );

const bandsFolder = gui.addFolder('Octave bands settings');

bandsFolder.add( audioMotion, 'barSpace', 0, 1, .1 );

for ( let prop of [ 'ledBars', 'lumiBars' ] )
  bandsFolder.add( audioMotion, prop );

const graphFolder = gui.addFolder('Line / Area graph settings');

graphFolder.add( audioMotion, 'lineWidth', 0, 10, .5 );
graphFolder.add( audioMotion, 'fillAlpha', 0, 1, .1 );

const radialFolder = gui.addFolder('Radial settings');

radialFolder.add( audioMotion, 'radial' );
radialFolder.add( audioMotion, 'spinSpeed', -5, 5, 1 );

const reflexFolder = gui.addFolder('Reflex settings');

reflexFolder.add( audioMotion, 'reflexRatio', 0, .9, .1 );
reflexFolder.add( audioMotion, 'reflexAlpha', 0, 1, .1 );
reflexFolder.add( audioMotion, 'reflexBright', 0, 2, .1 );
reflexFolder.add( audioMotion, 'reflexFit' );

const switchesFolder = gui.addFolder('Switches');

const switches = [ 'showBgColor', 'showPeaks', 'showScaleX', 'showScaleY', 'stereo', 'splitGradient', 'loRes', 'showFPS' ];

for ( let prop of switches )
  switchesFolder.add( audioMotion, prop );

gui.add( buttons, 'link' ).name(`Docs (v${AudioMotionAnalyzer.version})`);

container.appendChild( gui.domElement );

