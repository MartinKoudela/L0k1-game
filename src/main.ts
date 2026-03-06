import './style.css'
import * as THREE from 'three'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js'
import { Strangler } from './enemies/strangler'
import { Shade } from './enemies/shade'

document.addEventListener('click', () => {
    document.body.requestFullscreen().catch(
        (err) => console.error('Error requesting fullscreen:', err)
    )
}, {once: true})

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0a0a0a)

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth, window.innerHeight)

const textureLoader = new THREE.TextureLoader()
const BASE = import.meta.env.BASE_URL

const floorColor = textureLoader.load(BASE + 'assets/textures/floor/Planks037A_2K-JPG_Color.jpg')
floorColor.wrapS = THREE.RepeatWrapping
floorColor.wrapT = THREE.RepeatWrapping
floorColor.repeat.set(3, 3)

const floorNormal = textureLoader.load(BASE + 'assets/textures/floor/Planks037A_2K-JPG_NormalGL.jpg')
floorNormal.wrapS = THREE.RepeatWrapping
floorNormal.wrapT = THREE.RepeatWrapping
floorNormal.repeat.set(3, 3)

const floorRoughness = textureLoader.load(BASE + 'assets/textures/floor/Planks037A_2K-JPG_Roughness.jpg')
floorRoughness.wrapS = THREE.RepeatWrapping
floorRoughness.wrapT = THREE.RepeatWrapping
floorRoughness.repeat.set(3, 3)

const floorGeometry = new THREE.PlaneGeometry(6, 6)
const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorColor,
    color: 0xaaaaaa,
    normalMap: floorNormal,
    roughnessMap: floorRoughness,
})
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2
floor.position.y = 0
scene.add(floor)

const wallColor = textureLoader.load(BASE + 'assets/textures/wall/Plaster006_2K-JPG_Color.jpg')
wallColor.wrapS = THREE.RepeatWrapping
wallColor.wrapT = THREE.RepeatWrapping
wallColor.repeat.set(3, 3)

const wallNormal = textureLoader.load(BASE + 'assets/textures/wall/Plaster006_2K-JPG_NormalDX.jpg')
wallNormal.wrapS = THREE.RepeatWrapping
wallNormal.wrapT = THREE.RepeatWrapping
wallNormal.repeat.set(3, 3)

const wallRoughness = textureLoader.load(BASE + 'assets/textures/wall/Plaster006_2K-JPG_Roughness.jpg')
wallRoughness.wrapS = THREE.RepeatWrapping
wallRoughness.wrapT = THREE.RepeatWrapping
wallRoughness.repeat.set(3, 3)

const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallColor,
    color: 0xbbbbbb,
    normalMap: wallNormal,
    roughnessMap: wallRoughness,
})


const wall2Color = textureLoader.load(BASE + 'assets/textures/wall2/PaintedPlaster015_2K-JPG_Color.jpg')
wall2Color.wrapS = THREE.RepeatWrapping
wall2Color.wrapT = THREE.RepeatWrapping
wall2Color.repeat.set(1, 1)

const wall2Normal = textureLoader.load(BASE + 'assets/textures/wall2/PaintedPlaster015_2K-JPG_NormalDX.jpg')
wall2Normal.wrapS = THREE.RepeatWrapping
wall2Normal.wrapT = THREE.RepeatWrapping
wall2Normal.repeat.set(1, 1)

const wall2Roughness = textureLoader.load(BASE + 'assets/textures/wall2/PaintedPlaster015_2K-JPG_Roughness.jpg')
wall2Roughness.wrapS = THREE.RepeatWrapping
wall2Roughness.wrapT = THREE.RepeatWrapping
wall2Roughness.repeat.set(1, 1)


const wall2Material = new THREE.MeshStandardMaterial({
    map: wall2Color,
    color: 0xbbbbbb,
    normalMap: wall2Normal,
    roughnessMap: wall2Roughness,
})

const wall2SideColor = wall2Color.clone()
wall2SideColor.repeat.set(0.1, 0.3)
const wall2SideNormal = wall2Normal.clone()
wall2SideNormal.repeat.set(0.1, 0.3)
const wall2SideRoughness = wall2Roughness.clone()
wall2SideRoughness.repeat.set(0.1, 0.3)

const wall2SideMaterial = new THREE.MeshStandardMaterial({
    map: wall2SideColor,
    color: 0xbbbbbb,
    normalMap: wall2SideNormal,
    roughnessMap: wall2SideRoughness,
})

const rightWallShape = new THREE.Shape()
rightWallShape.moveTo(-3, -1.5)
rightWallShape.lineTo(3, -1.5)
rightWallShape.lineTo(3, 1.5)
rightWallShape.lineTo(-3, 1.5)
rightWallShape.lineTo(-3, -1.5)

const doorHole = new THREE.Path()
doorHole.moveTo(-1.16, 1)
doorHole.lineTo(1.1, 1)
doorHole.lineTo(1.1, -1.49)
doorHole.lineTo(2.2, -1.49)
doorHole.lineTo(2.2, 1)

rightWallShape.holes.push(doorHole)

