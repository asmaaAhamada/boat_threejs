


/*
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


import { Water } from 'three/examples/jsm/objects/Water.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import * as dat from "lil-gui";






class BoatPhysics {
  constructor(mass, length, width, Rspecific, Tkelvin) {
    this.mass = mass;
    this.length = length;
    this.width = width;
    this.dt = 0.04;//1بيطير بسرعة 
    this.cd = 1.25;
this.angle=0;
this.s=40;
//this.r=1;
































this.arm = new THREE.Vector3(2, 0, 0);
this.angularVelocity=0, // السرعة الزاوية
     this. angularAcceleration= 0, // التسارع الزاوي
       // الزمن بين كل تحديث
     this. maxAngularVelocity=0.1,





this.direction= 0, // 1 لليمين، -1 لليسار
  this.switchInterval= 2, // عدد الثواني بين تغيير الاتجا
    this.v = new THREE.Vector3();
    this.pos = new THREE.Vector3();
    this.a = new THREE.Vector3();

    this.g = new THREE.Vector3(0, -9.8, 0);

    this .torque=new THREE.Vector3();
    this.omega= new THREE.Vector3(0, 0, 0),
  this.theta=new THREE.Vector3(0, 0, 0),
    this.alpha=new THREE.Vector3();
    
  }

  calculatef_totale() {
    let f = new THREE.Vector3();
    f = f.add(this.calculateWeight()).add(this.calculateBuoyantForce().add(this.tensionForce()));
    
    
    if (this.time >= this.switchInterval) {
      this.direction *= -1;
      this.dt= 0; // إعادة تعيين الوق


    }

    this.time += this.dt;
    f.add(new THREE.Vector3(0, 0, this.direction));
    



    //f=f1+f2+f3+.....
    return f;
  }
  calculate_all() {
    this.a = this.calculatef_totale().divideScalar(this.mass);//a=f/m
    // v+=a.dt
    // pos+=pos.dt

    let h = this.a.clone().multiplyScalar(this.dt);//v=a*dt
    this.v = this.v.clone().add(h);

    let e = this.v.clone().multiplyScalar(this.dt);//pos=pos*dt
    this.pos = this.pos.clone().add(e);

    console.table(this.pos);
  }


  calculateWeight() {
    return this.g.clone().multiplyScalar(this.mass);//w=m*g
  }








  atm_pressure() {
    let R = 8.3145; 
    let Md = 0.028964; 
    let P0 = 101325; 
    let Tkelvin = this.temperature + 273.15;

    let x = (-1 * Md *this.calculateWeight * this.pos) / (R * Tkelvin);
    
    return P0 * Math.exp(x); 
  }


  air_rho() {
    let Rspecific = 287.058; //specific gas constant for dry air
    let Tkelvin = this.temperature + 273.15;
    let P = this.atm_pressure();
   
    let rho = P / (Rspecific * Tkelvin); 
    
    return rho;
}


  water_rho() {
    
    return 1;
    
  }


  vol() {
    let c = 6, h = 9;
    let b = c - this.pos.y;
    if (b < 0) {
      b = 0;
    }
    else if (b > h) {
      b = h;
      console.log(this.b);
    }

    let v = b * this.width * this.length;

    return v;
  }

  calculateBuoyantForce() {
    return this.g.clone().multiplyScalar(this.vol()).multiplyScalar(this.water_rho()).multiplyScalar(-1);
  }

  


 tensionForce() {
  
  var boatWeight = 3332; 
  
  var waterDensity = this.water_rho();
  
  
  var v = 0.4// تقدير لسرعة قارب متوسط
  
  // زاوية الحركة بالنسبة للاتجاه الأفقي (بالراديان)
  var angle = Math.PI / 3; 
  
  // حساب مقدار قوة الشد
  //w-fb
  var tensionMag = (boatWeight * 9.8) -0.5
                  * waterDensity * this.cd* this.s * Math.pow(v, 2)
                  * Math.cos(this.angle);
                  
                  
                  

  var tension = (boatWeight * 9.8) -0.5
  * waterDensity * this.cd* this.s * Math.pow(v, 2)
  * Math.cos(this.angle);



            
  
  // تحديد اتجاه قوة الشد
  var tensionDir = new THREE.Vector3(-Math.sin(angle), Math.cos(angle), 0);
  
  // حساب متجه قوة الشد
  var Tension = tensionDir.multiplyScalar(tensionMag);
  
  return Tension;
  
}


calculateTorque(calculate_all, arm) {
  return new THREE.Vector3().crossVectors(arm, calculate_all); }






 


//   let totalForce = this.calculatef_totale();
//   let torque = totalForce.z * this.r;
//   this.angularAcceleration = torque / (this.mass * Math.pow(this.r, 2));
//   this.angularVelocity += this.angularAcceleration * this.dt;
//   this.angle += this.angularVelocity * this.dt;



//  // إذا كنت تستخدم المحور Z للدوران
// }







// applyRotation(object) {
//   object.rotation.y = this.angle;}
// moveLeft() {
//   this.torque = -1;
// }
// moveRight() {
//   this.force = new THREE.Vector3(0, 0, 1);
// }
// stop() {
//   this.direction = 0;
// }










}
  

let timeelasbed;
const boatPhysics = new BoatPhysics(3332, 30, 20,10,14);


const scene = new THREE.Scene();
const canvas = document.querySelector("canvas.webgl");
const listener = new THREE.AudioListener();
//gui
const gui = new dat.GUI();
const parameter = {
 // waterColor: 0x09effe,
  waveHeight: 0,
  waterColor: 0x000000,
  volume: 0.5,
    waterwave:0.01,

  play: () => sound.play(),
  stop: () => sound.stop(),
  toneMappingExposure: 1.0,
dt:0.5,


scaleX: 98,
            scaleY: 60,
            scaleZ: 80,




            gravity: 9.8,
            airDensity: 1.225,
            waterDensity: 1,
            boatWeight: 3332,
            //speed: 0.4,
            // angle: Math.PI / 3,
            // cd: 1.0,
            // s: 1.0,
            // width: 1.0,
            // length: 2.0,
            // temperature: 25,
            // pos: { y: 0 }










};

const modelsGroup = new THREE.Object3D();
scene.add(modelsGroup);

let boatmodel;

const gltfloader = new GLTFLoader();
let cursor = new THREE.Vector3();





gltfloader.load("model/scene.gltf", function (gltf) {

  
  gltf.scene.scale.set(98, 60, 80);
 
  boatmodel = gltf.scene;
  
  modelsGroup.add(boatmodel);
 camera.position.set(-8000,900)
 
},
  (progress) => {
    
  },
  (error) => {
    console.log("error");
  });

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / window.Size.width - 0.5;
  cursor.y = e.clientY / window.Size.hight - 0;
});










let boate;
   gltfloader.load("allow/scene.gltf", function (gltf) {

  
    gltf.scene.scale.set(5000, 4000, 4000);
    gltf.scene.position.set(2100,90,-4000);
     boate = gltf.scene;
     
     modelsGroup.add(boate);
    camera.position.set(-8000,900)
   },
     (progress) => {
       console.log("ااي دونت كيير ")
     },
     (error) => {
       console.log("error");
     });




//  scene.scale.y = 5;
//  scene.scale.x = 5;
//   scene.scale.z = 5;

//tree
let islandmodel;

gltfloader.load("new/scene.gltf", function (gltf) {

  
   gltf.scene.scale.set(19,52,43);
   gltf.scene.position.set(-2,900,500);
   islandmodel= gltf.scene;
   
   modelsGroup.add(islandmodel);
  camera.position.set(-8000,900)
 },
   (progress) => {
     console.log("الدباغات ")
   },
   (error) => {
     console.log("error");
   });

   
// //house
let boat;
  gltfloader.load("folder/scene.gltf", function (gltf) {

  
   gltf.scene.scale.set(300, 300, 300);
   gltf.scene.position.set(-10000,4,4000);
    boat = gltf.scene;
     
    modelsGroup.add(boat);
    camera.position.set(-8000,900)
  },
     (progress) => {
       console.log("ااي دونت كيير ")
     },
     (error) => {
       console.log("error");
      });
   








     
// let bat;
// gltfloader.load("folder/scene.gltf", function (gltf) {


//  gltf.scene.scale.set(300, 300, 300);
//  gltf.scene.position.set(50,90,-4000);
//   bat = gltf.scene;
  
//   modelsGroup.add(bat);
//  camera.position.set(-8000,900)
// },
//   (progress) => {
//     console.log("ااي دونت كيير ")
//   },
//   (error) => {
//     console.log("error");
//   });








//dolphin
let dolphin;
   gltfloader.load("dolohin/scene.gltf", function (gltf) {

  
    gltf.scene.scale.set(200, 300, 200);
    gltf.scene.position.set(90,40,3000);
     dolphin= gltf.scene;
     
     modelsGroup.add(dolphin);
    camera.position.set(-8000,900)
   },
     (progress) => {
       console.log("ما بيشغلني ")
     },
     (error) => {
       console.log("error");
     });






//sheraai

     let shet;
     gltfloader.load("shetr/scene.gltf", function (gltf) {
      //t(-9,50,-4000);
    
      gltf.scene.scale.set(200, 500, 600);
      gltf.scene.position.set(-10000,500,-7000);
       shet= gltf.scene;
       
       modelsGroup.add(shet);
      camera.position.set(-8000,900)
     },
       (progress) => {
         console.log("فاحت ؤيحة البارود")
       },
       (error) => {
         console.log("error");
       });
  





     //sheraai  
     let lettle;
     gltfloader.load("shetr/scene.gltf", function (gltf) {
      //t(-9,50,-4000);
    
      gltf.scene.scale.set(200, 500, 600);
      gltf.scene.position.set(-5000,400,-5000);
       lettle= gltf.scene;
       
       modelsGroup.add(lettle);
      camera.position.set(-8000,900)
     },
       (progress) => {
         console.log("شرمالك يفتح الله عليك")
       },
       (error) => {
         console.log("error");
       });
  












       //arba
       let lettl;
       gltfloader.load("lettle/scene.gltf", function (gltf) {
        //t(-9,50,-4000);
      
        gltf.scene.scale.set(90, 150, 90);
        gltf.scene.position.set(-6000,-600,4000);
         lettl= gltf.scene;
         
         modelsGroup.add(lettl);
        camera.position.set(-8000,900)
       },
         (progress) => {
           console.log("شرمالك يفتح الله عليك")
         },
         (error) => {
           console.log("error");
         });




//camera
  const pos = new THREE.Vector3(800, 800, -600);
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight,15, 100000);
camera.position.set(-800, 800, -600);




let forwardDirection = new THREE.Vector3(0, 0, -1);
let targetPosition = new THREE.Vector3().addVectors(camera.position, forwardDirection);
camera.lookAt(targetPosition);
scene.add(camera);


camera.position.copy(pos); // Set the desired camera position
camera.lookAt(new THREE.Vector3(200, 1000, 600)); // Look at the center of the scene


camera.add(listener);


 const renderer = new THREE.WebGLRenderer({ canvas });
 window.addEventListener('DOMContentLoaded', async () => {

})


let destance=3900;
let angle=(Math.PI/2)

 function moveCamera() {

 camera.position.x = boatmodel.position.x +destance*Math.sin(0.4 *angle+180) ;
 camera.position.z= boatmodel.position.z +destance*Math.cos(0.4 *angle+180) ;
 camera.lookAt(boatmodel.position)
 }




renderer.toneMapping = THREE.ReinhardToneMapping;

renderer.setSize(window.innerWidth, window.innerHeight);
const ambet = new THREE.AmbientLight();
scene.add(ambet);
const DirectionalLight = new THREE.DirectionalLight();
scene.add(DirectionalLight);

const control = new OrbitControls(camera, renderer.domElement);

control.update();


//السماء والشمس 
scene.background = new THREE.TextureLoader().load('textures/1/ss.jpg'); 
//sound basic
const audioLoader = new THREE.AudioLoader();
const sound = new THREE.Audio(listener);
var pauseTime = 0;
audioLoader.load('audio/sound.m4a', function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
  sound.stop();


});
// إنشاء البحر
const waterGeometry = new THREE.PlaneGeometry(2000000, 2000000);
const water = new Water(
  waterGeometry,
  {
   
    waterNormals: new THREE.TextureLoader().load('textures/1/water.jpeg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),
    alpha: 9.0,//1.0
    sunDirection:THREE.PointLight.position,

    
waterwave:parameter.waterwave,
    waterColor: parameter.waterColor,
    waveHeight: parameter.waveHeight,
    //volume: parameter.volume,

  }
);

water.position.y = -20
water.rotation.x= - Math.PI / 2;
water.rotation.z=  -20;
scene.add(water);


// اضافة الجزيرة 
const treeGeometry = new THREE.CylinderGeometry(-500, 3000, 100);
  const treeMaterial = new THREE.MeshStandardMaterial({ color: 0xe15f19 });//0a4320    green 
   const tree = new THREE.Mesh(treeGeometry, treeMaterial);
 
  tree.position.set(-9,40,-4000);
 
  scene.add(tree);



water.material.uniforms[ 'time' ].value += 1//1












// //gui
// const phescis=gui.addFolder('phescis');
// phescis.add(


const folder=gui.addFolder('phiscs');





// خصائص كثافة الهواء
folder.add(parameter, 'airDensity', 0, 2, 0.01).name('Air Density')//.onChange(()=>boatPhysics.atm_pressure());

// خصائص كثافة الماء
folder.add(parameter, 'waterDensity', 0, 2, 0.01).name('Water Density');


//folder.add(params, 'boatWeight', 0, 10000, 10).name('Boat Weight');







folder.add(boatPhysics, 'mass', 33, 33324).name('Mass (kg)').onChange(() => boatPhysics.calculate_all());
folder.add(boatPhysics, 'length', 0, 12.02).name('Length (m)').onChange(() => boatPhysics.calculate_all());
//folder.add(boatPhysics, 'width', 0, 10).name('Width (m)').onChange(() => boatPhysics.calculate_all());
folder.add(boatPhysics, 'dt', 0, 0.5).name('speed').onChange(() => boatPhysics.calculate_all());
//folder.add(boatPhysics, 'moveLeft',0,9).name('Move Left') .onChange(() => boatPhysics.applyRotation());  ;
// folder.add(boatPhysics, 'moveRight').name('Move Right');
//     folder.add(boatPhysics, 'stop').name('Stop');




const boatscale=gui.addFolder('Boat')
boatscale.add(parameter, 'scaleX', 1, 200).onChange(function (value) {
  if (boatmodel) boatmodel.scale.x = value;
});
boatscale.add(parameter, 'scaleY', 1, 200).onChange(function (value) {
  if (boatmodel) boatmodel.scale.y = value;
});
boatscale.add(parameter, 'scaleZ', 1, 200).onChange(function (value) {
  if (boatmodel) boatmodel.scale.z = value;
});







gui.add(water.position, "y", -8, 600, 0.1);


const waterfolder=gui.addFolder('water');
waterfolder.add(water, "visible");
//gui.add(water, "visible");


waterfolder.addColor(parameter, 'waterColor').name('Water Color').onChange(() => {
  water.material.uniforms['waterColor'].value = new THREE.Color(parameter.waterColor);
});


waterfolder.add(parameter, 'waterwave',0.1,100).name('Waterwave').onChange(() => {
  water.material.uniforms['time'].value +=parameter.waterwave;
});

const soundfolder=gui.addFolder('sound');

soundfolder.add(parameter, 'volume', 0, 10).onChange(function (value) {
  sound.setVolume(value);
});

// إضافة زر لتشغيل الصوت 
soundfolder.add(parameter, 'play');

// إضافة زر لإيقاف الصوت
soundfolder.add(parameter, 'stop');

const exposureController = gui.add(renderer, 'toneMappingExposure', 0.15162, 4).name('Exposure');

exposureController.onChange(function (value) {
  
  renderer.toneMappingExposure = value;
});



// الرندر والتحديث
function animate() {
  requestAnimationFrame(animate);
  
  water.material.uniforms[ 'time' ].value += 0.2



  
  //boatPhysics.applyRotation(boatmodel);



  if (boatmodel) {
    boatPhysics.calculate_all();
    boatmodel.position.copy(boatPhysics.pos);
    //boatmodel.rotation.z =copy(boatPhysics.theta.z) ; 
    //boatPhysics.calculate_inter();
    //boatPhysics.calculate_inter();
    //boatmodel.rotation.y = boatPhysics.angle;
     //boatPhysics.calculateTorque(boatPhysics.calculate_all, boatPhysics.arm);



    //  setInterval(() => {
    //   tourq.update();
    // }, 100);

  }
  //gltfloader.timeelasbed = timeelasbed * 0.01;
  dolphin.rotation.x+=0.02
   //dolphin.rotation.z+=0.02
   

 moveCamera();

 
  control.update();
  renderer.render(scene, camera);
}
animate();
*/



