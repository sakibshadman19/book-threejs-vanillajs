const section = document.querySelector("section.book")

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
section.appendChild( renderer.domElement );
const AmbientLight = new THREE.AmbientLight(0xffffff,0.6 )
scene.add(AmbientLight)
const light = new THREE.DirectionalLight(0xffffff) 
light.position.set(0,0,6) 
scene.add(light)
scene.add(AmbientLight)


const loader = new THREE.TextureLoader()

const urls = [ "edge.png","spine.png","top.png","bottom.png","front.png","back.png"] 

const materials = urls.map(url => {
    return new THREE.MeshLambertMaterial({
        map: loader.load(url) 
    })
})



const geometry = new THREE.BoxGeometry( 3.5, 5, 0.5 ); 

const cube = new THREE.Mesh( geometry, materials ); 


scene.add( cube );


camera.position.z = 6; 


// Define a variable for camera movement speed
const cameraMoveSpeed = 0.1;

// Add event listener for keyboard input
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    // Move camera forward (along z-axis)
    case "w":
      camera.position.z -= cameraMoveSpeed;
      break;
    // Move camera backward (along z-axis)
    case "s":
      camera.position.z += cameraMoveSpeed;
      break;
    // Move camera left (along x-axis)
    case "a":
      camera.position.x -= cameraMoveSpeed;
      break;
    // Move camera right (along x-axis)
    case "d":
      camera.position.x += cameraMoveSpeed;
      break;
    // Move camera up (along y-axis)
    case "r":
      camera.position.y += cameraMoveSpeed;
      break;
    // Move camera down (along y-axis)
    case "f":
      camera.position.y -= cameraMoveSpeed;
      break;
  }
});

function animate() {
  requestAnimationFrame( animate ); //This line requests that the browser call the animate function before the next repaint, to update the animation

 
  
  const time = performance.now() * 0.001; 

const radius = 6; 
const angle = time * 0.5;

light.position.x = Math.sin(angle) * radius;
light.position.z = Math.cos(angle) * radius;




    // currentTimeline += window.pageYOffset/3000
    const currentTimeline = window.pageYOffset /3000

    const rx = currentTimeline * -0.5 +0.5
    const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 2

    cube.rotation.set(rx,ry, 0) 
  


  renderer.render( scene, camera ); 
}
animate();