const rightWall = new THREE.Mesh(new THREE.ShapeGeometry(rightWallShape), wall2SideMaterial)
rightWall.position.set(3, 1.5, 0)
rightWall.rotation.y = -Math.PI / 2
scene.add(rightWall)

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), wall2Material)
backWall.position.set(0, 1.5, -3)
scene.add(backWall)

const leftWallShape = new THREE.Shape()
leftWallShape.moveTo(-3, -1.5)
leftWallShape.lineTo(3, -1.5)
leftWallShape.lineTo(3, 1.5)
leftWallShape.lineTo(-3, 1.5)
leftWallShape.lineTo(-3, -1.5)

const windowHole = new THREE.Path()
windowHole.moveTo(-1.16, 0.83)
windowHole.lineTo(-0.6, 0.83)
windowHole.lineTo(-0.6, -0.5)
windowHole.lineTo(-1.9, -0.5)
windowHole.lineTo(-1.9, 0.83)

const windowHole2 = new THREE.Path()
windowHole2.moveTo(0.6, -0.5)
windowHole2.lineTo(1.2, -0.5)
windowHole2.lineTo(1.2, 0.8)
windowHole2.lineTo(-0.1, 0.8)
windowHole2.lineTo(-0.1, -0.5)

leftWallShape.holes.push(windowHole, windowHole2)

const leftWall = new THREE.Mesh(new THREE.ShapeGeometry(leftWallShape), wall2SideMaterial)
leftWall.position.set(-3, 1.5, 0)
leftWall.rotation.y = Math.PI / 2
scene.add(leftWall)

const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), wall2Material)
frontWall.position.set(0, 1.5, 3)
frontWall.rotation.y = Math.PI
scene.add(frontWall)

const ceilingColor = textureLoader.load(BASE + 'assets/textures/ceiling/Concrete042B_2K-JPG_Color.jpg')
ceilingColor.wrapS = THREE.RepeatWrapping
ceilingColor.wrapT = THREE.RepeatWrapping
ceilingColor.repeat.set(3, 3)

const ceilingNormal = textureLoader.load(BASE + 'assets/textures/ceiling/Concrete042B_2K-JPG_NormalDX.jpg')
ceilingNormal.wrapS = THREE.RepeatWrapping
ceilingNormal.wrapT = THREE.RepeatWrapping
ceilingNormal.repeat.set(3, 3)

const ceilingRoughness = textureLoader.load(BASE + 'assets/textures/ceiling/Concrete042B_2K-JPG_Roughness.jpg')
ceilingRoughness.wrapS = THREE.RepeatWrapping
ceilingRoughness.wrapT = THREE.RepeatWrapping
ceilingRoughness.repeat.set(3, 3)

const ceilingMaterial = new THREE.MeshStandardMaterial({
    map: ceilingColor,
    normalMap: ceilingNormal,
    roughnessMap: ceilingRoughness,
})
const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), wallMaterial)
ceiling.rotation.x = Math.PI / 2
ceiling.position.y = 3
scene.add(ceiling)

const deskLight = new THREE.SpotLight(0xffffff, 12, 9, Math.PI / 3)
deskLight.penumbra = 0.8
deskLight.position.set(0, 3.5, -2)
deskLight.target.position.set(0, 0.8, -2.5)
scene.add(deskLight)
scene.add(deskLight.target)


const nextRoomFloor = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), floorMaterial)
nextRoomFloor.rotation.x = -Math.PI / 2
nextRoomFloor.position.set(5, 0, 1.65)
scene.add(nextRoomFloor)

const nextRoomBack = new THREE.Mesh(new THREE.PlaneGeometry(4, 3), wallMaterial)
nextRoomBack.position.set(5, 1.5, -0.35)
scene.add(nextRoomBack)

const nextRoomRight = new THREE.Mesh(new THREE.PlaneGeometry(4, 3), wallMaterial)
nextRoomRight.position.set(7, 1.5, 1.65)
nextRoomRight.rotation.y = -Math.PI / 2
scene.add(nextRoomRight)

const nextRoomFront = new THREE.Mesh(new THREE.PlaneGeometry(4, 3), wallMaterial)
nextRoomFront.position.set(5, 1.5, 3.65)
nextRoomFront.rotation.y = Math.PI
scene.add(nextRoomFront)

const nextRoomCeiling = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), ceilingMaterial)
nextRoomCeiling.rotation.x = Math.PI / 2
nextRoomCeiling.position.set(5, 3, 1.65)
scene.add(nextRoomCeiling)

const nextRoomLight = new THREE.PointLight(0xffffff, 2, 8)
nextRoomLight.position.set(5, 2.5, 1.65)
scene.add(nextRoomLight)


const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')

const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)

let ceilingModel: THREE.Group | null = null
loader.load(BASE + 'models/Ceiling.glb', (gltf) => {

    const ceiling = gltf.scene
    ceiling.position.set(0, 2.45, -2.7)
    ceiling.rotation.x = Math.PI / -2
    ceiling.scale.set(0.6, 0.6, 0.6)
    scene.add(ceiling)
    ceilingModel = ceiling
})

