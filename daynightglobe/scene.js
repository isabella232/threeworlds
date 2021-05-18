var scene = new THREE.Scene();
var ratio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
  0.1, 10000);

var lat = 35.885 * Math.PI / 180.;
var lon = -106.306 * Math.PI / 180.;
// Sunrise at summer solstice:
var subsolar_lon = 3.2226102170765776 * Math.PI / 180.;
var subsolar_lat = 23.43697580860745 * Math.PI / 180.;

// Set the camera position to be over the given lon, lat position.
// x, y and z are toward viewer, up, left
// but that's according to Earth's initial rotation (coords 0, 0)
// so actually, it's: in direction of prime meridian, up,
// toward Pacific Ocean.
// Set left coordinate according to latitude:
//camera.position.set(5, 0, 0);
const CAMDISTANCE = 50;
camera.position.set(Math.cos(lon) * CAMDISTANCE,
                    Math.sin(lat) * CAMDISTANCE,
                    -Math.sin(lon) * CAMDISTANCE);

// Next line is ignored. Do we not get here?
console.log("camera position", camera.position);

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
renderer.localClippingEnabled = true;

var canvas = renderer.domElement;
canvas.style.display = "block";

document.body.appendChild(canvas);

// Enable controls
var controls = new THREE.OrbitControls(camera, canvas);

//Add lighting
//scene.add(new THREE.AmbientLight(0x333333));
var light = new THREE.AmbientLight(0x888888);
light.intensity = 1.5;
scene.add(light);

/*
var light = new THREE.DirectionalLight(0xe4eef9, .7);
light.position.set(12, 12, 8);
scene.add(light);
*/

var radius = 19.99,
  segments = 32,
  rotation = 0;

var globe = new Globe(radius, segments);

scene.add(globe);

// Render the image
function render() {
    controls.update();

  /*
  if(globe.earth)
    globe.earth.rotation.y += 0.0005;

  if(globe.clouds)
    globe.clouds.rotation.y += 0.0005;

    globe.step();
  */

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();