import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


import { Water } from 'three/examples/jsm/objects/Water.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import * as dat from "lil-gui";

class BoatPhysics {
  constructor(mass, length, width
    // , temperature, Tkelvin
  ) {
    this.mass = mass;
    this.length = length;
    this.width = width;
    this.dt = 0.1;//1بيطير بسرعة 
    this.cd = 1.25;
    //this.angle = 0;
    this.s = 40;

    //this.r=1;

    this.arm = new THREE.Vector3(2, 0, 0);
    this.angularVelocity = 0; // السرعة الزاوية
    this.angularAcceleration = 0; // التسارع الزاوي
    // الزمن بين كل تحديث
    this.maxAngularVelocity = 0.1;

    this.direction = 0; // 1 لليمين، -1 لليسار
    this.switchInterval = 2; // عدد الثواني بين تغيير الاتجا
    this.v = new THREE.Vector3();
    this.pos = new THREE.Vector3();
    this.a = new THREE.Vector3();

    this.g = new THREE.Vector3(0, -9.8, 0);

    this.torque = new THREE.Vector3();
    this.omega = new THREE.Vector3(0, 0, 0);
    this.theta = new THREE.Vector3(0, 0, 0);
    this.alpha = new THREE.Vector3();

    this.anglez = 0 * Math.PI / 180;
    this.engineForce = 100000;
  }
  calculate_cd() {
    return 0.5;
  }
  calculate_cl() {
    var AoA = this.calculateAngle();
    return AoA;
  }

