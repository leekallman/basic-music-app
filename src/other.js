var mouse_interact = { x: 0, y: 0 };
var mouse_lerp = { x: 0, y: 0 };
var factor = 10;
var touch = false;
var renderer, scene, camera;
var stats;
var textureLoader;
var controls;
var interact_loaded = false;

var hemiLight;
var directionalLight;

var hdri;
var hdri_reflect;
var skyMaterial;

var fbx;
var objects = [];

var texAnim = [];
var displaceAnim = [];

var t = 0;
var t2 = 0;
// var rot_t = 0;
// var pos_t = 0;
var rot_pos = 0;
var rot_lerp = 0;

var noise;

var raycaster;
var raycast_objects = [];
var INTERSECTED;


var current_time = 5;

$(document).ready(function () {
    threeInit();
});

function threeInit() {

    var d = new Date();
    var h = Math.floor(d.getHours() / 2);
    current_time = h;

    // threeControls();

    if ("ontouchstart" in document.documentElement) {
        touch = true;
    }

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, $(".homepage--interact").outerHeight());
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setClearColor(0xffffff, 0);

    $(".homepage--interact").append(renderer.domElement);
    var gl = renderer.context;
    if (!gl.getExtension('OES_texture_float')) {
        console.log('OES_texture_float not supported');
    }
    if (!gl.getExtension('OES_texture_float_linear')) {
        console.log('OES_texture_float_linear not supported');
    }
    $(".homepage--interact canvas").attr('alt', $(".homepage--interact").attr('data-alt'));

    //CAMERA––––––––––––––––––––––––––––

    var h = $(".homepage--interact").outerHeight();
    factor = h / 140;
    if (window.innerWidth < 1000) {
        factor = h / 200;
    }
    camera = new THREE.OrthographicCamera(window.innerWidth / - factor, window.innerWidth / factor, h / factor, h / - factor, -1000, 1000);
    camera.position.set(0, 0, 400);
    camera.rotation.set(0, 0, 0);
    scene = new THREE.Scene();

    //LIGHTS––––––––––––––––––––––––––––

    //AMBIENT LIGHT
    // var ambient = new THREE.AmbientLight( 0xffffff, 0.5 );
    // scene.add( ambient );

    hemiLight = new THREE.HemisphereLight(time_states[current_time].sky_color, time_states[current_time].ground_color, 0.6);
    hemiLight.position.set(0, 1, 0);
    scene.add(hemiLight);

    var light_settings = time_states[current_time].light_settings;
    directionalLight = new THREE.DirectionalLight(light_settings.color, light_settings.intensity);
    // directionalLight.position.set(light_settings.x, light_settings.y , light_settings.z);
    scene.add(directionalLight);

    //TEXTURES––––––––––––––––––––––––––––

    textureLoader = new THREE.TextureLoader(manager);

    hdri = textureLoader.load(root + '/assets/threejs/textures/gradient_sky_' + current_time + '.jpg');
    hdri.mapping = THREE.EquirectangularReflectionMapping;

    hdri_reflect = textureLoader.load(root + '/assets/threejs/textures/gradient_' + current_time + '.jpg');
    hdri_reflect.mapping = THREE.EquirectangularReflectionMapping;



    //  SHAPE 1 TEXTURES
    var shape_1_hammered = textureLoader.load(root + '/assets/threejs/textures/hammered.jpg');
    shape_1_hammered.wrapS = THREE.RepeatWrapping;
    shape_1_hammered.wrapT = THREE.RepeatWrapping;
    shape_1_hammered.repeat.set(0.5, 0.5);

    var shape_1_hammered_2 = textureLoader.load(root + '/assets/threejs/textures/hammered_emissive.jpg');
    shape_1_hammered_2.wrapS = THREE.RepeatWrapping;
    shape_1_hammered_2.wrapT = THREE.RepeatWrapping;
    shape_1_hammered_2.repeat.set(0.5, 0.5);



    //  SHAPE 2 TEXTURES
    var shape_2_color = textureLoader.load(root + '/assets/threejs/textures/noise_rough_color_8b.jpg');
    shape_2_color.wrapS = THREE.RepeatWrapping;
    shape_2_color.wrapT = THREE.RepeatWrapping;
    shape_2_color.repeat.set(1, 1);

    var shape_2_emissive = textureLoader.load(root + '/assets/threejs/textures/noise_emissive_1.jpg');
    shape_2_emissive.wrapS = THREE.RepeatWrapping;
    shape_2_emissive.wrapT = THREE.RepeatWrapping;
    shape_2_emissive.repeat.set(2, 2);

    var shape_2_hammered = textureLoader.load(root + '/assets/threejs/textures/hammered.jpg');
    shape_2_hammered.wrapS = THREE.RepeatWrapping;
    shape_2_hammered.wrapT = THREE.RepeatWrapping;
    shape_2_hammered.repeat.set(2, 2);



    //  SHAPE 3 TEXTURES
    var shape_3_felt = textureLoader.load(root + '/assets/threejs/textures/felt.jpg');
    shape_3_felt.wrapS = THREE.RepeatWrapping;
    shape_3_felt.wrapT = THREE.RepeatWrapping;
    shape_3_felt.repeat.set(2, 2);

    var shape_3_color = textureLoader.load(root + '/assets/threejs/textures/noise_rough_color_3.jpg');
    shape_3_color.wrapS = THREE.RepeatWrapping;
    shape_3_color.wrapT = THREE.RepeatWrapping;
    shape_3_color.repeat.set(0.5, 0.5);



    //  SHAPE 4 TEXTURES
    var shape_4_color = textureLoader.load(root + '/assets/threejs/textures/gradient_color_1.jpg');
    shape_4_color.wrapS = THREE.RepeatWrapping;
    shape_4_color.wrapT = THREE.RepeatWrapping;
    shape_4_color.rotation = Math.PI;
    shape_4_color.repeat.set(1, 1);

    var shape_4_bump = textureLoader.load(root + '/assets/threejs/textures/noise_bump_1.jpg');
    shape_4_bump.wrapS = THREE.RepeatWrapping;
    shape_4_bump.wrapT = THREE.RepeatWrapping;
    shape_4_bump.repeat.set(1, 0.05);



    //  SHAPE 5 TEXTURES
    var shape_5_gold = textureLoader.load(root + '/assets/threejs/textures/gold.jpg');
    shape_5_gold.wrapS = THREE.RepeatWrapping;
    shape_5_gold.wrapT = THREE.RepeatWrapping;
    shape_5_gold.repeat.set(1, 1);



    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        // console.log( item, loaded, total );
    };

    noise.seed(Math.random());
    raycaster = new THREE.Raycaster();
    setInterval(raycast, 50);

    // ADD SKY
    var skyGeo = new THREE.SphereGeometry(500, 50, 50);
    skyMaterial = new THREE.MeshBasicMaterial({
        map: hdri
    });
    var sky = new THREE.Mesh(skyGeo, skyMaterial);
    sky.material.side = THREE.BackSide;
    scene.add(sky);


    var loader = new THREE.FBXLoader();
    loader.load(root + '/assets/threejs/smc_shapes_03.fbx', function (object) {

        fbx = object;
        object.traverse(function (child) {

            if (child.isMesh) {

                if (child.name == 'shape_01') {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xDDCEEB,
                        bumpMap: shape_1_hammered,
                        bumpScale: 6,
                        envMap: hdri_reflect,
                        roughness: 0.9,
                        metalness: 0.1,
                        emissive: 0xB5A8FE,
                        emissiveMap: shape_1_hammered_2,
                        emissiveIntensity: 0.3,
                        // visible: false,
                        userData: {
                            emissivePow: 0.3
                        }
                    });

                }

                if (child.name == 'shape_02') {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xffe200,
                        map: shape_2_color,
                        bumpMap: shape_2_hammered,
                        bumpScale: 1,
                        envMap: hdri_reflect,
                        roughness: 0.9,
                        metalness: 0.1,
                        emissive: 0x7d63ff,
                        emissiveMap: shape_2_emissive,
                        emissiveIntensity: 2,
                        // visible: false,
                        userData: {
                            emissivePow: 2
                        }
                    });
                }

                if (child.name == 'shape_03') {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xffffff,
                        bumpScale: 0.3,
                        roughnessMap: shape_3_felt,
                        bumpMap: shape_3_felt,
                        roughness: 0.6,
                        metalness: 1,
                        envMap: hdri_reflect,
                        envMapIntensity: 1,
                        emissive: 0xFFFFFF,
                        emissiveMap: shape_3_color,
                        emissiveIntensity: 1,
                        // visible: false,
                        userData: {
                            emissivePow: 1
                        }
                    });
                }

                if (child.name == 'shape_04') {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xe299ff,
                        bumpMap: shape_4_bump,
                        bumpScale: 12,
                        envMap: hdri_reflect,
                        roughness: 0.7,
                        metalness: 0.1,
                        emissive: 0xFF0000,
                        emissiveMap: shape_4_color,
                        emissiveIntensity: 0,
                        // visible: false,
                        userData: {
                            emissivePow: 0
                        }
                    });
                }

                if (child.name == 'shape_05') {
                    child.material = new THREE.MeshStandardMaterial({
                        // color: 0xff1a00, 
                        color: 0xFFFFFF,
                        map: shape_5_gold,
                        bumpMap: shape_5_gold,
                        bumpScale: 0.4,
                        envMap: hdri_reflect,
                        roughness: 0.3,
                        metalness: 1,
                        emissiveIntensity: 0.3,
                        // visible: false,
                        userData: {
                            emissivePow: 0.3
                        }
                    });
                }

                var controls = $(".controls--shape[data-shape=" + child.name.replace('shape_0', '') + "]");

                objects.push({
                    obj: child,
                    original_pos: child.position.clone(),
                    rot_range: 4,
                    rot_speed: 1,
                    pos_range: 30,
                    pos_speed: 1,
                    pos_t: 0,
                    rot_t: 0,
                    boost: 1
                });
                raycast_objects.push(child);

            }
        });

        // object.scale.set(1, 1, 1);
        // object.position.set(0,0,0);
        // object.rotation.set(0,0,0);

        scene.add(object);

        // animate();

        setTimeout(function () {

            fbx.traverse(function (child) {
                if (child.isMesh) {
                    // child.material.visible = true;
                    child.position.x += child.position.x * 15;
                    child.position.y += child.position.y * 15;
                    child.position.y += child.position.z * 15;
                }

            });

            var d = new Date();
            var h = Math.floor(d.getHours() / 2);
            var zone = moment.tz.guess();
            var abbr = moment.tz(zone).format("z");
            setTime(h, (d.getHours() + d.getMinutes() / 60) / 2);
            $(".controls--time input").val(h);

            database.ref("shapes").on('child_changed', function (data) {
                var index = parseInt(data.key.replace('shape_0', '')) - 1;
                objects[index].boost = 10;
            });

        }, 10);

        setTimeout(function () {

            $(".homepage--interact").addClass('loaded');
            $(".page--transit").removeClass('enabled');
            $(".menu").removeClass('load');
            interact_loaded = true;

        }, 500);

    });


    $(window).mousemove(function (e) {
        mouse_interact.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse_interact.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    if (!mobile) {
        controls.target = new THREE.Vector3(50, 0, 0);
    } else {
        controls.target = new THREE.Vector3(0, 0, 0);
    }
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.update();

    window.addEventListener('resize', onResize, false);
    stats = new Stats();
    //document.body.appendChild( stats.dom );

    animate();

    var d = new Date();
    var h = Math.floor(d.getHours() / 2);
    var zone = moment.tz.guess();
    var abbr = moment.tz(zone).format("z");
    setTime(h, (d.getHours() + d.getMinutes() / 60) / 2);
    $(".controls--time input").val(h);

}




function threeControls() {

    // $(".controls--time input").val(current_time);

    // $(".controls--time input").on('input', function(){

    // 	var time = $(this).val();
    // 	setTime(parseInt(Math.floor(time)), time);

    // });

    // $(".controls--colors li").mousedown(function(){
    // 	$(".controls--colors li").removeClass('selected');
    // 	$(this).addClass('selected');
    // 	var style = $(this).attr('data-style');
    // 	setStyle(style);
    // });


    // $(".controls--rot--range input").on("input", function(){
    // 	var index = $(this).parents(".controls--shape").attr("data-shape") - 1;
    // 	objects[index].rot_range = $(this).val();
    // });
    // $(".controls--rot--speed input").on("input", function(){
    // 	var index = $(this).parents(".controls--shape").attr("data-shape") - 1;
    // 	objects[index].rot_speed = $(this).val();
    // });
    // $(".controls--pos--range input").on("input", function(){
    // 	var index = $(this).parents(".controls--shape").attr("data-shape") - 1;
    // 	objects[index].pos_range = $(this).val();
    // });
    // $(".controls--pos--speed input").on("input", function(){
    // 	var index = $(this).parents(".controls--shape").attr("data-shape") - 1;
    // 	objects[index].pos_speed = $(this).val();
    // });
    // $(".controls--disp--range input").on("input", function(){
    // 	var index = $(this).parents(".controls--shape").attr("data-shape") - 1;
    // 	objects[index].disp_range = $(this).val();
    // });
    // $(".controls--disp--speed input").on("input", function(){
    // 	var index = $(this).parents(".controls--shape").attr("data-shape") - 1;
    // 	objects[index].disp_speed = $(this).val();
    // });
}


function setTime(hour, raw) {

    $(".controls--time span").text('Time Controls ' + ((hour) * 2) + ':00');
    current_time = hour;

    textureLoader.load(root + '/assets/threejs/textures/gradient_sky_' + current_time + '.jpg', function (tex) {
        tex.mapping = THREE.EquirectangularReflectionMapping;
        skyMaterial.map = tex;
        skyMaterial.needsUpdate = true;
    });

    textureLoader.load(root + '/assets/threejs/textures/gradient_' + current_time + '.jpg', function (tex) {
        tex.mapping = THREE.EquirectangularReflectionMapping;

        if (objects[0]) {
            fbx.traverse(function (child) {
                if (child.isMesh) {
                    child.material.envMap = tex;
                    child.material.needsUpdate = true;
                }

            });
        }
    });

    var pos = raw / 11 - 0.4;

    var light_settings = time_states[current_time].light_settings;
    directionalLight.position.set(Math.cos(pos * Math.PI * 2) * 10, Math.sin(pos * Math.PI * 2) * 20, (1 + Math.cos(pos * Math.PI * 2)) * 5);
    directionalLight.color.setHex(light_settings.color);
    directionalLight.intensity = light_settings.intensity;

    hemiLight.color.setHex(time_states[current_time].sky_color);
    hemiLight.groundColor.setHex(time_states[current_time].ground_color);
    var pow = 0;
    if (raw >= 9) {
        pow = (raw - 9) / 2;
    }
    if (raw <= 4) {
        pow = 1 - raw / 4;
    }
    if (fbx) {
        fbx.traverse(function (child) {
            if (child.isMesh) {
                child.material.emissiveIntensity = pow * child.material.userData.emissivePow;

                if (child.name == 'shape_02') {
                    var pow_2 = 0;
                    if (raw >= 5) {
                        pow_2 = (raw - 5) / 2;
                    }
                    if (raw <= 2) {
                        pow_2 = 1 - raw / 4;
                    }
                    if (pow_2 > 1) {
                        pow_2 = 1;
                    }
                    child.material.color.setRGB(1, 1 - (0.61 * pow_2), 1 - (1 * pow_2));
                }
            }
        });
    }
}


function setStyle(style) {

    fbx.traverse(function (child) {

        if (child.isMesh) {

            if (child.name == 'shape_01') {

                if (style == 'vibrant' || style == 'vibrant_alt') {
                    child.material.color.setHex(0xDDCEEB);
                } else if (style == 'natural') {
                    child.material.color.setHex(0xebcece);
                }
            }

            if (child.name == 'shape_02') {
                if (style == 'vibrant' || style == 'vibrant_alt') {
                    child.material.roughness = 0.3;
                } else if (style == 'natural') {
                    child.material.roughness = 0.5;
                }
            }

            if (child.name == 'shape_03') {

            }

            if (child.name == 'shape_04') {

                if (style == 'vibrant' || style == 'vibrant_alt') {
                    child.material.color.setHex(0xe299ff);
                } else if (style == 'natural') {
                    child.material.color.setHex(0xf99076);
                }

            }

            if (child.name == 'shape_05') {

                if (style == 'vibrant') {
                    child.material.map = child.material.userData.map_vibrant;
                    child.material.needsUpdate = true;
                } else if (style == 'natural') {
                    child.material.map = child.material.userData.map_natural;
                    child.material.needsUpdate = true;
                } else if (style == 'vibrant_alt') {
                    child.material.map = child.material.userData.map_vibrant_alt;
                    child.material.needsUpdate = true;
                }
            }

        }
    });
}



function raycast() {
    raycaster.setFromCamera(mouse_interact, camera);
    if (!touch) {
        var intersects = raycaster.intersectObjects(raycast_objects);
        if (intersects.length > 0) {
            hover = true;
            if (intersects[0].object != INTERSECTED) {
                if (INTERSECTED) {
                    INTERSECTED.userData.hovered = false;
                    hovered = false;
                    name = INTERSECTED.name;
                    var index = parseInt(name.replace('shape_0', '')) - 1;
                    objects[index].hovered = false;
                }
                INTERSECTED = intersects[0].object;
                INTERSECTED.userData.hovered = true;
                hovered = true;
                name = INTERSECTED.name;
                var index = parseInt(name.replace('shape_0', '')) - 1;
                // objects[index].boost = 10;
                database.ref('shapes/' + INTERSECTED.name).set(Math.random());
                objects[index].hovered = true;

            }
        } else {
            hover = false;
            if (INTERSECTED) {
                INTERSECTED.userData.hovered = false;
                hovered = false;
                name = "";
                name = INTERSECTED.name;
                var index = parseInt(name.replace('shape_0', '')) - 1;
                objects[index].hovered = false;
            }
            INTERSECTED = null;
        }
    }
}


function onResize() {
    var w = $(window).outerWidth();
    var h = $(".homepage--interact").outerHeight();

    factor = h / 140;
    if (window.innerWidth < 1000) {
        factor = h / 200;
    }
    camera.left = -w / factor;
    camera.right = w / factor;
    camera.top = h / factor;
    camera.bottom = -h / factor;

    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);

    camera.aspect = (w / h);
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);

    var m = 500;

    if (!reduced_motion) {

        for (var i = 0; i < objects.length; i++) {

            var noiseValX = noise.simplex2(objects[i].pos_t / m, i * 100) * objects[i].pos_range;
            var noiseValY = noise.simplex2(objects[i].pos_t / m, i * 200) * objects[i].pos_range;
            var noiseValZ = noise.simplex2(objects[i].pos_t / m, i * 300) * objects[i].pos_range;

            objects[i].obj.position.x += (objects[i].original_pos.x + noiseValX - objects[i].obj.position.x) / 50;
            objects[i].obj.position.y += (objects[i].original_pos.y + noiseValX - objects[i].obj.position.y) / 50;
            objects[i].obj.position.z += (objects[i].original_pos.z + noiseValX - objects[i].obj.position.z) / 50;

            // objects[i].obj.position.set(objects[i].original_pos.x + noiseValX, objects[i].original_pos.y + noiseValY, objects[i].original_pos.z + noiseValZ);

            objects[i].obj.rotation.set((Math.cos(objects[i].rot_t + 1.6 * i) * 0.2 * objects[i].rot_range), (Math.sin(objects[i].rot_t + 0.6 * i) * 0.2 * objects[i].rot_range), (Math.sin(objects[i].rot_t + 0.2 * i) * 0.2 * objects[i].rot_range));

            // if(objects[i].disp_enabled){

            // 	var min = -objects[i].disp_range / 2;
            // 	if(min < objects[i].disp_min){
            // 		min = objects[i].disp_min;
            // 	}
            // 	// objects[i].obj.material.displacementScale = min + (Math.sin(objects[i].disp_t * 10) + 1) / 2 * (min + objects[i].disp_range * objects[i].disp_max);
            // 	var val = 0;
            // 	if(objects[i].hovered){
            // 		val = objects[i].disp_max;
            // 	}
            // 	// objects[i].obj.material.displacementScale += (val - objects[i].obj.material.displacementScale) / 30;
            // }

            objects[i].pos_t += 0.1 * objects[i].pos_speed * objects[i].boost;
            objects[i].rot_t += 0.0007 * objects[i].rot_speed * objects[i].boost;
            // objects[i].disp_t += 0.005 * objects[i].disp_speed * objects[i].boost;

            if (objects[i].boost > 1) {
                objects[i].boost -= 0.1;
            }
            if (objects[i].boost < 1) {
                objects[i].boost = 1;
            }
        }

        var cam_offset = 150;
        mouse_lerp.x += (mouse.x - mouse_lerp.x) / 50;
        if (interact_loaded) {
            mouse_lerp.y += (-mouse.y - mouse_lerp.y) / 50;
        } else {
            mouse_lerp.y = 0;
        }
        camera.position.set(mouse_lerp.x * cam_offset, mouse_lerp.y * cam_offset + 50, 400);
        if (!mobile) {
            controls.target = new THREE.Vector3(50, 0, 0);
        } else {
            controls.target = new THREE.Vector3(0, 0, 0);
        }
        controls.update();

        var rot_z = 0;
        if (window.innerWidth < 1200) {
            rot_z = Math.PI / 2;
        }

        rot_lerp += (rot_pos - rot_lerp) / 30;
        if (scene.getObjectByName("Subdivision_Surface")) {
            scene.getObjectByName("Subdivision_Surface").rotation.set(0, rot_lerp, rot_z);
        }
    } else {
        for (var i = 0; i < objects.length; i++) {
            objects[i].obj.position.x = objects[i].original_pos.x;
            objects[i].obj.position.y = objects[i].original_pos.y;
            objects[i].obj.position.z = objects[i].original_pos.z;
        }
    }

    t += 0.001;
    t2 += 0.0007;

    render();
    stats.update();
}

function render() {
    renderer.render(scene, camera);
}