loader.load(BASE + 'models/Fan.glb', (gltf) => {
    const fan = gltf.scene
    fan.position.set(0, 0.08, 0.6)
    fan.rotation.y = Math.PI
    fan.scale.set(0.9, 0.9, 0.9)
    scene.add(fan)

    const mixer = new THREE.AnimationMixer(fan)
    const clip = gltf.animations[0] // první animace
    mixer.clipAction(clip).play()

    const clock = new THREE.Clock()

    function updateAnimation() {
        requestAnimationFrame(updateAnimation)
        mixer.update(clock.getDelta())
    }

    updateAnimation()
})

loader.load(BASE + 'models/Adjustable Desk.glb', (gltf) => {
    const desk = gltf.scene
    desk.position.set(0, 0, -2.5)
    desk.rotation.y = Math.PI / -2
    scene.add(desk)
})

loader.load(BASE + 'models/Chair.glb', (gltf) => {
    const chair = gltf.scene
    chair.position.set(0, 0, -1.5)
    chair.rotation.y = Math.PI
    chair.scale.set(1.3, 1.3, 1.3)
    scene.add(chair)
})

loader.load(BASE + 'models/Sofa.glb', (gltf) => {
    const sofa = gltf.scene
    sofa.position.set(-2.55, 0, 0.4)
    sofa.rotation.y = Math.PI / 2
    scene.add(sofa)
})

loader.load(BASE + 'models/Window.glb', (gltf) => {
    const window = gltf.scene
    window.position.set(-2.95, 2.35, -0.56)
    window.rotation.y = Math.PI / 2
    window.rotation.x = Math.PI / -2
    window.rotation.z = Math.PI / -2
    window.scale.set(0.6, 0.6, 0.6)
    scene.add(window)
})

loader.load(BASE + 'models/Locker.glb', (gltf) => {
    const locker = gltf.scene
    locker.position.set(-2.6, 0, -2)
    locker.rotation.y = Math.PI
    scene.add(locker)
})

loader.load(BASE + 'models/Bag.glb', (gltf) => {
    const bag = gltf.scene
    bag.position.set(-2.8, 2.1, -2.4)
    bag.rotation.y = Math.PI / -2
    bag.scale.set(0.3, 0.3, 0.3)
    scene.add(bag)
})

loader.load(BASE + 'models/Plug.glb', (gltf) => {
    const plug = gltf.scene
    plug.position.set(0, 0, -2.5)
    plug.rotation.y = Math.PI / -1
    plug.scale.set(0.2, 0.2, 0.2)
    scene.add(plug)
})

loader.load(BASE + 'models/Cables.glb', (gltf) => {
    const cables1 = gltf.scene
    cables1.position.set(1, 0.85, -2.7)
    cables1.rotation.y = Math.PI / -0.9
    cables1.scale.set(0.09, 0.045, 0.04)
    scene.add(cables1)

    const cables2 = cables1.clone()
    cables2.position.set(3, 0.4, -1.5)
    cables2.rotation.y = Math.PI / -2
    cables2.scale.set(0.06, 0.045, 0.04)
    scene.add(cables2)

    const cables3 = cables1.clone()
    cables3.position.set(2.95, 0.8, -1.2)
    cables3.rotation.y = Math.PI / -2
    cables3.scale.set(0.06, 0.045, 0.04)
    scene.add(cables3)

    const cables4 = cables1.clone()
    cables4.position.set(3, 1.2, -1.7)
    cables4.rotation.y = Math.PI / -2
    cables4.scale.set(0.06, 0.045, 0.04)
    scene.add(cables4)
})

loader.load(BASE + 'models/Skateboard.glb', (gltf) => {
    const skate = gltf.scene
    skate.position.set(-1.95, 0.7, -2.65)
    skate.rotation.x = Math.PI / 2.5
    skate.scale.set(0.13, 0.13, 0.13)
    scene.add(skate)
})

loader.load(BASE + 'models/Shoes.glb', (gltf) => {
    const shoe1 = gltf.scene
    shoe1.position.set(-2.2, 0.4, -2.5)
    shoe1.rotation.y = Math.PI / -1
    shoe1.scale.set(1.4, 1.3, 1.3)
    scene.add(shoe1)
})

loader.load(BASE + 'models/Shoes.glb', (gltf) => {
    const shoe2 = gltf.scene
    shoe2.position.set(-2.4, 0.4, -2.35)
    shoe2.rotation.y = Math.PI / -1.3
    shoe2.scale.set(1.3, 1.3, 1.3)
    scene.add(shoe2)
})

loader.load(BASE + 'models/Drone.glb', (gltf) => {
    const drone = gltf.scene
    drone.position.set(-2.5, 1.95, -1.5)
    drone.rotation.y = Math.PI / 3
    drone.scale.set(1.3, 1.3, 1.3)
    scene.add(drone)
})

loader.load(BASE + 'models/Kitchen.glb', (gltf) => {
    const kitchen = gltf.scene
    kitchen.position.set(0.4, 0, 2.4)
    kitchen.rotation.y = Math.PI / 2
    kitchen.scale.set(1.15, 1.15, 1.15)
    scene.add(kitchen)
})

