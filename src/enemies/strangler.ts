import * as THREE from "three"
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js"

export class Strangler {
    private getLightsOffDuration: () => number
    private sound: THREE.PositionalAudio
    private soundPlaying = false
    private model: THREE.Object3D | null = null
    private scene: THREE.Scene

    constructor(
        _lightsOff: () => void,
        _lightsOn: () => void,
        getLightsOffDuration: () => number,
        listener: THREE.AudioListener,
        audioLoader: THREE.AudioLoader,
        soundSource: THREE.Object3D,
        basePath: string,
        loader: GLTFLoader,
        scene: THREE.Scene
    ) {
        this.getLightsOffDuration = getLightsOffDuration
        this.scene = scene

        this.sound = new THREE.PositionalAudio(listener)
        audioLoader.load(basePath + 'assets/sounds/strangler.wav', (buffer) => {
            this.sound.setBuffer(buffer)
            this.sound.setVolume(1)
            this.sound.setRefDistance(5)
            this.sound.setMaxDistance(15)
        })
        soundSource.add(this.sound)

        loader.load(basePath + 'models/enemies/Strangler.glb', (gltf) => {
            this.model = gltf.scene
            this.model.position.set(-4.6, 0.3, 3.4)
            this.model.rotation.y = Math.PI / -0.3
            this.model.scale.set(1.5, 1.5, 1.5)
        })
    }

    update() {
        const duration = this.getLightsOffDuration()

        if (duration > 30000 && !this.soundPlaying && this.sound.buffer) {
            this.sound.play()
            this.soundPlaying = true
            if (this.model) this.scene.add(this.model)

        }

        if (duration === 0 && this.soundPlaying) {
            this.sound.stop()
            this.soundPlaying = false
            if (this.model) this.scene.remove(this.model)
        }

        if (duration > 50000) {
        }
    }
}
