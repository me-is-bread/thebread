var noise = new SimplexNoise();
var active = false;
var play_active = false;
var vizInit = function (){
  
var audio = document.getElementById("audio");
var _preCheckScreen = document.getElementById("pre-check");
var _powerUp = document.getElementById("power-up");
var _postCheckScreen = document.getElementById("post-check");

var introString = `
    I'm a web developer mostly <br />
    familiar in UI/UX and HTML, <br />
    CSS, JS and reactJS for <br />
    designing web interfaces. <br />
    Furthermore, brief knowledge <br />
    of android application designing, <br />
    worked with android studio <br />
    and visual studio for mobile <br />
    and desktop applications <br />
    respectively. Moreover, worked <br />
    with Unreal and Unity3D game <br />
    engines building personal <br />
    projects and studying level <br />
    design and game mechanics.
    `;
var greetString = "Hi, my name is,";
var nameString = `
    <span class="highlight">Sahil Raut.</span> <br />
    I build things <br />
    for Web.
    `;

function typewriterEffect(elementId, textArray, speed = 120, cursorChar = '_') {
  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  let textIndex = 0;
  let charIndex = 0;

  function type() {
    const currentText = textArray[textIndex];
    let displayText = "";
    displayText = currentText.substring(0, charIndex + 1);
    charIndex++;
    targetElement.innerHTML = displayText;
    setTimeout(type, speed);
  }

  type();
}

_powerUp.onclick = function() {
    if (play_active == false){ 
        play();
        play_active = true;      
        _preCheckScreen.style.display = "none";
        _postCheckScreen.style.display = "block";
        typewriterEffect("typed", ["Portfolio"], 120);
        typewriterEffect("greetString", [greetString], 120);
        typewriterEffect("nameString", [nameString], 120);
        typewriterEffect("introString", [introString], 60);
        /*new Typed('#typed', {
            strings: ['Portfolio'],
            typeSpeed: 60,
            cursorChar: '_'
        });
        new Typed('#typed-content', {
            strings: "#content-text",
            typeSpeed: 60,
            cursorChar: '_'
        });*/
    }
}

audio.onplay = function() {
    active = true;
}

audio.onpause = function() {
    active = false;
}

window.onclick = function() {
    if (active == false && play_active == true) {
        audio.play();
        console.log("playing");
    }
    else if(active == true && play_active == true){
        audio.pause();
        console.log("paused");
    }
}

function play() {
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var scene = new THREE.Scene();
    var group = new THREE.Group();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    if (window.navigator.userAgent.indexOf("Android") != -1)
    {
        camera.position.set(0, 0, 150);
    }
    else 
    {
        camera.position.set(0, 0, 60);
    }
    camera.lookAt(scene.position);
    scene.add(camera);

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    var icosahedronGeometry = new THREE.IcosahedronGeometry(10, 4);
    var lambertMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: true,
        emissive: 0xffffff,
        emissiveIntensity: 1,
    });

    var ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    ball.position.set(0, 0, 0);
    group.add(ball);

    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.intensity = 0.9;
    spotLight.position.set(-10, 40, 20);
    spotLight.lookAt(ball);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    scene.add(group);

    document.getElementById("out").appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    render();

    function render() {
      analyser.getByteFrequencyData(dataArray);

      var lowerHalfArray = dataArray.slice(0, (dataArray.length/2) - 1);
      var upperHalfArray = dataArray.slice((dataArray.length/2) - 1, dataArray.length - 1);

      var overallAvg = avg(dataArray);
      var lowerMax = max(lowerHalfArray);
      var lowerAvg = avg(lowerHalfArray);
      var upperMax = max(upperHalfArray);
      var upperAvg = avg(upperHalfArray);

      var lowerMaxFr = lowerMax / lowerHalfArray.length;
      var lowerAvgFr = lowerAvg / lowerHalfArray.length;
      var upperMaxFr = upperMax / upperHalfArray.length;
      var upperAvgFr = upperAvg / upperHalfArray.length;
      
      makeRoughBall(ball, modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8), modulate(upperAvgFr, 0, 1, 0, 4));

      group.rotation.y += 0.005;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function makeRoughBall(mesh, bassFr, treFr) {
        mesh.geometry.vertices.forEach(function (vertex, i) {
            var offset = mesh.geometry.parameters.radius;
            var amp = 7;
            var time = window.performance.now();
            vertex.normalize();
            var rf = 0.00001;
            var distance = (offset + bassFr ) + noise.noise3D(vertex.x + time *rf*7, vertex.y +  time*rf*8, vertex.z + time*rf*9) * amp * treFr;
            vertex.multiplyScalar(distance);
        });
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.normalsNeedUpdate = true;
        mesh.geometry.computeVertexNormals();
        mesh.geometry.computeFaceNormals();
    }
  };
}

window.onload = vizInit();

document.body.addEventListener('touchend', function(ev) { context.resume(); });

function fractionate(val, minVal, maxVal) {
    return (val - minVal)/(maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
}

function avg(arr){
    var total = arr.reduce(function(sum, b) { return sum + b; });
    return (total / arr.length);
}

function max(arr){
    return arr.reduce(function(a, b){ return Math.max(a, b); })
}