loader.load(BASE + 'models/Lamp.glb', (gltf) => {
    const kitchen = gltf.scene
    kitchen.position.set(-2.6, 1, 2.7)
    kitchen.rotation.y = Math.PI / 2
    kitchen.scale.set(1, 1, 1)
    scene.add(kitchen)

    lampLight = new THREE.PointLight(0xffcc88, 0.5, 5)
    lampLight.position.set(-2.6, 1.5, 2.7)
    scene.add(lampLight)
})

loader.load(BASE + 'models/Door.glb', (gltf) => {
    const door = gltf.scene
    door.position.set(3.1, 0, 4)
    door.rotation.y = Math.PI / 2
    door.scale.set(0.03, 0.033, 0.03)
    scene.add(door)
})

loader.load(BASE + 'models/Carpet.glb', (gltf) => {
    const carpet = gltf.scene
    carpet.position.set(-1.9, 0.08, 0.5)
    carpet.rotation.y = Math.PI
    carpet.scale.set(1.8, 1.5, 1.8)
    scene.add(carpet)
})

loader.load(BASE + 'models/Mousepad.glb', (gltf) => {
    const mousepad = gltf.scene
    mousepad.position.set(0, 0.95, -2.35)
    mousepad.rotation.y = Math.PI / 0.5
    mousepad.scale.set(0.3, 0.3, 0.3)
    scene.add(mousepad)
})

loader.load(BASE + 'models/Flipper.glb', (gltf) => {
    const flipper = gltf.scene
    flipper.position.set(-0.9, 0.97, -2.2)
    flipper.rotation.y = Math.PI / -3
    flipper.scale.set(0.0015, 0.0015, 0.0015)
    scene.add(flipper)
})

loader.load(BASE + 'models/Mouse.glb', (gltf) => {
    const mouse = gltf.scene
    mouse.position.set(0.5, 0.95, -2.2)
    mouse.rotation.y = Math.PI / 2
    mouse.scale.set(0.04, 0.04, 0.04)
    scene.add(mouse)
})

loader.load(BASE + 'models/Keyboard.glb', (gltf) => {
    const keyboard = gltf.scene
    keyboard.position.set(0, 1, -2.2)
    keyboard.rotation.y = Math.PI / -0.5
    keyboard.scale.set(0.025, 0.025, 0.025)
    scene.add(keyboard)
})

loader.load(BASE + 'models/Monster.glb', (gltf) => {
    const monster = gltf.scene
    monster.position.set(0.25, 1, -2.8)
    monster.rotation.y = Math.PI / -1.1
    monster.scale.set(0.8, 0.9, 0.8)

    scene.add(monster)
})

loader.load(BASE + 'models/Bins.glb', (gltf) => {
    const bins = gltf.scene
    bins.position.set(0.5, 0.2, -2.4)
    bins.rotation.y = Math.PI
    bins.scale.set(0.2, 0.2, 0.2)
    scene.add(bins)
})

loader.load(BASE + 'models/Pizza.glb', (gltf) => {
    const pizza = gltf.scene
    pizza.position.set(-2.8, 0, 0.2)
    pizza.rotation.y = Math.PI / 1.5
    pizza.scale.set(0.5, 0.5, 0.5)
    scene.add(pizza)
})


loader.load(BASE + 'models/Raspi.glb', (gltf) => {
    const raspi = gltf.scene
    raspi.position.set(0.6, 1, -1.95)
    raspi.rotation.x = Math.PI / 0.5
    raspi.rotation.y = Math.PI / 7
    raspi.scale.set(0.015, 0.015, 0.015)
    scene.add(raspi)
})

loader.load(BASE + 'models/Garbage.glb', (gltf) => {
    const garbage = gltf.scene
    garbage.position.set(2.6, 0, 0.7)
    garbage.rotation.x = Math.PI / 0.5
    garbage.rotation.y = Math.PI / -1
    garbage.scale.set(0.4, 0.4, 0.4)
    scene.add(garbage)
})

loader.load(BASE + 'models/Headphones.glb', (gltf) => {
    const headphones = gltf.scene
    headphones.position.set(0.4, 1, -2.75)
    headphones.rotation.x = Math.PI / 2
    headphones.rotation.z = Math.PI / 3
    headphones.scale.set(0.0002, 0.0002, 0.0002)
    scene.add(headphones)
})

loader.load(BASE + 'models/Case.glb', (gltf) => {
    const PCcase = gltf.scene
    PCcase.position.set(-0.93, 0.3, -2.8)
    PCcase.rotation.x = Math.PI / -2
    PCcase.rotation.z = Math.PI
    PCcase.scale.set(0.011, 0.011, 0.011)
    scene.add(PCcase)
})


const monitorScreenTex = textureLoader.load(BASE + 'assets/textures/screen.png')
monitorScreenTex.rotation = Math.PI / 2
monitorScreenTex.center.set(0.5, 0.5)
monitorScreenTex.repeat.set(2, 2)
monitorScreenTex.offset.set(0.5, 0.1)

const curvedScreenTex = textureLoader.load(BASE + 'assets/textures/screen.png')
curvedScreenTex.rotation = -Math.PI / 2
curvedScreenTex.center.set(0.5, 0.5)
curvedScreenTex.repeat.set(2, 2)
curvedScreenTex.offset.set(0.9, -0.28)

