const piano = document.querySelector('.piano')

const btnLetters = document.querySelector('.btn-letters')
const btnNotes = document.querySelector('.btn-notes')
const pianoKeys = document.querySelectorAll('.piano-key')
const fullscreen = document.querySelector('.fullscreen')
let isFullScreen = false
// let mouseLeftKeyIsPress = false

function playMusic(node) {
    const key = node
    key.classList.add('piano-key-active')
    const note =node.dataset.note
    let audio = new Audio(`assets/audio/${note}.mp3`)
    audio.play();
}

function test(e){
    if(e.target.classList.contains('piano-key')){
        e.target.classList.remove('piano-key-active')
        playMusic(e.target)
        window.addEventListener('mouseup', () => {
            piano.removeEventListener('mouseover', test)
        })
    }
}
// window.addEventListener('mouseup', () => {
//     mouseLeftKeyIsPress = false
// })

piano.addEventListener('mousedown', evt => {
    playMusic(evt.target)
    piano.addEventListener('mouseover', test)
    piano.addEventListener('mouseout', evt1 => {
        evt1.target.classList.remove('piano-key-active')
    })
})

piano.addEventListener('mouseup', evt => {
    const node = evt.target
    if(node.classList.contains('piano-key-active')){
        node.classList.remove('piano-key-active')
    }
})


window.addEventListener('keydown', e => {
    if(e.repeat)
        return;
    let code = e.code
    const sounds = {
        'D': 'c',
        'F': 'd',
        'G': 'e',
        'H': 'f',
        'J': 'g',
        'K': 'a',
        'L': 'b',
        'R': 'c♯',
        'T': 'd♯',
        'U': 'f♯',
        'I': 'g♯',
        'O': 'a♯'
    }
    code = code.split('').reverse()[0]
    if(!sounds.hasOwnProperty(code))
        return
    let node = Array.from(pianoKeys).find(item => item.dataset.note == sounds[code])
    node.classList.add('piano-key-active')
    let audio = new Audio(`assets/audio/${sounds[code]}.mp3`)
    audio.play()
})

window.addEventListener('keyup', e => {
    let code = e.code
    const sounds = {
        'D': 'c',
        'F': 'd',
        'G': 'e',
        'H': 'f',
        'J': 'g',
        'K': 'a',
        'L': 'b',
        'R': 'c♯',
        'T': 'd♯',
        'U': 'f♯',
        'I': 'g♯',
        'O': 'a♯'
    }
    code = code.split('').reverse()[0]
    if(!sounds.hasOwnProperty(code))
        return
    let node = Array.from(pianoKeys).find(item => item.dataset.note == sounds[code])
    node.classList.remove('piano-key-active')

})

btnLetters.addEventListener('click', evt => {
    pianoKeys.forEach(item => item.classList.add('piano-key-letter'))
    evt.target.classList.add('btn-active')
    btnNotes.classList.remove('btn-active')
})

btnNotes.addEventListener('click', evt => {
    pianoKeys.forEach(item => item.classList.remove('piano-key-letter'))
    evt.target.classList.add('btn-active')
    btnLetters.classList.remove('btn-active')
})

fullscreen.addEventListener('click', evt => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
})