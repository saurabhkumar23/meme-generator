// canvas
let canvases = document.querySelectorAll('canvas')
let canvasOverlay = document.querySelector('.canvas-overlay')
let canvasImage = document.querySelector('.canvas-image')
let canvasText = document.querySelector('.canvas-text')
let canvasBuffer = document.querySelector('.canvas-buffer')
// tool
let toolOverlay = canvasOverlay.getContext('2d')
let toolImage = canvasImage.getContext('2d')
let toolText = canvasText.getContext('2d')
let toolBuffer = canvasBuffer.getContext('2d')
// sidebar controls
let aspectRatioInput = document.querySelector('.aspect-ratio select')
let inputImage = document.querySelector('input[type="file"]')
let canvasExpandIcon = document.querySelector('.canvas-expand-icon i')
let bgOverlayInputs = document.querySelectorAll('.radios input[type="radio"]')
let opacityInput = document.querySelector('.overlay-opacity input')
let textAreaInput1 = document.querySelector('.text-area .text-1')
let textAreaInput2 = document.querySelector('.text-area .text-2')
let textColorInput = document.querySelector('.text-color input')
let textSizeInput = document.querySelector('.text-size input')
let textWeightInput = document.querySelector('.text-weight input')
let textStyleInput = document.querySelector('.text-font select')
let text1HRange = document.querySelector('.text1HRange')
let text1VRange = document.querySelector('.text1VRange')
let text2HRange = document.querySelector('.text2HRange')
let text2VRange = document.querySelector('.text2VRange')
let downloadBtn = document.querySelector('.download-img button')
// speech functionality
let mikeIcon = document.querySelectorAll('.mike-icon i')
let SpeechRecognition1 = window.webkitSpeechRecognition
let SpeechRecognition2 = window.webkitSpeechRecognition
let recognition1 = new SpeechRecognition1()
let recognition2 = new SpeechRecognition2()
recognition1.continuous = true;
recognition2.continuous = true;
let isSpeakModeOn = false