const laptopScreenTex = textureLoader.load(BASE + 'assets/textures/laptop-screen.jpg')
laptopScreenTex.rotation = Math.PI / -0.5
laptopScreenTex.center.set(1, 1)
laptopScreenTex.repeat.set(2, 2)
laptopScreenTex.offset.set(0.1, -0.1)

loader.load(BASE + 'models/Monitor.glb', (gltf) => {
    const monitor = gltf.scene
    monitor.position.set(-0.6, 1, -2.8)
    monitor.rotation.y = Math.PI / -2.3
    monitor.scale.set(0.0012, 0.0012, 0.0012)
    monitor.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === 'group_0002_layar_0') {
            child.material = new THREE.MeshBasicMaterial({map: monitorScreenTex})
        }
    })
    scene.add(monitor)
})

loader.load(BASE + 'models/Curved monitor.glb', (gltf) => {
    const curved = gltf.scene
    curved.position.set(0.4, 0.9, -2.2)
    curved.rotation.y = Math.PI / -4
    curved.scale.set(0.09, 0.09, 0.09)
    curved.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === 'Object_5') {
            child.material = new THREE.MeshBasicMaterial({map: curvedScreenTex, color: 0x666666})
        }
    })
    scene.add(curved)
})

let laptopModel: THREE.Group | null = null
let lampLight: THREE.PointLight | null = null

loader.load(BASE + 'models/laptop.glb', (gltf) => {
    const laptop = gltf.scene
    laptop.position.set(-0.5, 1, -2.35)
    laptop.rotation.y = Math.PI / -0.55
    laptop.scale.set(0.015, 0.015, 0.015)

    laptop.traverse((child) => {
        if (child instanceof THREE.Mesh && child.name === 'Screen_ComputerScreen_0') {
            child.material = new THREE.MeshBasicMaterial({map: laptopScreenTex, color: 0x999999})
        }
    })

    scene.add(laptop)
    laptopModel = laptop
})

loader.load(BASE + 'models/Rf.glb', (gltf) => {
    const rf = gltf.scene
    rf.position.set(0.8, 1, -1.7)
    rf.rotation.x = Math.PI / 0.5
    rf.rotation.y = Math.PI / -9
    rf.scale.set(0.05, 0.05, 0.05)
    scene.add(rf)
})

loader.load(BASE + 'models/Pc cable.glb', (gltf) => {
    const cable = gltf.scene
    cable.position.set(-0.05, 1, -2.7)
    cable.rotation.x = Math.PI
    cable.rotation.y = Math.PI / -0.5
    cable.scale.set(0.015, 0.015, 0.015)
    scene.add(cable)
})

loader.load(BASE + 'models/Speaker.glb', (gltf) => {
    const speaker = gltf.scene
    speaker.position.set(0.07, 0.98, -2.7)
    speaker.rotation.x = Math.PI / -0.5
    speaker.rotation.y = Math.PI / -0.5
    speaker.scale.set(1.4, 1.4, 1.4)
    scene.add(speaker)
})

loader.load(BASE + 'models/Poster.glb', (gltf) => {
    const poster = gltf.scene
    poster.position.set(-1.3, 1.8, -2.9)
    poster.rotation.y = Math.PI / -1
    poster.scale.set(1.4, 1.4, 1.4)
    scene.add(poster)
})

loader.load(BASE + 'models/Graffiti4.glb', (gltf) => {
    const graffiti4a = gltf.scene
    graffiti4a.position.set(0, 0, -2.99)
    graffiti4a.rotation.y = Math.PI / -0.5
    graffiti4a.scale.set(1, 1, 1)
    scene.add(graffiti4a)

    const graffiti4b = graffiti4a.clone()
    graffiti4b.position.set(-2.5, -0.2, -2.99)
    graffiti4b.rotation.y = Math.PI / -0.5
    graffiti4b.scale.set(1, 1, 1)
    scene.add(graffiti4b)
})

loader.load(BASE + 'models/Graffiti2.glb', (gltf) => {
    const graffiti = gltf.scene
    graffiti.position.set(2.3, -0.5, -2.99)
    graffiti.rotation.y = Math.PI / -0.5
    graffiti.scale.set(0.03, 0.03, 0.03)
    scene.add(graffiti)
})

loader.load(BASE + 'models/Graffiti.glb', (gltf) => {
    const graffitiA = gltf.scene
    graffitiA.position.set(1, 1.8, 2.99)
    graffitiA.rotation.y = Math.PI / -1
    graffitiA.scale.set(0.01, 0.01, 0.01)
    scene.add(graffitiA)

    const graffitiB = graffitiA.clone()
    graffitiB.position.set(1, 4.1, 2.99)
    graffitiB.rotation.y = Math.PI / -1
    graffitiB.scale.set(0.01, 0.01, 0.01)
    scene.add(graffitiB)

    const graffitiC = graffitiA.clone()
    graffitiC.position.set(2.99, 1, -0.9)
    graffitiC.rotation.y = Math.PI / -2
    graffitiC.scale.set(0.01, 0.01, 0.01)
    scene.add(graffitiC)
})

