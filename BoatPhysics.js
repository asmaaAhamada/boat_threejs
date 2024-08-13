
// import * as THREE from "three";

//import { Vector2, Vector3 } from "three";


// export


class BoatPhysics {
    constructor(mass, length, width, temperature, Tkelvin) {
        this.mass = 4860;
        this.length = length;
        this.width = width;
        this.dt = 0.01;
        this.cd = 0.08;



        this.v = new THREE.Vector3();
        this.pos = new THREE.Vector3();
        this.a = new THREE.Vector3();

        this.g = new THREE.Vector3(0, -9.8, 0);
        this.U = new THREE.Vector3();//تيتا
        this.w = new THREE.Vector3();//;السرعة 
        this.y = new THREE.Vector3();//التسارع 
       // this.ac = ac;
        this.r = 0.05;
        //this.v=v;
        this.t = 0.04;
       this .torque=new THREE.Vector3();
       this.omega=new THREE.Vector3();
       this.theta=new THREE.Vector3();

       this.alpha=new THREE.Vector3();

    }

    calculatef_totale() {
        let f = new THREE.Vector3();
        f = f.add(this.calculateWeight()).add(this.calculateBuoyantForce());//f=f1+f2+f3+.....
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
    }


    calculateWeight() {
        return this.g.clone().multiplyScalar(this.mass);//w=m*g
    }


    water_rho() {
        let p_water;
        let R = 8.3145;
        let Md = 1.34;
        let P0 = 101325; // 1bar =100000pa
        let Tkelvin = this.temperature + 273.15;
        this.p_water = (this.Md * this.M) / (this.R * this.Tkelvin);

        return p_water;
    }


    vol() {
        return 9920;
    }

    calculateBuoyantForce() {
        return this.g.clone().multiplyScalar(this.vol()).multiplyScalar(this.water_rho()).multiplyScalar(-1);
 
    }


calculate_inter(){


    this.torque = this.calculatef_totale().multiplyScalar(this.r)
    this.inertia = this.mass * Math.pow(this.r, 2); // I = m * r^2
    this.alpha = this.torque.divideScalar(this.inertia)
    // ω_f = ω_i + α * dt (السرعة الزاوية النهائية = السرعة الزاوية الابتدائية + التسارع الزاوي * الزمن)
    let angularAcceleration = this.alpha.clone().multiplyScalar(this.dt); // α * dt
    this.omega = this.omega.clone().add(angularAcceleration); // ω_f = ω_i + α * dt

    // θ = ω_i * dt + 0.5 * α * dt^2 (الزاوية المتحركة = السرعة الزاوية الابتدائية * الزمن + 0.5 * التسارع الزاوي * الزمن^2)
    let initialAngularVelocity = this.omega.clone().multiplyScalar(this.dt); // ω_i * dt
    let angularDisplacement = this.alpha.clone().multiplyScalar(0.5 * Math.pow(this.dt, 2)); // 0.5 * α * dt^2
    this.theta = this.theta.clone().add(initialAngularVelocity).add(angularDisplacement); // θ = ω_i * dt + 0.5 * α * dt^2
}



}






// calculateVelocity() {
//     let F = this.calculateForce();
//     let e = 2 * F;
//     let q = this.cd * this.p_water * this.s;
//     let t = e / q;
//     return Math.sqrt(t);
// }


// calculateWindResistance() {
//     let wind = this.cd * this.p_water * this.v * this.v * this.s;
//     return wind;
// }


