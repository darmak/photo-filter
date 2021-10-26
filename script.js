'use strict';
//Ползунки в аутпут и на фото
const filter = document.querySelector('.filters');
const labels = filter.querySelectorAll('label');
const image = document.querySelector('img');
labels.forEach(item => {
    const input = item.querySelector('input');
    const output = item.querySelector('output');
    const names = input.getAttribute('name');
    input.addEventListener('input', function () {
        /* Во время движения ползунка */
        // console.log(this.value)
        output.innerHTML = this.value;
        if(names === 'blur') {
            image.style.cssText += `--blur: ${this.value}px`;
        } else if(names === 'invert') {
            image.style.cssText += `--invert: ${this.value}%`;
        }
        else if(names === 'sepia') {
            image.style.cssText += `--sepia: ${this.value}%`;
        }
        else if(names === 'saturate') {
            image.style.cssText += `--saturate: ${this.value}%`;
        } else if(names === 'hue') {
            image.style.cssText += `--hue: ${this.value}deg`;
        } 
        
    }, false);
});
//СБРОСИТЬ ЗНАЧЕНИЕ ЭФФЕКТОВ 
const reset = document.querySelector('.btn-reset');
reset.addEventListener('click', () => {
    image.style.cssText = "";
    labels.forEach(item => {
        const input = item.querySelector('input');
        const output = item.querySelector('output');
        if(item === labels[3]) {
            input.value = 100;
            output.innerHTML = input.value;
        } else {
            input.value = 0;
            output.innerHTML = input.value;
        }
    });
});

// Скачать фото 
const btnInput = document.getElementById('btnInput');
btnInput.addEventListener('change', function (e) {
    const file = btnInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        image.src = reader.result;
    }
    reader.readAsDataURL(file);
    btnInput.value = '';
});
// **Скачтаь фото**

// Фото с учётом времени
const btnNext = document.querySelector('.btn-next');
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
let data = new Date();
let hour = data.getHours();
let timesOfDay = '';
function startImg () {
    if (hour < 6) {
        timesOfDay = 'night';
    } else if (hour < 12) {
        timesOfDay = 'morning';
    } else if (hour < 18) {
        timesOfDay = 'day';
    } else {
        timesOfDay = 'evening';
    }
}
startImg();
// **Фото с учётом времени**
// След ФОТО
function getZero(num) {
    if(num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}
let i = 0;
function nextPic () {
    i++;
    if(i === 21) {
        i = 1;
    }
    console.log(`${base}${timesOfDay}/${getZero(i)}.jpg`);
    image.src = `${base}${timesOfDay}/${getZero(i)}.jpg`;
}
btnNext.addEventListener('click',nextPic);
// **След фото**

// CANVAS
const blurOutput = document.getElementById('blurOutput');
const invertOutput = document.getElementById('invertOutput');
const sepiaOutput = document.getElementById('sepiaOutput');
const saturateOutput = document.getElementById('saturateOutput');
const hueOutput = document.getElementById('hueOutput');
const btnSave = document.querySelector('.btn-save');
const canvas = document.querySelector('canvas');
console.log(canvas);
function drawImage() {

    let ctx = canvas.getContext("2d");
    let img2 = new Image(); // "Создаём" изображение
    img2.setAttribute('crossOrigin', 'anonymous');
    img2.src = image.src // Источник изображения, позаимствовано на хабре
    img2.onload = function () {
    
    canvas.width = img2.width;
    canvas.height = img2.height; // Событие onLoad, ждём момента пока загрузится изображение
    ctx.filter = ` sepia(${sepiaOutput.value * 0.01}) hue-rotate(${hueOutput.value}deg) invert(${invertOutput.value * 0.01}) blur(${blurOutput.value}px) saturate(${saturateOutput.value * 0.01}) `;
    ctx.drawImage(img2, 0, 0);
    var link = document.createElement('a');
    console.log(link);
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
    
    }
    
    
}
btnSave.addEventListener('click', drawImage);
    
// ***CANVAS**

const screen = document.querySelector('.fullscreen');

screen.addEventListener('click', () => {
    document.documentElement.requestFullscreen();
    if (document.fullscreenElement) {
        document.exitFullscreen();
       }
});