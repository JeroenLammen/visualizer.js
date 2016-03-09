var visualize = function(args) {

//INITIALIZE VARIABLES
    var audioElement, container, containerW, containerH, amountOfVisuals, distance, marginRight, marginLeft, startRequest, stopRequest, isPlaying, shape, color, dynamicColor, image, borderRadius, minHeight, singleBarW, circleSize, keepPosition, circleDistance, visualRotationSpeed, imageRotationSpeed, visualRotationDirection, imageRotationDirection, showControls;

    var possibleShapes = ['barsBottom', 'barsTop', 'barsMiddle', 'barsCircle', 'dotsBottom', 'dotsTop', 'dotsMiddle', 'dotsCircle'];

//VALIDATION
    if(!args.audioElement || args.audioElement.nodeName !== "AUDIO" || !args.audioElement.hasAttribute("src")) {
        var elem = document.getElementsByTagName("AUDIO")[0];
        if(elem === undefined || !elem.hasAttribute("src")) {
            console.log("No audio element found / audio element has no source");
            return false;
        }
    } if(!args.container || args.container.nodeName !== 'DIV') {
        console.log("No container for visuals specified");
        return false;
    } if(args.amountOfVisuals && typeof args.amountOfVisuals !== 'number') {
        console.log("amountOfVisuals should be a number");
        return false;
    } if(args.shape && possibleShapes.indexOf(args.shape) === -1) {
        console.log("shape not supported");
        return false;
    } if(args.color && args.dynamicColor) {
        console.log("color and dynamicColor can't be used together");
        return false;
    } //OTHER VALIDATION........

//SET VARIABLES
    audioElement = args.audioElement || document.getElementsByTagName("AUDIO")[0];
    container = args.container;
    containerW = container.offsetWidth;
    containerH = container.offsetHeight;
    isPlaying = false;
    shape = args.shape || 'barsBottom';
    amountOfVisuals = args.amountOfVisuals || 100;
    distance = args.distance || 'small';
    args.color ? color = args.color : args.dynamicColor ? color = undefined : color = '#000';
    dynamicColor = args.dynamicColor || undefined;
    image = args.image || undefined;
    borderRadius = args.borderRadius || 0;
    minHeight = args.minHeight || containerH / 20;
    circleSize = args.circleSize * 16 || 6 * 16;
    keepPosition = args.keepPosition || false;
    circleDistance = args.circleDistance * 16 || 0;
    visualRotationSpeed = args.visualRotationSpeed || 0;
    imageRotationSpeed = args.imageRotationSpeed || 0;
    visualRotationDirection = args.visualRotationDirection || 'right';
    imageRotationDirection = args.imageRotationDirection || 'right';
    showControls = args.showControls || false;


//SET CSS ON VISUALS CONTAINER
    container.style.position = "relative";
    container.style.fontSize = "16px";

//SET PROPERTIES BASED ON SHAPE
    switch(shape) {
        case "barsBottom": case "barsTop": case "barsMiddle":
        case "dotsBottom": case "dotsTop": case "dotsMiddle":
            switch(distance) {
                case 'none':
                    singleBarW = containerW / amountOfVisuals;
                    marginRight = 0;
                    marginLeft = 0;
                    break;
                case 'small':
                    if((containerW / amountOfVisuals - 2) < 1.5) {
                        singleBarW = 1.5;
                        amountOfVisuals = containerW / (singleBarW + 2);
                    } else {
                        singleBarW = (containerW / amountOfVisuals) - 2;
                    }
                    marginRight = 1;
                    marginLeft = 2;
                    break;
                case 'medium':
                    if((containerW / amountOfVisuals - 4) < 1.5) {
                        singleBarW = 1.5;
                        amountOfVisuals = containerW / (singleBarW + 4);
                    } else {
                        singleBarW = (containerW / amountOfVisuals) - 4;
                    }
                    marginRight = 2;
                    marginLeft = 4;
                    break;
                case 'large':
                    if((containerW / amountOfVisuals - 6) < 1.5) {
                        singleBarW = 1.5;
                        amountOfVisuals = containerW / (singleBarW + 6);
                    } else {
                        singleBarW = (containerW / amountOfVisuals) - 6;
                    }
                    marginRight = 3;
                    marginLeft = 6;
                    break;
            }
            break;
        case "barsCircle": case "dotsCircle":
            var circumference = 2 * Math.PI * circleSize;
            switch(distance) {
                case 'none':
                    singleBarW = circumference / amountOfVisuals;
                    break;
                case 'small':
                    if((circumference / amountOfVisuals - 1) < 1.5) {
                        singleBarW = 1.5;
                        amountOfVisuals = circumference / (singleBarW + 1);
                    } else {
                        singleBarW = (circumference / amountOfVisuals) - 1;
                    }
                    break;
                case 'medium':
                    if((circumference / amountOfVisuals - 2.5) < 1.5) {
                        singleBarW = 1.5;
                        amountOfVisuals = circumference / (singleBarW + 2.5);
                    } else {
                        singleBarW = (circumference / amountOfVisuals) - 2.5;
                    }
                    break;
                case 'large':
                    if((circumference / amountOfVisuals - 4) < 1.5) {
                        singleBarW = 1.5;
                        amountOfVisuals = circumference / (singleBarW + 4);
                    } else {
                        singleBarW = (circumference / amountOfVisuals) - 4;
                    }
                    break;
            }
            break;
    }

//INITIALIZE WEB AUDIO API
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
        audioSrc = audioCtx.createMediaElementSource(audioElement),
        analyser = audioCtx.createAnalyser(),
        dataArray = new Uint8Array(amountOfVisuals);
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);