  calculateAngle() {
    var vn = this.v.clone().normalize();
    var hn = this.calculateHead().clone().normalize();
    var vh = vn.cross(hn);
    var vhy = vh.y;
    var angle = Math.asin(vhy);
    return angle;
  }
  calculateHead() {
    var r = new THREE.Vector3();
    r.x = Math.sin(this.anglez);
    r.y = 0;
    r.z = Math.cos(this.anglez);
    return r;
  }

  calculateDrag() {
    var d = new THREE.Vector3();
    d.x = 0.5 * this.calculate_cd() * this.area() * this.water_rho() * (-this.v.length() * this.v.x); // to complete
    d.y = 0.5 * this.calculate_cd() * this.area() * this.water_rho() * (-this.v.length() * this.v.y); // to complete
    d.z = 0.5 * this.calculate_cd() * this.area() * this.water_rho() * (-this.v.length() * this.v.z); // to complete
    return d;
  }
  calculateLift() {
    var l = new THREE.Vector3();
    var cl = this.calculate_cl();
    return 1;
  }
  calculateEngine() {
    var f = new THREE.Vector3();
    f.x = this.engineForce * Math.sin(this.anglez);
    f.y = 0;
    f.z = this.engineForce * Math.cos(this.anglez);
    return f;
  }

