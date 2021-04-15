const filters = document.querySelector('.filters')
const btnReset = document.querySelector('.btn-reset')
const btnNext = document.querySelector('.btn-next')
const btnLoad = document.getElementById('btnInput')
const btnSave = document.querySelector('.btn-save')
const fullscreen = document.querySelector('.fullscreen')
let blurKef = 0

filters.addEventListener('mousedown', event => {
    const node = event.target
    if (node.matches('input')) {
        node.addEventListener('input', e => {
            if(event.target.name === 'blur'){
                blurKef = node.value
                console.log('eff')
            }
            const out = node.nextElementSibling
            out.value = node.value
            const root = document.querySelector(':root')
            const suffix = node.dataset.sizing || ''
            root.style.setProperty(`--${node.name}`, node.value + suffix)
        })
    }
})

btnReset.addEventListener('click', () => {
    const inputs = filters.querySelectorAll('input')
    const root = document.querySelector(':root')
    for (let i = 0; i < inputs.length; i++) {
        const suffix = inputs[i].dataset.sizing || ''
        if (inputs[i].name === 'saturate') {
            inputs[i].value = 100
            const out = inputs[i].nextElementSibling
            out.value = 100
            root.style.setProperty('--saturate', 100 + suffix)
        } else {
            inputs[i].value = 0
            const out = inputs[i].nextElementSibling
            out.value = 0
            root.style.setProperty(`--${inputs[i].name}`, 0 + suffix)

        }
    }
})

let counterPictures = 18;

btnNext.addEventListener('click', () => {
    const img = document.querySelector('img')
    if (counterPictures >= 9) {
        counterPictures++;
    }
    if (counterPictures < 10) {
        counterPictures++;
        counterPictures = '0' + counterPictures
    }
    const time = new Date().getHours()
    let timeString = ''
    if (time >= 6 && time < 12) {
        timeString = 'morning'
    }
    if (time >= 12 && time < 18) {
        timeString = 'day'
    }
    if (time >= 18 && time < 24) {
        timeString = 'evening'
    }
    if (time >= 0 && time < 6) {
        timeString = 'night'
    }
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeString}/${counterPictures}.jpg`
    if (counterPictures > 19) {
        counterPictures = 0;
    }
    console.log(img.width)
})

btnLoad.addEventListener('change', event => {
    const img = document.querySelector('img')
    let newImg = event.target.files[0]
    if (newImg) {
        img.src = URL.createObjectURL(newImg)
    }
    btnLoad.value = ''
})

btnSave.addEventListener('click', () => {
    const curImg = document.querySelector('img')
    console.log(curImg.width)
    let canvas = document.createElement('canvas')
    const img = new Image()
    img.src = curImg.src
    img.onload = function () {
        canvas.width = curImg.naturalWidth
        canvas.height = curImg.naturalHeight
        canvas.src = curImg.src
        let ctx = canvas.getContext('2d')
        // ctx.filter = getComputedStyle(curImg).filter
        let filterPropertyArr = getComputedStyle(curImg).filter.split(' ')
        console.log(filterPropertyArr)
        let kBlur = canvas.height / curImg.height
        console.log(kBlur)
        filterPropertyArr[0] = `blur(${blurKef * kBlur}px)`
        console.log(filterPropertyArr)
        ctx.filter = filterPropertyArr.join(' ')
        ctx.drawImage(curImg, 0, 0)
        let link = document.createElement('a')
        link.download = 'download.png'
        link.href = canvas.toDataURL('image/jpeg')
        link.click()
    }
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





