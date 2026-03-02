import './menu.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import {Terminal} from './terminal/terminal'

document.addEventListener('click', () => {
    document.body.requestFullscreen().catch(
        (err) => console.error('Error requesting fullscreen:', err)
    )
}, {once: true})

const terminal = new Terminal(document.getElementById('menu')!, {
    'help': () => {
        terminal.addLine('=== GAME ===')
        terminal.addLine('  ./survival      - start survival mode')
        terminal.addLine('  ./endless       - start endless mode')
        terminal.addLine('  cat readme      - how to play')
        terminal.addLine('')
        terminal.addLine('=== FILES ===')
        terminal.addLine('  ls              - list files')
        terminal.addLine('  cat <file>      - read a file')
        terminal.addLine('')
        terminal.addLine('=== SYSTEM ===')
        terminal.addLine('  whoami          - show current user')
        terminal.addLine('  hostname        - show hostname')
        terminal.addLine('  pwd             - print working directory')
        terminal.addLine('  date            - show date and time')
        terminal.addLine('  uptime          - show system uptime')
        terminal.addLine('  uname           - show system info')
        terminal.addLine('  uname -a        - show full system info')
        terminal.addLine('  id              - show user id')
        terminal.addLine('  ifconfig        - show network config')
        terminal.addLine('  netstat         - show connections')
        terminal.addLine('  neofetch        - show system overview')
        terminal.addLine('  top / htop      - show running processes')
        terminal.addLine('  ps              - list processes')
        terminal.addLine('  free            - show memory usage')
        terminal.addLine('  df              - show disk usage')
        terminal.addLine('  echo <text>     - print text')
        terminal.addLine('')
        terminal.addLine('=== OTHER ===')
        terminal.addLine('  clear           - clear terminal')
        terminal.addLine('  exit            - exit terminal')
        return '  help            - show this message'
    },

    'ls': () => {
        terminal.addLine('readme')
        terminal.addLine('settings')
        terminal.addLine('survival')
        terminal.addLine('endless')
        return 'fsoceity'
    },
    './survival': () => {
        window.location.href = './loading.html?mode=survival'
        return 'Loading survival mode...'
    },
    './endless': () => {
        return 'Coming soon...'
    },
    'cat readme': () => {
        terminal.addLine('You are a hacker. Clients give you quests.')
        terminal.addLine('Use real terminal commands to complete them.')
        terminal.addLine('Watch your back - if they find you, it\'s over.')
        return 'Type "help" to see all available commands.'
    },
    'cat settings': () => 'Settings: coming soon',
    'cat fsoceity': () => 'We are watching you.',
    'cat survival': () => 'Executable file. Use ./survival to run.',
    'cat endless': () => 'Executable file. Use ./endless to run.',

    'ssh': () => 'Usage: ssh <user>@<host> (available in game)',
    'scp': () => 'Usage: scp <file> <user>@<host>:<path> (available in game)',
    'wget': () => 'Usage: wget <url> (available in game)',
    'curl': () => 'Usage: curl <url> (available in game)',
    'nc': () => 'Usage: nc <host> <port> (available in game)',
    'ncat': () => 'Usage: ncat <host> <port> (available in game)',
    'nmap': () => 'Usage: nmap <ip> (available in game)',
    'ping': () => 'Usage: ping <host> (available in game)',
    'grep': () => 'Usage: grep <pattern> <file> (available in game)',

    'chmod': () => 'Permission denied: restricted shell',
    'mkdir': () => 'Permission denied: restricted shell',
    'rm': () => 'Permission denied: restricted shell',
    'touch': () => 'Permission denied: restricted shell',
    'mv': () => 'Permission denied: restricted shell',
    'cp': () => 'Permission denied: restricted shell',
    'cd': () => 'Permission denied: restricted shell',
    'nano': () => 'Permission denied: restricted shell',
    'vim': () => 'Permission denied: restricted shell',
    'kill': () => 'Permission denied: restricted shell',
    'shutdown': () => 'Permission denied: restricted shell',
    'reboot': () => 'Permission denied: restricted shell',
    'systemctl': () => 'Permission denied: restricted shell',
    'service': () => 'Permission denied: restricted shell',
    'dd': () => 'Permission denied: restricted shell',
    'mkfs': () => 'Permission denied: restricted shell',
    'fdisk': () => 'Permission denied: restricted shell',
    'mount': () => 'Permission denied: restricted shell',
})

const date = document.getElementById('topbar-date')
const time = document.getElementById('topbar-time')

date && setInterval(() => date.innerHTML = new Date().toLocaleDateString(), 1000)
time && setInterval(() => time.innerHTML = new Date().toLocaleTimeString(), 1000)

const icons = document.querySelectorAll('.icon')
icons.forEach(icon => icon.addEventListener('click', () => terminal.addLine("We are in your system, use terminal only.")))

const btns = document.querySelectorAll('.window-btn')
btns.forEach(btn => btn.addEventListener('click', () => terminal.addLine("We are in your system, don't do that.")))