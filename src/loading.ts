// loading screen - nacitani modelu pred hrou
import './loading.css'

// elementy progressbaru
const progressFill = document.getElementById('progress-fill')!
const progressText = document.getElementById('progress-text')!

// mod hry z URL
const params = new URLSearchParams(window.location.search)
const mode = params.get('mode') || 'survival'
const BASE = import.meta.env.BASE_URL

// seznam vsech modelu co se musi nacist
const models = [
    'Ceiling.glb',
    'Fan.glb',
    'Adjustable Desk.glb',
    'Chair.glb',
    'Sofa.glb',
    'Window.glb',
    'Locker.glb',
    'Bag.glb',
    'Plug.glb',
    'Cables.glb',
    'Skateboard.glb',
    'Shoes.glb',
    'Drone.glb',
    'Kitchen.glb',
    'Lamp.glb',
    'Door.glb',
    'Carpet.glb',
    'Mousepad.glb',
    'Flipper.glb',
    'Mouse.glb',
    'Keyboard.glb',
    'Monster.glb',
    'Bins.glb',
    'Pizza.glb',
    'Raspi.glb',
    'Garbage.glb',
    'Headphones.glb',
    'Case.glb',
    'Monitor.glb',
    'Curved monitor.glb',
    'laptop.glb',
    'Rf.glb',
    'Pc cable.glb',
    'Speaker.glb',
    'Poster.glb',
    'Graffiti4.glb',
    'Graffiti2.glb',
    'Graffiti.glb',
    'Graffiti1.glb',
    'Graffiti3.glb',
    'Camera.glb',
    'Flash.glb',
    'Wifi.glb',
    'Server1.glb',
    'Server2.glb',
    'Old server.glb',
    'Glock.glb',
    'enemies/Strangler.glb',
    'enemies/Robber.glb',
]

// aktualizace progressbaru
function setProgress(value: number) {
    const v = Math.min(value, 100)
    progressFill.style.width = v + '%'
    progressText.textContent = Math.round(v) + '%'
}

// fetchne vsechny modely a pak presmeruje na hru
async function runLoading() {
    let loaded = 0

    for (const name of models) {
        await fetch(BASE + 'models/' + name)
        loaded++
        setProgress((loaded / models.length) * 100)
    }

    await new Promise(r => setTimeout(r, 300))
    window.location.href = `./game.html?mode=${mode}`
}

// spusteni
runLoading()