  calculatef_totale() {
    let f = new THREE.Vector3();
    f = f.add(this.calculateWeight()).add(this.calculateBuoyantForce()).add(this.calculateEngine()).add(this.calculateDrag());

    if (this.time >= this.switchInterval) {
      this.direction *= -1;
      this.dt = 0; // إعادة تعيين الوق
    }

    this.time += this.dt;
    f.add(new THREE.Vector3(0, 0, this.direction));
    //f=f1+f2+f3+.....
    return f;
  }
  calculate_all() {
    console.log("angle: ", this.calculateAngle());

    this.a = this.calculatef_totale().divideScalar(this.mass);//a=f/m
    // v+=a.dt
    // pos+=pos.dt

    let h = this.a.clone().multiplyScalar(this.dt);//v=a*dt
    this.v = this.v.clone().add(h);

    let e = this.v.clone().multiplyScalar(this.dt);//pos=pos*dt
    this.pos = this.pos.clone().add(e);

    console.log(this.pos);
  }

  calculateWeight() {
    return this.g.clone().multiplyScalar(this.mass);//w=m*g
  }


  water_rho() {
    return 1;
  }


  vol() {
    let c = 6, h = 9;
    let b = c - this.pos.y;
    if (b < 0) {
      b = 0;
    }
    else if (b > h) {
      b = h;
    }

    let v = b * this.width * this.length;

    return v;
  }