loader.load(BASE + 'models/Graffiti1.glb', (gltf) => {
    const graffiti1a = gltf.scene
    graffiti1a.position.set(-1.8, 1, 2.99)
    graffiti1a.rotation.y = Math.PI / -1
    graffiti1a.scale.set(0.015, 0.015, 0.015)
    scene.add(graffiti1a)
})

loader.load(BASE + 'models/Graffiti1.glb', (gltf) => {
    const graffiti1b = gltf.scene
    graffiti1b.position.set(2.55, 1.25, 1.9)
    graffiti1b.rotation.y = Math.PI / 1.2
    graffiti1b.scale.set(0.0065, 0.0068, 0.0099)
    scene.add(graffiti1b)
})

loader.load(BASE + 'models/Graffiti3.glb', (gltf) => {
    const graffiti3 = gltf.scene
    graffiti3.position.set(2.99, 0.3, -0.5)
    graffiti3.rotation.y = Math.PI / -2
    graffiti3.scale.set(0.014, 0.014, 0.014)
    scene.add(graffiti3)
})

loader.load(BASE + 'models/Camera.glb', (gltf) => {
    const camera = gltf.scene
    camera.position.set(-2.5, 2.95, -2.83)
    camera.rotation.x = Math.PI / -1
    camera.rotation.y = Math.PI / 1.4
    camera.scale.set(0.08, 0.08, 0.08)
    scene.add(camera)
})


loader.load(BASE + 'models/Flash.glb', (gltf) => {
    const flash = gltf.scene
    flash.position.set(0.8, 1, -1.8)
    flash.rotation.x = Math.PI / 0.5
    flash.rotation.y = Math.PI / -7
    flash.scale.set(0.0002, 0.0002, 0.0002)
    scene.add(flash)
})

loader.load(BASE + 'models/Wifi.glb', (gltf) => {
    const wifi = gltf.scene
    wifi.position.set(0.8, 0.9, -2.9)
    wifi.rotation.x = Math.PI / -0.5
    wifi.scale.set(1, 1, 1)
    scene.add(wifi)
})

loader.load(BASE + 'models/Server1.glb', (gltf) => {
    const server1 = gltf.scene
    server1.position.set(3, 0, -2.35)
    server1.rotation.y = Math.PI
    server1.scale.set(0.4, 0.4, 0.4)
    scene.add(server1)
})

loader.load(BASE + 'models/Server2.glb', (gltf) => {
    const server2a = gltf.scene
    server2a.position.set(2.7, 0, -1.5)
    server2a.rotation.y = Math.PI / -2
    server2a.scale.set(0.8, 0.8, 0.8)
    scene.add(server2a)

    const server2b = server2a.clone()
    server2b.position.set(2.75, 0, -0.8)
    server2b.rotation.y = Math.PI / -2
    server2b.scale.set(0.8, 0.8, 0.8)
    scene.add(server2b)
})

loader.load(BASE + 'models/Old server.glb', (gltf) => {
    const server2 = gltf.scene
    server2.position.set(2.7, 0, 0)
    server2.rotation.y = Math.PI
    server2.scale.set(0.4, 0.4, 0.4)
    scene.add(server2)
})

loader.load(BASE + 'models/Glock.glb', (gltf) => {
    const glock = gltf.scene
    glock.position.set(0.55, 0.95, -1.9)
    glock.rotation.y = Math.PI
    glock.rotation.x = Math.PI / 2
    glock.rotation.z = Math.PI / -3
    glock.scale.set(1.2, 1.2, 1.2)
    scene.add(glock)
})

const starsGeometry = new THREE.BufferGeometry()
const starsCount = 200
const positions = new Float32Array(starsCount * 3)

for (let i = 0; i < starsCount * 3; i += 3) {
    positions[i] = -4 - Math.random() * 8
    positions[i + 1] = Math.random() * 8 + 2
    positions[i + 2] = Math.random() * 12 - 2
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions,
    3))

const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.02,
})

const stars = new THREE.Points(starsGeometry, starsMaterial)
scene.add(stars)


const listener = new THREE.AudioListener()
camera.add(listener)

const audioLoader = new THREE.AudioLoader()

const windowSoundSource = new THREE.Object3D()
windowSoundSource.position.set(-5, 1.5, -0.5)
scene.add(windowSoundSource)

const doorSoundSource = new THREE.Object3D()
doorSoundSource.position.set(4, 1, 1.65)
scene.add(doorSoundSource)

const behindSoundSource = new THREE.Object3D()
behindSoundSource.position.set(0, 1, 2.65)
scene.add(behindSoundSource)

const serversSoundSource = new THREE.Object3D()
serversSoundSource.position.set(4, 1, -1.65)
scene.add(serversSoundSource)

const dogSounds = [
    BASE + 'assets/sounds/dogs.wav',
    BASE + 'assets/sounds/dogs2.wav',
]

const crackSound = new THREE.PositionalAudio(listener)
audioLoader.load(BASE + 'assets/sounds/floor-cracking.wav', (buffer) => {
    crackSound.setBuffer(buffer)
    crackSound.setVolume(0.5)
    crackSound.setRefDistance(2)
    crackSound.setMaxDistance(18)
})
doorSoundSource.add(crackSound)