//INSERT VISUALS STARTING POINT
    switch(shape) {
        case 'barsBottom': case 'dotsBottom':
            for(var i = 0; i < dataArray.length; i++) {
                var div = document.createElement('div');
                div.className = "visualizerItem";
                div.style.cssText =
                    "position: absolute; " +
                    "bottom: 0;" +
                    "display: inline-block;" +
                    "min-height: " + minHeight + "px;" +
                    "width: " + singleBarW + "px;" +
                    "margin: 0 " + marginRight + "px 0 " + i * (singleBarW + marginLeft) + "px;" +
                    "border-radius: " + borderRadius + ";" +
                    "background: " + color + ";";
                container.appendChild(div);
            }
            if(image) {
                container.style.background = "url(" + image + ") no-repeat";
                container.style.backgroundSize = "100% 100%";
            }
            break;
        case 'barsTop': case 'dotsTop':
            for(var i = 0; i < dataArray.length; i++) {
                var div = document.createElement('div');
                div.className = "visualizerItem";
                div.style.cssText =
                    "position: absolute; " +
                    "top: 0;" +
                    "display: inline-block;" +
                    "min-height: " + minHeight + "px;" +
                    "width: " + singleBarW + "px;" +
                    "margin: 0 " + marginRight + "px 0 " + i * (singleBarW + marginLeft) + "px;" +
                    "border-radius: " + borderRadius + ";" +
                    "background: " + color + ";";
                container.appendChild(div);
            }
            if(image) {
                container.style.background = "url(" + image + ") no-repeat";
                container.style.backgroundSize = "100% 100%";
            }
            break;
        case 'barsMiddle':
            for(var i = 0; i < dataArray.length; i++) {
                var div = document.createElement('div');
                div.className = "visualizerItem";
                div.style.cssText =
                    "position: absolute; " +
                    "top: 0;" +
                    "bottom: 0;" +
                    "display: inline-block;" +
                    "min-height: " + minHeight + "px;" +
                    "height: " + minHeight + "px;" +
                    "width: " + singleBarW + "px;" +
                    "margin: auto " + marginRight + "px auto " + i * (singleBarW + marginLeft) + "px;" +
                    "border-radius: " + borderRadius + ";" +
                    //"box-shadow: 0 0 5px 3px white;" + ADD BOX-SHADOW TO ARGS
                    "background: " + color + ";";
                container.appendChild(div);
            }
            if(image) {
                container.style.background = "url(" + image + ") no-repeat";
                container.style.backgroundSize = "100% 100%";
            }

            //use
            break;
        case 'dotsMiddle':
            for(var t = 0; t < 2; t++) {
                for(var i = 0; i < dataArray.length; i++) {
                    var div = document.createElement('div');
                    div.className = "visualizerItem";
                    div.style.cssText =
                        "position: absolute; " +
                        "top: 0;" +
                        "bottom: 0;" +
                        "display: inline-block;" +
                        "min-height: " + minHeight + "px;" +
                        "height: " + minHeight + "px;" +
                        "width: " + singleBarW + "px;" +
                        "margin: auto " + marginRight + "px auto " + i * (singleBarW + marginLeft) + "px;" +
                        "border-radius: " + borderRadius + ";" +
                            //"box-shadow: 0 0 5px 3px white;" + ADD BOX-SHADOW TO ARGS
                        "background: " + color + ";";
                    container.appendChild(div);
                }
            }
            if(image) {
                container.style.background = "url(" + image + ") no-repeat";
                container.style.backgroundSize = "100% 100%";
            }
            break;
        case 'barsCircle': case 'dotsCircle':
            for(var i = 0; i < dataArray.length; i++) {
                var div = document.createElement('div');
                div.className = "visualizerItem";
                var rotation = 360 / amountOfVisuals;
                div.style.cssText =
                    "position: absolute; " +
                    "bottom: 50%;" +
                    "left: 0;" +
                    "right: 0;" +
                    "z-index: 2;" +
                    "margin: auto;" +
                    "display: inline-block;" +
                    "min-height: " + minHeight + "px;" +
                    "width: " + singleBarW + "px;" +
                    "border-radius: " + borderRadius + ";" +
                    "background: " + color + ";" +
                    //"border-top: 3px solid red;" +
                    "transform-origin: bottom;" +
                    "font-size: 16px;" +
                    "transform: rotate(" + i * rotation + "deg) translateY(-" + (circleSize + circleDistance) + "px);";
                container.appendChild(div);
            }
            if(image) {
                var circleImage = document.createElement("img");
                circleImage.src = image;
                circleImage.style.cssText =
                    "position: absolute;" +
                    "z-index: 1;" +
                    "margin: auto;" +
                    "top: 0;" +
                    "bottom: 0;" +
                    "left: 0;" +
                    "right: 0;" +
                    "border-radius: 50%;" +
                    "width: " + (circleSize * 2) + "px;" +
                    "height: " + (circleSize * 2) + "px;";
                visualsContainer.appendChild(circleImage);
            }
            if(showControls) {
                var playBtn = document.createElement("div");
                playBtn.id = 'playBtn';
                playBtn.style.cssText =
                    "position: absolute;" +
                    "z-index: 2;" +
                    "margin: auto;" +
                    "top: 0;" +
                    "bottom: 0;" +
                    "left: 0;" +
                    "right: 0;" +
                    "width: 50px;" +
                    "height: 100px;" +
                    "text-align: center;" +
                    "font-size: 20px";
                visualsContainer.appendChild(playBtn);
                var playBtnI = document.createElement("i");
                playBtnI.className ="fa fa-play fa-5x";
                playBtn.appendChild(playBtnI);
            }
            break;
    }