  area() {
    let c = 6, h = 9;
    let b = c - this.pos.y;
    if (b < 0) {
      b = 0;
    }
    else if (b > h) {
      b = h;
    }

    let v = b * this.width;

    return v;
  }

  calculateBuoyantForce() {
    return this.g.clone().multiplyScalar(this.vol()).multiplyScalar(this.water_rho()).multiplyScalar(-1);
  }




  calculateTorque(calculate_all, arm) {
    return new THREE.Vector3().crossVectors(arm, calculate_all);
  }






}


let timeelasbed;
const boatPhysics = new BoatPhysics(3032, 30, 20);


const scene = new THREE.Scene();
const canvas = document.querySelector("canvas.webgl");
const listener = new THREE.AudioListener();
//gui
const gui = new dat.GUI();
const parameter = {
  // waterColor: 0x09effe,
  waveHeight: 0,
  waterColor: 0x000000,
  volume: 0.5,
  waterwave: 0.01,

  play: () => sound.play(),
  stop: () => sound.stop(),
  toneMappingExposure: 1.0,
  dt: 0.5,


  scaleX: 98,
  scaleY: 60,
  scaleZ: 80




};

const modelsGroup = new THREE.Object3D();
scene.add(modelsGroup);

let boatmodel;

const gltfloader = new GLTFLoader();
let cursor = new THREE.Vector3();





