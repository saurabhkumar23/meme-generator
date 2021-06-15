let canvasOverlay = document.querySelector('.canvas-overlay')
let canvasImage = document.querySelector('.canvas-image')
let canvasText = document.querySelector('.canvas-text')
let canvasBuffer = document.querySelector('.canvas-buffer')
let toolOverlay = canvasOverlay.getContext('2d')
let toolImage = canvasImage.getContext('2d')
let toolText = canvasText.getContext('2d')
let toolBuffer = canvasBuffer.getContext('2d')
let canvasExpandIcon = document.querySelector('.canvas-expand-icon i')
let aspectRatioInput = document.querySelector('.aspect-ratio select')
let inputImage = document.querySelector('input[type="file"]')
let bgOverlayInputs = document.querySelectorAll('.radios input[type="radio"]')
let opacityInput = document.querySelector('.overlay-opacity input')
let textAreaInput = document.querySelector('.text-area textarea')
let textSizeInput = document.querySelector('.text-size input')
let textStyleInput = document.querySelector('.text-font select')
let textHRange = document.querySelector('.textHRange')
let textVRange = document.querySelector('.textVRange')
let downloadBtn = document.querySelector('.download-img button')
let mikeIcon = document.querySelector('.mike-icon i')
let SpeechRecognition = window.webkitSpeechRecognition
let recognition = new SpeechRecognition()
recognition.continuous = true;
let isSpeakModeOn = false

// canvas attributes
let cWidth = 1024
let cHeight = 512
let img
let text = 'Text'
let fontSize = '50'
let fontStyle = 'Sans-Serif'
let text_X = 20
let text_Y = 60
let overlay = '#858484'
let opacity = 0.5

// init call
updateCanvas()

// canvas width n height
aspectRatioInput.addEventListener('change',function(e){
    let ratio = e.target.value
    if(ratio == 'wide'){
        cWidth = 1024
        cHeight = 512
    }
    else{
        cWidth  = 600
        cHeight = 600
    }
    // update canvas
    updateCanvas()
})

// image
inputImage.addEventListener('change',function(e){
    // get image
    let imageData = e.target.files[0]
    img = new Image()
    // set url
	img.src = URL.createObjectURL(imageData)
    img.onload = () => {
        // update canvas
        updateCanvas()
    }
})

// bg overlay
for(let i=0;i<bgOverlayInputs.length;i++){
    bgOverlayInputs[i].addEventListener('change',function(e){
        // set overlay
        overlay = e.target.value
        // update canvas
        updateCanvas()
    })
}

// opacity
opacityInput.addEventListener('change',function(e){
    // set opacity
    opacity = e.target.value
    // update canvas
    updateCanvas()
})

// text
textAreaInput.addEventListener('keyup',function(e){
    // set text
    text = e.target.value
    // update canvas
    updateCanvas()
})

// fontsize
textSizeInput.addEventListener('change',function(e){
    // set font size
    fontSize = e.target.value
    // update canvas
    updateCanvas()
})

// font style
textStyleInput.addEventListener('change',function(e){
    // set font style
    fontStyle = e.target.value
    //  update canvas
    updateCanvas()
})

// hor text alignment
textHRange.addEventListener('change',function(e){
    // set x
    text_X = e.target.value
    //  update canvas
    updateCanvas()
})

// ver text alignment
textVRange.addEventListener('change',function(e){
    console.log(e.target.value)
    // set y
    text_Y = e.target.value
    //  update canvas
    updateCanvas()
})


// main call for canvas update
function updateCanvas(){
    // update canvas
    updateOverlayCanvas()
    updateImageCanvas()
    updateTextCanvas()
    // update range for text alignment
    textHRange.max = cWidth
    textVRange.max = cHeight
    // update mainbuffer canvas
    updateBufferCanvas()
}

// ovelay canvas update
function updateOverlayCanvas(){
    // set canvas height and width
    canvasOverlay.height = cHeight
    canvasOverlay.width = cWidth
    // set opacity
    toolOverlay.globalAlpha = opacity
    // set overlay
    toolOverlay.fillStyle = overlay
    toolOverlay.fillRect(0,0,canvasOverlay.width,canvasOverlay.height)
}

// image canvas update
function updateImageCanvas(){
    // set canvas height and width
    canvasImage.height = cHeight
    canvasImage.width = cWidth
    // set bg image
    if(img){
        toolImage.drawImage(img,0,0,canvasImage.width,canvasImage.height)
    }
}

// text canvas update
function updateTextCanvas(){
    // set canvas height and width
    canvasText.height = cHeight
    canvasText.width = cWidth
    // set font 
    toolImage.font = fontSize + 'px' + ' ' + fontStyle
    // set text
    toolImage.fillText(text,text_X,text_Y)
}

// buffer canvas update
function updateBufferCanvas(){
    // set canvas height and width
    canvasBuffer.height = cHeight
    canvasBuffer.width = cWidth
    // image
    if(img){
        toolBuffer.drawImage(img,0,0,canvasBuffer.width,canvasBuffer.height)
    }
    // overlay
    toolBuffer.fillStyle = overlay
    // opacity
    toolBuffer.globalAlpha = opacity
    toolBuffer.fillRect(0,0,canvasBuffer.width,canvasBuffer.height)
    // text
    toolBuffer.fillStyle = 'white'
    toolBuffer.font = fontSize + 'px' + ' ' + fontStyle
    toolBuffer.fillText(text,text_X,text_Y)
}

// download canvas
downloadBtn.addEventListener('click',function(){
    let url = canvasBuffer.toDataURL()                        // canvas give url of drawing image
    let a = document.createElement('a')               // <a download="file.png" href="url"></a>
    a.download = 'file.png'
    a.href = url
    a.click()
    a.remove()
})

// full screen feature
canvasExpandIcon.addEventListener('click',function(){
    canvasBuffer.requestFullscreen()
})

// speech to text
mikeIcon.addEventListener('click',function(){
    if(isSpeakModeOn){
        recognition.stop();    // speak done
        mikeIcon.style.color = 'white'
    }
    else{
        recognition.start();   // speak now
        mikeIcon.style.color = '#dd0a0a'
    }
    isSpeakModeOn = !isSpeakModeOn
})

// get speech result
recognition.onresult = function(event){
    let current = event.resultIndex
    let transcript = event.results[current][0].transcript
    // set text
    text += transcript
    // set text on textarea
    textAreaInput.value = text
    // update canvas
    updateCanvas()
};
    