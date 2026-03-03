import './computer.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import {Terminal} from './terminal/terminal'

document.addEventListener('click', () => {
    document.body.requestFullscreen().catch(
        (err) => console.error('Error requesting fullscreen:', err)
    )
}, {once: true})

const terminal = new Terminal(document.getElementById('menu')!, {
    'help': () => {
        terminal.addLine('=== FILES ===')
        terminal.addLine('  ls              - list files')
        terminal.addLine('  ls <file>       - list files in directory')
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
        terminal.addLine('enemies/')
        terminal.addLine('readme')
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
    'ls enemies': () => {
        terminal.addLine('=== KNOWN THREATS ===')
        terminal.addLine('')
        terminal.addLine('  strangler     - stalks those who leave the lights off')
        terminal.addLine('  zer0_day      - rival hacker monitoring your network')
        terminal.addLine('  shade         - steals your hardware if you\'re stacked')
        terminal.addLine('  glitch        - corrupted entity from the network')
        terminal.addLine('  crawler       - lives in the vents, comes when it\'s quiet')
        terminal.addLine('  swat          - cybercrime unit tracking your activity')
        terminal.addLine('')
        return 'Use "cat enemies/<name>" to read a threat profile.'
    },

    'cat enemies/strangler': () => {
        terminal.addLine('=== THREAT PROFILE: STRANGLER ===')
        terminal.addLine('')
        terminal.addLine('Nobody knows his real name. On the dark web he goes')
        terminal.addLine('by "The Strangler" - a former sysadmin')
        terminal.addLine('who lost his mind after 3 years in a windowless')
        terminal.addLine('server room. Now he lives in the dark, hunting')
        terminal.addLine('those who dare to turn off the lights.')
        terminal.addLine('')
        terminal.addLine('[BEHAVIOR]')
        terminal.addLine('He comes when it\'s dark. Darkness is where he')
        terminal.addLine('feels safe - where he\'s invisible. The moment')
        terminal.addLine('you turn off the lights, he starts moving toward')
        terminal.addLine('you. The longer you stay in the dark, the closer')
        terminal.addLine('he gets.')
        terminal.addLine('')
        terminal.addLine('[COUNTERMEASURE]')
        terminal.addLine('Keep the lights on. He can\'t stand light - it')
        terminal.addLine('burns his eyes, blinds him, drives him back into')
        terminal.addLine('the walls. If you hear his sound, turn the lights')
        terminal.addLine('on immediately. Don\'t let the dark last too long.')
        terminal.addLine('')
        terminal.addLine('[APPEARANCE]')
        terminal.addLine('Tall figure in a dark hood. No face - just a black')
        terminal.addLine('void. Long, unnaturally thin fingers. Moves slowly.')
        terminal.addLine('Never stops.')
        terminal.addLine('')
        terminal.addLine('[SOUND SIGNATURE]')
        terminal.addLine('Faint scratching on the wall. Nails on concrete.')
        terminal.addLine('Then slow, heavy breathing - deep and wet.')
        return 'If you hear it behind you, it\'s too late.'
    },

    'cat enemies/zer0_day': () => {
        terminal.addLine('=== THREAT PROFILE: ZER0_DAY ===')
        terminal.addLine('')
        terminal.addLine('A rival. Someone better than you - or so he thinks.')
        terminal.addLine('Operates under the alias zer0_day and monitors your')
        terminal.addLine('network. The moment he detects you\'re online, he')
        terminal.addLine('tries to seize control of your system.')
        terminal.addLine('')
        terminal.addLine('[BEHAVIOR]')
        terminal.addLine('Attacks your terminal. Commands start typing')
        terminal.addLine('themselves - he\'s inside. If you don\'t stop him,')
        terminal.addLine('he takes over. Steals data, wipes files, disconnects.')
        terminal.addLine('')
        terminal.addLine('[COUNTERMEASURE]')
        terminal.addLine('Break his hack. When you see foreign commands,')
        terminal.addLine('enter countermeasures - sever his connection before')
        terminal.addLine('he finishes. Ignore him and you lose everything.')
        terminal.addLine('')
        terminal.addLine('[APPEARANCE]')
        terminal.addLine('Most of the time, you only see his presence on')
        terminal.addLine('screen - green text you didn\'t type, a cursor')
        terminal.addLine('moving on its own. But sometimes he works nearby.')
        terminal.addLine('You might spot him through the window - hunched')
        terminal.addLine('over a laptop in a parked car, or sitting on a')
        terminal.addLine('bench across the street, hood up, face hidden by mask')
        terminal.addLine('If you see him outside,')
        terminal.addLine('he\'s already inside your system.')
        terminal.addLine('')
        terminal.addLine('[SOUND SIGNATURE]')
        terminal.addLine('Rapid keyboard tapping that isn\'t yours. A sharp')
        terminal.addLine('tone - like a new SSH session connecting.')
        return 'And quiet laughter. Barely audible, but it\'s there.'
    },

    'cat enemies/shade': () => {
        terminal.addLine('=== THREAT PROFILE: SHADE ===')
        terminal.addLine('')
        terminal.addLine('Don\'t let the name fool you. Shade isn\'t some')
        terminal.addLine('petty pickpocket. He\'s a violent, ruthless thief')
        terminal.addLine('who kills for loot. He knows what your hardware')
        terminal.addLine('is worth and he\'s willing to put a knife in your')
        terminal.addLine('throat to get it.')
        terminal.addLine('')
        terminal.addLine('[BEHAVIOR]')
        terminal.addLine('He doesn\'t care if your lights are on or off.')
        terminal.addLine('He\'s not afraid of being seen. He kicks the door')
        terminal.addLine('in, takes what he wants, and eliminates anyone')
        terminal.addLine('in his way. He shows up when he knows you have')
        terminal.addLine('valuable equipment. The more you own, the bigger')
        terminal.addLine('the target on your back.')
        terminal.addLine('')
        terminal.addLine('[COUNTERMEASURE]')
        terminal.addLine('Hide your valuables. Keep your setup minimal.')
        terminal.addLine('If you hear him coming, lock the door and stay')
        terminal.addLine('quiet. Fighting him is not an option - he\'s')
        terminal.addLine('armed and he\'s done this before. Your only')
        terminal.addLine('chance is making sure he doesn\'t find anything')
        terminal.addLine('worth killing for.')
        terminal.addLine('')
        terminal.addLine('[APPEARANCE]')
        terminal.addLine('Black hoodie, ski mask, tactical gloves. Built')
        terminal.addLine('heavy. Carries a blade and doesn\'t hesitate to')
        terminal.addLine('use it. Moves with purpose - no sneaking, no')
        terminal.addLine('hiding. He walks in like he owns the place.')
        terminal.addLine('')
        terminal.addLine('[SOUND SIGNATURE]')
        terminal.addLine('Heavy boots on concrete. No attempt to be quiet.')
        terminal.addLine('The crack of a door being forced open. Then')
        terminal.addLine('drawers being ripped out, hardware being torn')
        return 'from the rack. And breathing. Calm, steady breathing.'
    },

    'cat enemies/glitch': () => {
        terminal.addLine('=== THREAT PROFILE: GLITCH ===')
        terminal.addLine('')
        terminal.addLine('Nobody knows where she came from. She first appeared')
        terminal.addLine('in the logs as a corrupted JPEG in an email you')
        terminal.addLine('never opened. But she opened herself. They call her')
        terminal.addLine('"Packet Ghost" - an entity that lives in the network')
        terminal.addLine('and sometimes... crawls through to the other side.')
        terminal.addLine('')
        terminal.addLine('[BEHAVIOR]')
        terminal.addLine('Appears randomly without warning. Doesn\'t react to')
        terminal.addLine('light or dark. She just shows up. Standing in the')
        terminal.addLine('corner. Behind the window. In the monitor reflection.')
        terminal.addLine('When you look at her, she doesn\'t move.')
        terminal.addLine('When you don\'t, she\'s closer.')
        terminal.addLine('')
        terminal.addLine('[COUNTERMEASURE]')
        terminal.addLine('Don\'t look at her. Don\'t keep her in your vision')
        terminal.addLine('too long - the longer you stare, the stronger she')
        terminal.addLine('gets. Turn away and keep working. She wants your')
        terminal.addLine('attention. Don\'t give it to her.')
        terminal.addLine('')
        terminal.addLine('[APPEARANCE]')
        terminal.addLine('Girl in dirty white clothes. Long black hair over')
        terminal.addLine('her face. Grey, almost translucent skin. Stands')
        terminal.addLine('unnaturally - head tilted, arms limp. Sometimes')
        terminal.addLine('she twitches. Like a corrupted frame in a video.')
        terminal.addLine('')
        terminal.addLine('[SOUND SIGNATURE]')
        terminal.addLine('Static noise. Like tuning a dead radio frequency.')
        terminal.addLine('Then a quiet whisper - words you can\'t understand')
        terminal.addLine('but sound familiar. And sometimes - a child\'s')
        return 'laughter from a speaker that should be off.'
    },

    'cat enemies/crawler': () => {
        terminal.addLine('=== THREAT PROFILE: CRAWLER ===')
        terminal.addLine('')
        terminal.addLine('You don\'t know what it is. You don\'t want to know.')
        terminal.addLine('It lives in the vents and the spaces between walls.')
        terminal.addLine('Something that was here before you. Before the')
        terminal.addLine('building. Before the network. Old tenants called it')
        terminal.addLine('"The Crawl" - you never see it walk. Only crawl.')
        terminal.addLine('')
        terminal.addLine('[BEHAVIOR]')
        terminal.addLine('Moves through vents and wall cavities. When it\'s')
        terminal.addLine('too quiet - no noise, terminal silent - it thinks')
        terminal.addLine('nobody\'s here. And it comes to check. Squeezes')
        terminal.addLine('through the vent opening. You won\'t find it until')
        terminal.addLine('it\'s too late.')
        terminal.addLine('')
        terminal.addLine('[COUNTERMEASURE]')
        terminal.addLine('Make noise. Keep the fan running. Play sounds.')
        terminal.addLine('A silent terminal is a dead terminal. If you hear')
        terminal.addLine('scratching in the walls, type anything - echo,')
        terminal.addLine('ping, whatever. Sound keeps it away.')
        terminal.addLine('')
        terminal.addLine('[APPEARANCE]')
        terminal.addLine('Nobody has seen it whole. Just... parts. Long,')
        terminal.addLine('jointed fingers poking out of a vent. Eyes - too')
        terminal.addLine('many eyes - glowing in the dark behind the grate.')
        terminal.addLine('A body too long, too flexible to be human.')
        terminal.addLine('It moves like an insect.')
        terminal.addLine('')
        terminal.addLine('[SOUND SIGNATURE]')
        terminal.addLine('Scratching inside the walls. Metallic tapping in')
        terminal.addLine('the vents - irregular, like something squeezing')
        terminal.addLine('through a tight space. Then silence. Then wet,')
        return 'wheezing breathing from the ceiling vent above you.'
    },

    'cat enemies/swat': () => {
        terminal.addLine('=== THREAT PROFILE: SWAT ===')
        terminal.addLine('')
        terminal.addLine('Cybercrime special forces. They monitor the darknet,')
        terminal.addLine('track traffic, and you\'re on their list. They\'re')
        terminal.addLine('not monsters - they\'re professionals. And that\'s')
        terminal.addLine('the scariest thing about them. They don\'t come')
        terminal.addLine('because they hate you. They come because it\'s')
        terminal.addLine('their job.')
        terminal.addLine('')
        terminal.addLine('[BEHAVIOR]')
        terminal.addLine('They come when you\'re too aggressive. Too many')
        terminal.addLine('hacks, too fast, too loud. Your threat level rises')
        terminal.addLine('with every action - cross the line and you hear a')
        terminal.addLine('radio, footsteps, then the door gets kicked in.')
        terminal.addLine('Game over. Arrested. Done.')
        terminal.addLine('')
        terminal.addLine('[COUNTERMEASURE]')
        terminal.addLine('Work quietly. Don\'t be greedy. Watch your threat')
        terminal.addLine('level - when it\'s rising, slow down. Stop hacking,')
        terminal.addLine('wait, let the traffic die down. Spread attacks over')
        terminal.addLine('time. One big hack draws attention. Five small don\'t.')
        terminal.addLine('')
        terminal.addLine('[APPEARANCE]')
        terminal.addLine('Black uniforms, bulletproof vests, helmets with')
        terminal.addLine('visors. Laser sights in the dark - red dots on the')
        terminal.addLine('walls. They move in a team, systematically, without')
        terminal.addLine('emotion. No negotiation. No warning.')
        terminal.addLine('Just: "GET ON THE GROUND."')
        terminal.addLine('')
        terminal.addLine('[SOUND SIGNATURE]')
        terminal.addLine('Quiet radio chatter - crackling, garbled callouts.')
        terminal.addLine('Car engine below the window. Fast, synchronized')
        terminal.addLine('footsteps on the stairs. Metallic click - weapons')
        terminal.addLine('chambered. A ram. Once. Twice.')
        return 'Third hit - and the door is gone.'
    },

    'cat fsoceity': () => 'We are watching you.',

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