gltfloader.load("model/scene.gltf", function (gltf) {


  gltf.scene.scale.set(98, 60, 80);

  boatmodel = gltf.scene;

  modelsGroup.add(boatmodel);
  camera.position.set(-8000, 900)

},
  (progress) => {

  },
  (error) => {
    console.log("error");
  });

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / window.Size.width - 0.5;
  cursor.y = e.clientY / window.Size.hight - 0;
});










let boate;
gltfloader.load("allow/scene.gltf", function (gltf) {


  gltf.scene.scale.set(5000, 4000, 4000);
  gltf.scene.position.set(2100, 90, -4000);
  boate = gltf.scene;

  modelsGroup.add(boate);
  camera.position.set(-8000, 900)
},
  (progress) => {
    console.log("ااي دونت كيير ")
  },
  (error) => {
    console.log("error");
  });




//  scene.scale.y = 5;
//  scene.scale.x = 5;
//   scene.scale.z = 5;

// //tree
// let islandmodel;

// gltfloader.load("new/scene.gltf", function (gltf) {


//   gltf.scene.scale.set(19, 52, 43);
//   gltf.scene.position.set(-2, 900, 500);
//   islandmodel = gltf.scene;

//   modelsGroup.add(islandmodel);
//   camera.position.set(-8000, 900)
// },
//   (progress) => {
//     console.log("الدباغات ")
//   },
//   (error) => {
//     console.log("error");
//   });


// //house
// let boat;
//    gltfloader.load("folder/scene.gltf", function (gltf) {


//     gltf.scene.scale.set(300, 300, 300);
//     gltf.scene.position.set(0.02,9000,-4000);
//      boat = gltf.scene;

//      modelsGroup.add(boat);
//     camera.position.set(-8000,900)
//    },
//      (progress) => {
//        console.log("ااي دونت كيير ")
//      },
//      (error) => {
//        console.log("error");
//      });










// let bat;
// gltfloader.load("folder/scene.gltf", function (gltf) {


//  gltf.scene.scale.set(300, 300, 300);
//  gltf.scene.position.set(50,90,-4000);
//   bat = gltf.scene;

//   modelsGroup.add(bat);
//  camera.position.set(-8000,900)
// },
//   (progress) => {
//     console.log("ااي دونت كيير ")
//   },
//   (error) => {
//     console.log("error");
//   });