const waterSound = new THREE.PositionalAudio(listener)
audioLoader.load(BASE + 'assets/sounds/water.wav', (buffer) => {
    waterSound.setBuffer(buffer)
    waterSound.setVolume(0.5)
    waterSound.setRefDistance(2)
    waterSound.setMaxDistance(18)
})
behindSoundSource.add(waterSound)

const phoneSound = new THREE.PositionalAudio(listener)
audioLoader.load(BASE + 'assets/sounds/phonering.wav', (buffer) => {
    phoneSound.setBuffer(buffer)
    phoneSound.setVolume(0.5)
    phoneSound.setRefDistance(2)
    phoneSound.setMaxDistance(18)
})
doorSoundSource.add(phoneSound)

const ambulanceSound = new THREE.PositionalAudio(listener)
audioLoader.load(BASE + 'assets/sounds/ambulance.mp3', (buffer) => {
    ambulanceSound.setBuffer(buffer)
    ambulanceSound.setVolume(2)
    ambulanceSound.setRefDistance(5)
    ambulanceSound.setMaxDistance(15)
})
windowSoundSource.add(ambulanceSound)

const fanLoopSound = new THREE.PositionalAudio(listener)
audioLoader.load(BASE + 'assets/sounds/fan.wav', (buffer) => {
    fanLoopSound.setBuffer(buffer)
    fanLoopSound.setLoop(true)
    fanLoopSound.setVolume(2)
    fanLoopSound.setRefDistance(5)
    fanLoopSound.setMaxDistance(15)
    fanLoopSound.play()
})
behindSoundSource.add(fanLoopSound)

const serversLoopSound = new THREE.PositionalAudio(listener)
audioLoader.load(BASE + 'assets/sounds/servers.wav', (buffer) => {
    serversLoopSound.setBuffer(buffer)
    serversLoopSound.setLoop(true)
    serversLoopSound.setRefDistance(2)
    serversLoopSound.setMaxDistance(30)
    serversLoopSound.play()
})
serversSoundSource.add(serversLoopSound)


function playRandomDog() {
    const dog = new THREE.PositionalAudio(listener)
    dog.setRefDistance(1)
    dog.setMaxDistance(15)
    windowSoundSource.add(dog)
    const src = dogSounds[Math.floor(Math.random() * dogSounds.length)]
    audioLoader.load(src, (buffer) => {
        dog.setBuffer(buffer)
        dog.setVolume(0.5)
        dog.play()
        dog.onEnded = () => windowSoundSource.remove(dog)
    })
    setTimeout(playRandomDog, 30000 + Math.random() * 60000)
}

function playRandomCrack() {
    if (!crackSound.isPlaying) {
        crackSound.play()
    }
    setTimeout(playRandomCrack, 20000 + Math.random() * 40000)
}

function playRandomWater() {
    if (!waterSound.isPlaying) {
        waterSound.play()
    }
    setTimeout(playRandomWater, 20000 + Math.random() * 40000)
}

function playRandomPhone() {
    if (!phoneSound.isPlaying) {
        phoneSound.play()
    }
    setTimeout(playRandomPhone, 20000 + Math.random() * 40000)
}

function playRandomAmbulance() {
    if (!ambulanceSound.isPlaying) {
        ambulanceSound.play()
    }
    setTimeout(playRandomAmbulance, 20000 + Math.random() * 40000)
}

setTimeout(playRandomDog, 5000 + Math.random() * 15000)
setTimeout(playRandomCrack, 10000 + Math.random() * 20000)
setTimeout(playRandomAmbulance, 25000 + Math.random() * 30000)
setTimeout(playRandomWater, 30000 + Math.random() * 40000)
setTimeout(playRandomPhone, 35000 + Math.random() * 50000)

// camera.position.set(0, 1.5, -1.5) // pozice kamery
camera.position.set(0, 1.5, -1.5) // pozice kamery - development

let targetRotationY = 0
let targetRotationX = 0
const maxRotationY = Math.PI * 0.9
const maxRotationX = Math.PI * 0.15

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
let zooming = false
let lights = true
let lightsOffSince: number | null = null
let lightsOnSince: number | null = Date.now()

const laptopTarget = {
    pos: new THREE.Vector3(-0.5, 1.35, -2.0),
    rot: new THREE.Euler(-0.15, Math.PI, 0),
}

canvas.addEventListener('click', (e) => {
    if (zooming || !laptopModel) return

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const hits = raycaster.intersectObject(laptopModel, true)

    if (hits.length > 0) {
        savedCameraPos.copy(camera.position)
        savedCameraRot.copy(camera.rotation)
        zooming = true
    }
})

canvas.addEventListener('click', (e) => {
    if (!ceilingModel) return

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const hits = raycaster.intersectObject(ceilingModel, true)

    if (hits.length > 0) {
        if (lights) {
            lightsOff()
        } else {
            lightsOn()
        }
    }
})


let laptopHovered = false
let ceilingHovered = false

const originalEmissive = new Map<THREE.Mesh, { color: THREE.Color, intensity: number }>()

function saveOriginalEmissive(model: THREE.Group) {
    model.traverse((child) => {
        if (child instanceof THREE.Mesh && 'emissive' in child.material && !originalEmissive.has(child)) {
            originalEmissive.set(child, {
                color: child.material.emissive.clone(),
                intensity: child.material.emissiveIntensity,
            })
        }
    })
}

