// Shade - nepřítel co přijde kdyz mas dlouho zaply svetla
import * as THREE from "three"
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"

// vlastnosti - zvuky, model, animace, kamera
export class Shade {
    private getLightsOnDuration: () => number
    private sound: THREE.PositionalAudio
    private sound2: THREE.PositionalAudio
    private sound3: THREE.PositionalAudio
    private soundPlaying = false
    private sound2Started = false
    private soundLoudStarted = false
    private model: THREE.Object3D | null = null
    private mixer: THREE.AnimationMixer | null = null
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private clock = new THREE.Clock()

    public animating = false
    private phase: 'lookAt' | 'zoom' = 'lookAt'
    private targetLookAt = new THREE.Quaternion()
    private lookAtProgress = 0
    private zoomSpeed = 0
    private shakeIntensity = 0

    // nacte zvuky (dupani, klepani, vystresl) a model
    constructor(
        _lightsOff: () => void,
        _lightsOn: () => void,
        getLightsOnDuration: () => number,
        listener: THREE.AudioListener,
        audioLoader: THREE.AudioLoader,
        soundSource: THREE.Object3D,
        basePath: string,
        loader: GLTFLoader,
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera
    ) {
        this.getLightsOnDuration = getLightsOnDuration
        this.scene = scene
        this.camera = camera
        this.sound = new THREE.PositionalAudio(listener)
        audioLoader.load(basePath + 'assets/sounds/shade/stomping.mp3', (buffer) => {
            this.sound.setBuffer(buffer)
            this.sound.setVolume(1.8)
            this.sound.setRefDistance(3)
            this.sound.setMaxDistance(15)
        })
        soundSource.add(this.sound)

        this.sound2 = new THREE.PositionalAudio(listener)
        audioLoader.load(basePath + 'assets/sounds/shade/doorKnocking.wav', (buffer) => {
            this.sound2.setBuffer(buffer)
            this.sound2.setVolume(4)
            this.sound2.setRefDistance(5)
            this.sound2.setMaxDistance(15)
        })
        soundSource.add(this.sound2)

        this.sound3 = new THREE.PositionalAudio(listener)
        audioLoader.load(basePath + 'assets/sounds/shade/gunshot.mp3', (buffer) => {
            this.sound3.setBuffer(buffer)
            this.sound3.setVolume(5)
            this.sound3.setRefDistance(8)
            this.sound3.setMaxDistance(15)
        })
        soundSource.add(this.sound3)


        loader.load(basePath + 'models/enemies/Robber.glb', (gltf) => {
            this.model = gltf.scene
            this.model.position.set(2, 0, 0)
            this.model.rotation.y = Math.PI * 1.3
            this.model.scale.set(0.01, 0.01, 0.01)

            const fullClip = gltf.animations[0]
            const fps = 24
            const shootClip = THREE.AnimationUtils.subclip(fullClip, 'shoot', 15.25 * fps, 17.80 * fps)

            this.mixer = new THREE.AnimationMixer(this.model)
            this.mixer.clipAction(shootClip).play()
        })
    }


    // spusti animaci smrti - kamera se otoci na shade a zoomuje
    startAnimation() {
        if (!this.model) return
        this.animating = true
        this.phase = 'lookAt'
        this.lookAtProgress = 0
        this.zoomSpeed = 0.002
        this.shakeIntensity = 0

        const faceTarget = this.model.position.clone()
        faceTarget.y += 1.7
        const tempCamera = this.camera.clone()
        tempCamera.lookAt(faceTarget)
        this.targetLookAt.copy(tempCamera.quaternion)
    }

    // animuje kameru - nejdriv otoceni, pak zoom + shake
    animateCamera(): boolean {
        if (!this.animating || !this.model) return false

        const faceTarget = this.model.position.clone()
        faceTarget.y += 1.7

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

    // hlavni update - podle casu zaply svetel prehrava zvuky a spousti animaci
    update() {
        if (this.mixer) this.mixer.update(this.clock.getDelta())
        const duration = this.getLightsOnDuration()

        if (duration === 0 && this.soundPlaying) {
            this.sound.stop()
            this.sound2.stop()
            this.sound3.stop()
            this.soundPlaying = false
            this.sound2Started = false
            this.soundLoudStarted = false
            if (this.model) this.scene.remove(this.model)
        }

        if (duration > 240000 && !this.soundPlaying && this.sound.buffer) {
            this.sound.setVolume(1.8)
            this.sound.setLoop(false)
            this.sound.play()
            this.soundPlaying = true
        }

        if (duration > 247000 && !this.sound2Started) {
            this.sound.stop()
            this.sound2.setLoop(false)
            this.sound2.play()
            this.sound2Started = true
        }

        if (duration > 264000 && !this.soundLoudStarted) {
            this.sound.setVolume(7)
            this.sound.setLoop(false)
            this.sound.play()
            this.soundLoudStarted = true
        }

        if (duration > 274000 && !this.animating) {
            this.sound.stop()
            if (this.model) this.scene.add(this.model)
            this.startAnimation()
            this.sound3.setLoop(false)
            this.sound3.play()
        }

        if (duration > 275000 && this.sound3.isPlaying) {
            this.sound3.stop()
        }

        if (duration > 282000) {
            window.location.href = './menu.html'
        }
    }
}