//dolphin
let dolphin;
gltfloader.load("dolohin/scene.gltf", function (gltf) {


  gltf.scene.scale.set(200, 300, 200);
  gltf.scene.position.set(21008, 90, 4000);
  dolphin = gltf.scene;

  modelsGroup.add(dolphin);
  camera.position.set(-8000, 900)
},
  (progress) => {
    console.log("ما بيشغلني ")
  },
  (error) => {
    console.log("error");
  });






//sheraai

// let shet;
// gltfloader.load("shetr/scene.gltf", function (gltf) {
//   //t(-9,50,-4000);

//   gltf.scene.scale.set(200, 500, 600);
//   gltf.scene.position.set(-10000, 500, -7000);
//   shet = gltf.scene;

//   modelsGroup.add(shet);
//   camera.position.set(-8000, 900)
// },
//   (progress) => {
//     console.log("فاحت ؤيحة البارود")
//   },
//   (error) => {
//     console.log("error");
//   });






//sheraai  
let lettle;
gltfloader.load("shetr/scene.gltf", function (gltf) {
  //t(-9,50,-4000);

  gltf.scene.scale.set(200, 500, 600);
  gltf.scene.position.set(-90000, -100, -100);
  lettle = gltf.scene;

  modelsGroup.add(lettle);
  camera.position.set(-8000, 900)
},
  (progress) => {
    console.log("شرمالك يفتح الله عليك")
  },
  (error) => {
    console.log("error");
  });













//arba
let lettl;
gltfloader.load("lettle/scene.gltf", function (gltf) {
  //t(-9,50,-4000);

  gltf.scene.scale.set(90, 150, 90);
  gltf.scene.position.set(21008, 90, -4000);
  lettl = gltf.scene;

  modelsGroup.add(lettl);
  camera.position.set(-8000, 900)
},
  (progress) => {
    console.log("شرمالك يفتح الله عليك")
  },
  (error) => {
    console.log("error");
  });




//camera
const pos = new THREE.Vector3(800, 800, -600);
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 15, 100000);
camera.position.set(-800, 800, -600);




let forwardDirection = new THREE.Vector3(0, 0, -1);
let targetPosition = new THREE.Vector3().addVectors(camera.position, forwardDirection);
camera.lookAt(targetPosition);
scene.add(camera);


camera.position.copy(pos); // Set the desired camera position
camera.lookAt(new THREE.Vector3(200, 1000, 600)); // Look at the center of the scene


camera.add(listener);


const renderer = new THREE.WebGLRenderer({ canvas });
window.addEventListener('DOMContentLoaded', async () => {

})


let destance = 3900;
let angle = (Math.PI / 2)

function moveCamera() {

  camera.position.x = boatmodel.position.x + destance // * Math.sin(0.4 * angle + 180);
  camera.position.z = boatmodel.position.z + destance // * Math.cos(0.4 * angle + 180);
  camera.lookAt(boatmodel.position)
}




renderer.toneMapping = THREE.ReinhardToneMapping;

renderer.setSize(window.innerWidth, window.innerHeight);
const ambet = new THREE.AmbientLight();
scene.add(ambet);
const DirectionalLight = new THREE.DirectionalLight();
scene.add(DirectionalLight);

const control = new OrbitControls(camera, renderer.domElement);

control.update();


