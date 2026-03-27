// Strangler - nepřítel co přijde kdyz mas dlouho vyply svetla
import * as THREE from "three"
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"

// vlastnosti - zvuky, modely, animace, kamera
export class Strangler {
    private getLightsOffDuration: () => number
    private sound: THREE.PositionalAudio
    private sound2: THREE.PositionalAudio
    private sound3: THREE.PositionalAudio
    private soundPlaying = false
    private model: THREE.Object3D | null = null
    private model2: THREE.Object3D | null = null
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera

    public animating = false
    private phase: 'lookAt' | 'zoom' = 'lookAt'
    private targetLookAt = new THREE.Quaternion()
    private lookAtProgress = 0
    private zoomSpeed = 0
    private shakeIntensity = 0

    // nacte zvuky (skrabani, dychani, jumpscare) a 2 modely
    constructor(
        _lightsOff: () => void,
        _lightsOn: () => void,
        getLightsOffDuration: () => number,
        listener: THREE.AudioListener,
        audioLoader: THREE.AudioLoader,
        soundSource: THREE.Object3D,
        basePath: string,
        loader: GLTFLoader,
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera
    ) {
        this.getLightsOffDuration = getLightsOffDuration
        this.scene = scene
        this.camera = camera
        this.sound = new THREE.PositionalAudio(listener)
        audioLoader.load(basePath + 'assets/sounds/strangler/strangler.wav', (buffer) => {
            this.sound.setBuffer(buffer)
            this.sound.setVolume(0.5)
            this.sound.setRefDistance(5)
            this.sound.setMaxDistance(15)
        })
        soundSource.add(this.sound)

        this.sound2 = new THREE.PositionalAudio(listener)
        audioLoader.load(basePath + 'assets/sounds/strangler/strangler-breathing.wav', (buffer) => {
            this.sound2.setBuffer(buffer)
            this.sound2.setVolume(3)
            this.sound2.setRefDistance(5)
            this.sound2.setMaxDistance(15)
        })
        soundSource.add(this.sound2)

        this.sound3 = new THREE.PositionalAudio(listener)
        audioLoader.load(basePath + 'assets/sounds/strangler/strangler-jumpscare.mp3', (buffer) => {
            this.sound3.setBuffer(buffer)
            this.sound3.setVolume(1)
            this.sound3.setRefDistance(5)
            this.sound3.setMaxDistance(15)
        })
        soundSource.add(this.sound3)


        loader.load(basePath + 'models/enemies/Strangler.glb', (gltf) => {
            this.model = gltf.scene
            this.model.position.set(-4.6, 0.3, 3.4)
            this.model.rotation.y = Math.PI / -0.3
            this.model.scale.set(1.5, 1.5, 1.5)
        })

        loader.load(basePath + 'models/enemies/Strangler.glb', (gltf) => {
            this.model2 = gltf.scene
            this.model2.position.set(-1.8, 0.6, -0.3)
            this.model2.rotation.y = Math.PI / -0.3
            this.model2.scale.set(1.5, 1.5, 1.5)
        })
    }


    // spusti animaci smrti - kamera na stranglera
    startAnimation() {
        if (!this.model2) return
        this.animating = true
        this.phase = 'lookAt'
        this.lookAtProgress = 0
        this.zoomSpeed = 0.002
        this.shakeIntensity = 0

        const faceTarget = this.model2.position.clone()
        faceTarget.y += 1.2
        const tempCamera = this.camera.clone()
        tempCamera.lookAt(faceTarget)
        this.targetLookAt.copy(tempCamera.quaternion)
    }

    // animuje kameru - otoceni + zoom + shake
    animateCamera(): boolean {
        if (!this.animating || !this.model2) return false

        const faceTarget = this.model2.position.clone()
        faceTarget.y += 1.2

        if (this.phase === 'lookAt') {
            this.lookAtProgress += 0.01 + this.lookAtProgress * 0.03
            this.lookAtProgress = Math.min(this.lookAtProgress, 1)
            this.camera.quaternion.slerp(this.targetLookAt, this.lookAtProgress)

            const tilt = new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 0, 1),
                Math.sin(this.lookAtProgress * Math.PI) * 0.06
            )
            this.camera.quaternion.multiply(tilt)

            if (this.lookAtProgress >= 1) {
                this.camera.quaternion.copy(this.targetLookAt)
                this.phase = 'zoom'
            }
        } else if (this.phase === 'zoom') {
            this.zoomSpeed = Math.min(this.zoomSpeed * 1.025, 0.06)
            this.camera.position.lerp(faceTarget, this.zoomSpeed)
            this.camera.lookAt(faceTarget)

            const dist = this.camera.position.distanceTo(faceTarget)

            this.shakeIntensity = Math.max(0, (1 - dist / 3)) * 0.015
            this.camera.rotation.x += (Math.random() - 0.5) * this.shakeIntensity
            this.camera.rotation.y += (Math.random() - 0.5) * this.shakeIntensity
            this.camera.rotation.z += (Math.random() - 0.5) * this.shakeIntensity * 0.5

            if (dist < 0.3) {
                this.animating = false
                const youDied = document.createElement('span')
                youDied.id = 'youDiedText'
                youDied.textContent = 'You are dead.'
                document.body.appendChild(youDied)
            }
        }

        return true
    }

    // hlavni update - podle casu vyplych svetel prehrava zvuky, ukazuje model, spousti animaci
    update() {
        const duration = this.getLightsOffDuration()

        if (duration > 30000 && !this.soundPlaying && this.sound.buffer) {
            this.sound.play()
            this.soundPlaying = true
            if (this.model) this.scene.add(this.model)

        }

        if (duration === 0 && this.soundPlaying) {
            this.sound.stop()
            this.sound2.stop()
            this.soundPlaying = false
            if (this.model) this.scene.remove(this.model)
            if (this.model2) this.scene.remove(this.model2)
        }

        if (duration > 50000) {
            if (this.model) this.scene.remove(this.model)
            if (this.model2) this.scene.add(this.model2)
            if (!this.sound2.isPlaying) this.sound2.play()
            this.sound.stop()
            this.soundPlaying = true
        }

        if (duration > 59000 && !this.animating) {
            if (this.model2) this.scene.add(this.model2)
            this.startAnimation()
            if (!this.sound3.isPlaying) this.sound3.play()
            this.soundPlaying = true

        }
        if (duration > 64000 && this.soundPlaying) {
            this.sound3.stop()
            this.soundPlaying = false

        }

        if (duration > 69000) {
            window.location.href = './menu.html'

        }
    }
}