function setHoverGlow(model: THREE.Group, hovered: boolean) {
    saveOriginalEmissive(model)
    model.traverse((child) => {
        if (child instanceof THREE.Mesh && 'emissive' in child.material) {
            if (hovered) {
                child.material.emissive.set(0x00ff41)
                child.material.emissiveIntensity = 0.8
            } else if (!lights && model === ceilingModel) {
                child.material.emissive.set(0x000000)
                child.material.emissiveIntensity = 0
            } else {
                const orig = originalEmissive.get(child)
                child.material.emissive.copy(orig?.color ?? new THREE.Color(0x000000))
                child.material.emissiveIntensity = orig?.intensity ?? 0
            }
        }
    })
}

document.addEventListener('mousemove', (e) => {
    if (zooming) return
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1
    const mouseY = (e.clientY / window.innerHeight) * 2 - 1

    targetRotationY = -mouseX * maxRotationY
    targetRotationX = -mouseY * maxRotationX

    mouse.x = mouseX
    mouse.y = -mouseY
    raycaster.setFromCamera(mouse, camera)

    if (laptopModel) {
        const hovered = raycaster.intersectObject(laptopModel, true).length > 0
        if (hovered !== laptopHovered) {
            laptopHovered = hovered
            setHoverGlow(laptopModel, hovered)
        }
    }

    if (ceilingModel) {
        const hovered = raycaster.intersectObject(ceilingModel, true).length > 0
        if (hovered !== ceilingHovered) {
            ceilingHovered = hovered
            setHoverGlow(ceilingModel, hovered)
        }
    }

    canvas.style.cursor = (laptopHovered || ceilingHovered) ? 'pointer' : ''
})

const savedIntensities = new Map<THREE.Light, number>()

const savedCeilingEmissive = new Map<THREE.Mesh, { color: THREE.Color, intensity: number }>()

function lightsOff() {
    lightsOffSince = Date.now()
    lightsOnSince = null
    lights = false
    scene.traverse((child) => {
        if (child instanceof THREE.Light && child !== lampLight) {
            savedIntensities.set(child, child.intensity)
            child.intensity = 0
        }
    })
    if (ceilingModel) {
        ceilingModel.traverse((child) => {
            if (child instanceof THREE.Mesh && 'emissive' in child.material) {
                savedCeilingEmissive.set(child, {
                    color: child.material.emissive.clone(),
                    intensity: child.material.emissiveIntensity,
                })
                child.material.emissive.set(0x000000)
                child.material.emissiveIntensity = 0
            }
        })
    }
}

function lightsOn() {
    lightsOffSince = null
    lightsOnSince = Date.now()
    lights = true
    scene.traverse((child) => {
        if (child instanceof THREE.Light) {
            child.intensity = savedIntensities.get(child) ?? 1
        }
    })
    if (ceilingModel) {
        ceilingModel.traverse((child) => {
            if (child instanceof THREE.Mesh && 'emissive' in child.material) {
                const saved = savedCeilingEmissive.get(child)
                if (saved) {
                    child.material.emissive.copy(saved.color)
                    child.material.emissiveIntensity = saved.intensity
                }
            }
        })
    }
}

function getLightsOffDuration(): number {
    if (!lightsOffSince) return 0
    return Date.now() - lightsOffSince
}

function getLightsOnDuration(): number {
    if (!lightsOnSince) return 0
    return Date.now() - lightsOnSince
}

const strangler = new Strangler(
    lightsOff, lightsOn, getLightsOffDuration,
    listener, audioLoader, windowSoundSource, BASE,
    loader, scene, camera
)

const shade = new Shade(
    lightsOff, lightsOn, getLightsOnDuration,
    listener, audioLoader, doorSoundSource, BASE,
    loader, scene, camera
)

const computerOverlay = document.getElementById('computer-overlay')!
const computerContainer = document.getElementById('computer-container')!
let computerOpen = false

const savedCameraPos = new THREE.Vector3()
const savedCameraRot = new THREE.Euler()

function openComputer() {
    computerOpen = true
    zooming = false
    computerOverlay.classList.remove('hidden')
    computerContainer.innerHTML = '<iframe src="./computer.html" style="width:100%;height:100%;border:none;"></iframe>'
}

function closeComputer() {
    computerOpen = false
    computerOverlay.classList.add('hidden')
    computerContainer.innerHTML = ''
    camera.position.copy(savedCameraPos)
    camera.rotation.copy(savedCameraRot)
}

window.addEventListener('message', (e) => {
    if (e.data === 'close-computer' && computerOpen) {
        closeComputer()
    }
})

function animate() {
    requestAnimationFrame(animate)

    if (strangler.animating) {
        strangler.animateCamera()
    } else if (shade.animating) {
        shade.animateCamera()
    } else if (zooming) {
        camera.position.lerp(laptopTarget.pos, 0.03)

        const dist = camera.position.distanceTo(laptopTarget.pos)
        if (dist < 0.05) {
            openComputer()
        }
    } else {
        camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.05
        camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.05
    }

    strangler.update()
    shade.update()
    renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})