//السماء والشمس 
scene.background = new THREE.TextureLoader().load('textures/1/ss.jpg');
//sound basic
const audioLoader = new THREE.AudioLoader();
const sound = new THREE.Audio(listener);
var pauseTime = 0;
audioLoader.load('audio/sound.m4a', function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
  sound.stop();


});
// إنشاء البحر
const waterGeometry = new THREE.PlaneGeometry(2000000, 2000000);
const water = new Water(
  waterGeometry,
  {

    waterNormals: new THREE.TextureLoader().load('textures/1/water.jpeg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),
    alpha: 9.0,//1.0
    sunDirection: THREE.PointLight.position,


    waterwave: parameter.waterwave,
    waterColor: parameter.waterColor,
    waveHeight: parameter.waveHeight,
    //volume: parameter.volume,

  }
);

water.position.y = -20
water.rotation.x = - Math.PI / 2;
water.rotation.z = -20;
scene.add(water);


// اضافة الجزيرة 
const treeGeometry = new THREE.CylinderGeometry(-500, 3000, 100);
const treeMaterial = new THREE.MeshStandardMaterial({ color: 0xe15f19 });//0a4320    green 
const tree = new THREE.Mesh(treeGeometry, treeMaterial);

tree.position.set(-9, 40, -4000);

scene.add(tree);



water.material.uniforms['time'].value += 1//1












// //gui
// const phescis=gui.addFolder('phescis');
// phescis.add(


const folder = gui.addFolder('phiscs');

folder.add(boatPhysics, 'mass', 33, 33324).name('Mass (kg)').onChange(() => boatPhysics.calculate_all());
folder.add(boatPhysics, 'length', 0, 12.02).name('Length (m)').onChange(() => boatPhysics.calculate_all());
//folder.add(boatPhysics, 'width', 0, 10).name('Width (m)').onChange(() => boatPhysics.calculate_all());
folder.add(boatPhysics, 'dt', 0, 0.5).name('speed').onChange(() => boatPhysics.calculate_all());
//folder.add(boatPhysics, 'moveLeft',0,9).name('Move Left') .onChange(() => boatPhysics.applyRotation());  ;
// folder.add(boatPhysics, 'moveRight').name('Move Right');
//     folder.add(boatPhysics, 'stop').name('Stop');




const boatscale = gui.addFolder('Boat')
boatscale.add(parameter, 'scaleX', 1, 200).onChange(function (value) {
  if (boatmodel) boatmodel.scale.x = value;
});
boatscale.add(parameter, 'scaleY', 1, 200).onChange(function (value) {
  if (boatmodel) boatmodel.scale.y = value;
});
boatscale.add(parameter, 'scaleZ', 1, 200).onChange(function (value) {
  if (boatmodel) boatmodel.scale.z = value;
});





gui.add(water.position, "y", -8, 600, 0.1);


const waterfolder = gui.addFolder('water');
waterfolder.add(water, "visible");
//gui.add(water, "visible");


waterfolder.addColor(parameter, 'waterColor').name('Water Color').onChange(() => {
  water.material.uniforms['waterColor'].value = new THREE.Color(parameter.waterColor);
});


waterfolder.add(parameter, 'waterwave', 0.1, 100).name('Waterwave').onChange(() => {
  water.material.uniforms['time'].value += parameter.waterwave;
});

const soundfolder = gui.addFolder('sound');

soundfolder.add(parameter, 'volume', 0, 10).onChange(function (value) {
  sound.setVolume(value);
});

// إضافة زر لتشغيل الصوت 
soundfolder.add(parameter, 'play');

// إضافة زر لإيقاف الصوت
soundfolder.add(parameter, 'stop');

const exposureController = gui.add(renderer, 'toneMappingExposure', 0.15162, 4).name('Exposure');

exposureController.onChange(function (value) {

  renderer.toneMappingExposure = value;
});



// الرندر والتحديث
function animate() {
  requestAnimationFrame(animate);

  water.material.uniforms['time'].value += 0.2




  //boatPhysics.applyRotation(boatmodel);


  if (boatmodel) {
    boatPhysics.calculate_all();
    boatmodel.position.copy(boatPhysics.pos);
    boatmodel.rotation.y = boatPhysics.anglez + Math.PI / 2;
    //boatPhysics.anglez += 0.001;
    //boatmodel.rotation.z =copy(boatPhysics.theta.z) ; 
    //boatPhysics.calculate_inter();
    //boatPhysics.calculate_inter();
    //boatmodel.rotation.y = boatPhysics.angle;
    //boatPhysics.calculateTorque(boatPhysics.calculate_all, boatPhysics.arm);



    //  setInterval(() => {
    //   tourq.update();
    // }, 100);

  }
  //gltfloader.timeelasbed = timeelasbed * 0.01;
  if (dolphin)
    dolphin.rotation.x += 0.02
  //dolphin.rotation.z+=0.02


  moveCamera();


  control.update();
  renderer.render(scene, camera);
}
animate();