//VISUALIZATION USING REQUEST ANIMATION FRAME
    function renderVisualization() {
        if(typeof renderVisualization.visualRotation == 'undefined') {
            renderVisualization.visualRotation = 0;
        }
        if(typeof renderVisualization.imageRotation == 'undefined') {
            renderVisualization.imageRotation = 0;
        }
        console.log("renderVisualization()");
        startRequest = requestAnimationFrame(renderVisualization);
        analyser.getByteFrequencyData(dataArray);
        var children = container.querySelectorAll(".visualizerItem");
        switch(shape) {
            case 'barsBottom': case 'barsTop': case 'barsMiddle':
                for (var i = 0; i < children.length; i++) {
                    children[i].style.height =
                        map(dataArray[i], 0, 255, minHeight, containerH) + "px";
                }
                break;
            case 'dotsBottom':
                for (var i = 0; i < children.length; i++) {
                    children[i].style.transform =
                        "translateY(-" + map(dataArray[i], 0, 255, 0, (containerH - minHeight)) + "px)";
                }
                break;
            case 'dotsTop':
                for (var i = 0; i < children.length; i++) {
                    children[i].style.transform =
                        "translateY(" + map(dataArray[i], 0, 255, 0, (containerH - minHeight)) + "px)";
                }
                break;
            case 'dotsMiddle':
                for (var i = 0; i < children.length / 2; i++) {
                    children[i].style.transform =
                        "translateY(-" + map(dataArray[i], 0, 255, 0, (containerH - minHeight) / 2) + "px)";
                }
                for (var j = children.length / 2; j < children.length; j++) {
                    children[j].style.transform =
                        "translateY(" + map(dataArray[j - dataArray.length], 0, 255, 0, (containerH - minHeight) / 2) + "px)";
                }
                break;
            case 'barsCircle':
                var maxLength;
                if (containerH <= containerW) {
                    maxLength = containerH - (containerH / 2) - circleSize - circleDistance - minHeight;
                } else {
                    maxLength = containerW - (containerW / 2) - circleSize - circleDistance - minHeight;
                }
                var rotation = 360 / amountOfVisuals;
                renderVisualization.visualRotation += visualRotationSpeed;
                renderVisualization.imageRotation += imageRotationSpeed;
                if(image) {
                    var img = container.querySelector('img');
                    if(imageRotationDirection === 'right') {
                        img.style.transform = "rotate(" + renderVisualization.imageRotation + "deg)";
                    } else if(imageRotationDirection === 'left') {
                        img.style.transform = "rotate(-" + renderVisualization.imageRotation + "deg)";
                    }
                }
                for(var i = 0; i < children.length; i++) {
                    children[i].style.height =
                        map(dataArray[i], 0, 255, minHeight, maxLength) + "px";
                    if(visualRotationDirection === 'right') {
                        children[i].style.transform =
                            "rotate(" + ((i * rotation) + renderVisualization.visualRotation) + "deg)" +
                            "translateY(-" + (circleSize + circleDistance) + "px)";
                    } else if(visualRotationDirection === 'left') {
                        children[i].style.transform =
                            "rotate(-" + ((i * rotation) + renderVisualization.visualRotation) + "deg)" +
                            "translateY(-" + (circleSize + circleDistance) + "px)";
                    }
                }
                break;
            case 'dotsCircle':
                var maxLength;
                if (containerH <= containerW) {
                    maxLength = containerH - (containerH / 2) - circleSize - circleDistance - minHeight;
                } else {
                    maxLength = containerW - (containerW / 2) - circleSize - circleDistance - minHeight;
                }
                var rotation = 360 / amountOfVisuals;
                renderVisualization.visualRotation += visualRotationSpeed;
                renderVisualization.imageRotation += imageRotationSpeed;
                if(image) {
                    var img = container.querySelector('img');
                    if(imageRotationDirection === 'right') {
                        img.style.transform = "rotate(" + renderVisualization.imageRotation + "deg)";
                    } else if(imageRotationDirection === 'left') {
                        img.style.transform = "rotate(-" + renderVisualization.imageRotation + "deg)";
                    }
                }
                for(var i = 0; i < children.length; i++) {
                    if(visualRotationDirection === 'right') {
                        children[i].style.transform =
                            "rotate(" + ((i * rotation) + renderVisualization.visualRotation) + "deg)" +
                            "translateY(-" + map(dataArray[i], 0, 255, circleSize + circleDistance, (circleSize + circleDistance + maxLength)) + "px)";
                    } else if(visualRotationDirection === 'left') {
                        children[i].style.transform =
                            "rotate(-" + ((i * rotation) + renderVisualization.visualRotation) + "deg)" +
                            "translateY(-" + map(dataArray[i], 0, 255, circleSize + circleDistance, (circleSize + circleDistance + maxLength)) + "px)";
                    }
                }
                break;
        }
    }

    var arrayReset = false;

    function stopWhenVisualsReset() {
        console.log("stopWhenVisualsReset()");
        stopRequest = requestAnimationFrame(stopWhenVisualsReset);
        if(!arrayReset) {
            arrayReset = isArrayReset();
        } else {
            console.log("cancelling");
            cancelAnimationFrame(startRequest);
            cancelAnimationFrame(stopRequest);
            arrayReset = false;
        }
    }



    //START VISUALIZATION
    audioElement.addEventListener("play", function(){
        console.log("started");
        if(!isPlaying) {
            startRequest = requestAnimationFrame(renderVisualization);
            isPlaying = true;
        }
    });

    //STOP VISUALIZATION
    audioElement.addEventListener("pause", function(){
        console.log("paused");
        if(isPlaying) {
            if(!keepPosition) {
                stopRequest = requestAnimationFrame(stopWhenVisualsReset);
            } else {
                cancelAnimationFrame(startRequest);
            }
            isPlaying = false;
        }
    });

    playBtn.addEventListener('mouseenter', function(){
        playBtn.style.color = 'grey';
    });

    playBtn.addEventListener('mouseleave', function(){
        playBtn.style.color = '#000';
    });

    playBtn.addEventListener('click', function() {
        if(!isPlaying) {
            playBtnI.className = 'fa fa-pause fa-5x';
            playBtn.style.width = '86px';
            audioElement.play();
        } else {
            playBtnI.className = 'fa fa-play fa-5x';
            playBtn.style.width = '50px';
            audioElement.pause();
        }
    });


    function map( x,  in_min,  in_max,  out_min,  out_max){
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    function isArrayReset() {
        for(var i = 1; i < dataArray.length; i++) {
            if(dataArray[i] !== dataArray[0]) {
                return false;
            }
        }
        return true;
    }
};