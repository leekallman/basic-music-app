import React, { useRef, useEffect } from 'react'
import './index.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { MaterialLoader } from 'three';


const Torus = () => {
    const canvasElement = useRef(null)

    useEffect(() => {
        // Loading
        const textureLoader = new THREE.TextureLoader();
        const normalTexture = textureLoader.load('/textures/gold.jpeg')

        const gui = new dat.GUI()
        // Canvas
        const canvas = canvasElement.current

        const scene = new THREE.Scene()

        // Objects
        const geometry = new THREE.TorusKnotGeometry(0.9, 0.4, 200, 10, 2, 3);

        // Materials
        const material = new THREE.MeshStandardMaterial()
        material.metalness = 0.9
        material.roughness = 0
        // material.normalMap = normalTexture;

        material.color = new THREE.Color(0xffffff)

        // Mesh
        const torus = new THREE.Mesh(geometry, material)
        scene.add(torus)

        // Lights
        //Light 1
        const pointLight = new THREE.PointLight(0xffffff, 6)
        pointLight.position.x = 2
        pointLight.position.y = 3
        pointLight.position.z = 4
        scene.add(pointLight)

        //Light 2
        const pointLight2 = new THREE.PointLight(0xFF8F73, 1)
        pointLight2.position.set(-2.10, 1.15, 2.05)
        pointLight2.intensity = 9
        scene.add(pointLight2)

        const light2 = gui.addFolder('Light 2')

        light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
        light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
        light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
        light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

        const light2color = {
            color: 0xFF5A00
        }

        light2.addColor(light2color, 'color')
            .onChange(() => {
                pointLight2.color.set(light2color.color)
            })

        // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1)
        // scene.add(pointLightHelper2)

        //Light 3
        const pointLight3 = new THREE.PointLight(0x4DAECD, 1)
        pointLight3.position.set(2.10, 1, 3.1)
        pointLight3.intensity = 4
        scene.add(pointLight3)

        const light3 = gui.addFolder('Light 3')

        light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
        light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
        light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
        light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

        const light3color = {
            color: 0xD7BAFB
        }

        light3.addColor(light3color, 'color')
            .onChange(() => {
                pointLight3.color.set(light3color.color)
            })

        // const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1)
        // scene.add(pointLightHelper3)

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 2
        scene.add(camera)

        // Controls
        // const controls = new OrbitControls(camera, canvas)
        // controls.enableDamping = true

        //Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


        //Animate

        const clock = new THREE.Clock()

        const tick = () => {
            const elapsedTime = clock.getElapsedTime()

            // Update objects
            torus.rotation.y = .1 * elapsedTime
            torus.rotation.x = .2 * elapsedTime

            // Update Orbital Controls
            // controls.update()

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }
        tick()
    }, [])

    return (
        <canvas ref={canvasElement} className="node" style={{ zIndex: "1" }} id="0_0" xmlns="http://www.w3.org/1999/xhtml"></canvas>
    )
}

export default Torus



        // <g className="node" transform="translate(210,330)" style={{ zIndex: "1" }}>
        // <foreignObject x="-8" y="-8" className="node" style={{ zIndex: "1" }}>
        // </foreignObject>
        // </g>