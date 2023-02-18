

const section = document.querySelector("section.book")

const scene = new THREE.Scene(); // This line creates a new instance of the Three.js Scene class, which represents the root container for all the objects in the 3D scene.
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // This line creates a new instance of the Three.js PerspectiveCamera class, which represents a camera that gives the illusion of depth by using perspective projection. The constructor takes several parameters: the field of view (75 degrees), the aspect ratio (width/height of the viewport), the near clipping plane (0.1), and the far clipping plane (1000).
//The near clipping plane (0.1 in the code) is the closest distance from the camera to which objects will still be visible in the scene. Objects that are closer to the camera than the near clipping plane will not be displayed. This is used to prevent objects that are very close to the camera from appearing very large and distorted on the screen.
//The far clipping plane (1000 in the code) is the farthest distance from the camera to which objects will still be visible in the scene. Objects that are farther away from the camera than the far clipping plane will not be displayed.

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}); // This line creates a new instance of the Three.js WebGLRenderer class, which is responsible for rendering the scene. The constructor takes an options object with two properties: alpha (true) for transparency and antialias (true) for smoother edges.
renderer.setSize( window.innerWidth, window.innerHeight ); //This line sets the size of the renderer to the size of the window.
section.appendChild( renderer.domElement ); //This line appends the renderer's DOM element to the selected "section.book" element.

const light = new THREE.DirectionalLight(0xffffff) //This line creates a new instance of the Three.js DirectionalLight class, which represents a directional light source that shines in a specific direction. The constructor takes the color of the light (0xffffff, which is white).
light.position.set(0,0,6) //This line sets the position of the light in the scene.
scene.add(light)

const loader = new THREE.TextureLoader() // This line creates a new instance of the Three.js TextureLoader class, which is responsible for loading textures into the scene.

const urls = [ "edge.png","spine.png","top.png","bottom.png","front.png","back.png"] //This line creates an array of URLs pointing to the images that will be used as textures.

const materials = urls.map(url => {
    return new THREE.MeshLambertMaterial({
        map: loader.load(url)  //This line creates an array of MeshLambertMaterial instances using the map function and the urls array. The MeshLambertMaterial class is a type of material that provides a diffuse shading, which is a simple shading model that calculates the amount of light reflected off an object based on its angle relative to the light source.
    })
})



const geometry = new THREE.BoxGeometry( 3.5, 5, 0.5 );  // This line creates a new instance of the Three.js BoxGeometry class, which represents a box shape with the specified dimensions (3.5, 5, 0.5). width, height, and depth.

const cube = new THREE.Mesh( geometry, materials ); //This line creates a new instance of the Three.js Mesh class, which is a basic object that can be rendered in the scene. The constructor takes two parameters: the geometry and the materials. In this case, the materials array is passed in, which will result in each face of the box being textured with a different image.


scene.add( cube );


camera.position.z = 6; //This line sets the initial position of the camera along the z-axis to 6.

let currentTimeline = window.pageYOffset/ 3000; //The line let currentTimeline = window.pageYOffset/3000 creates a variable currentTimeline and sets its value to the result of the division of window.pageYOffset by 3000.window.pageYOffset is a property in JavaScript that returns the number of pixels that the content of an HTML document is scrolled vertically. It's a value that increases as the user scrolls down the page.By dividing window.pageYOffset by 3000, we get a value that ranges between 0 and 1, representing the scroll position as a fraction of the total scrollable distance. For example, if the user has scrolled down 600 pixels, window.pageYOffset would be equal to 600, and currentTimeline would be equal to 0.2 (600 / 3000 = 0.2).The purpose of currentTimeline is to provide a value that can be used to animate an object, such as a cube, based on the current scroll position.
let aimTimeline = window.pageYOffset/ 3000;

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

 
  
  const time = performance.now() * 0.001; //This line calculates the current time in seconds by multiplying the result of performance.now() with 0.001. performance.now() returns the time in milliseconds, so by multiplying it with 0.001 we convert it to seconds.

const radius = 4; 
const angle = time * 0.5;//These two lines define the radius and angle for the movement of the light source in 3D space. radius is set to 4, and angle is calculated as half of time.

light.position.x = Math.sin(angle) * radius;
light.position.z = Math.cos(angle) * radius;
//These two lines set the x and z position of the light source using the sin and cos functions, respectively. The sin and cos functions take angle as input and return values between -1 and 1, which are then multiplied by the radius to determine the final position of the light source.



    currentTimeline += (aimTimeline - currentTimeline) * 0.1

    const rx = currentTimeline * -0.5 +0.5
    const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 2

    cube.rotation.set(rx,ry, 0) //This line sets the rotation of the cube to the values calculated in the previous two lines. The cube will be rotated along the x and y axes, with a value of 0 along the z axis.
  


	renderer.render( scene, camera ); //This line renders the scene with the camera. The scene is a 3D environment containing the cube and light source, and the camera defines the perspective from which the scene is viewed.
}
animate(); //This is a function that calls itself using requestAnimationFrame, which is a JavaScript method that repeatedly calls a function to animate the scene. The function updates the time and position of the light source and rotates the cube, and then calls renderer.render to render the scene.


window.addEventListener("scroll" , function(){
    aimTimeline = window.pageYOffset /3000
})//This line adds an event listener to the window object that listens for the scroll event. When the scroll event is triggered, the aimTimeline is updated




