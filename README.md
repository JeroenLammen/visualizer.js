Visualizer
======

A tool to show a visualization from audio being played from an audio element

![alt text](https://github.com/JeroenLammen/visualizer.js/blob/master/readme_images/Screenshot_1.png "shape 'barsBottom'")

![alt text](https://github.com/JeroenLammen/visualizer.js/blob/master/readme_images/Screenshot_2.png "shape 'dotsMiddle'")

![alt text](https://github.com/JeroenLammen/visualizer.js/blob/master/readme_images/Screenshot_3.png "shape 'barsCircle'")

## How to use

Include the script in your html file, then call visualize() with an object of options as argument

### Required:

The object must contain a reference to the container where you want the visuals to appear:

```javascript
var myContainer = document.getElementById("myContainer");

visualize({
    container: myContainer
});
```

### Options:

* __audioElement:__ A reference to the audioElement which you want to use for the visualizations. If no audioElement is given, the first audio element of the html file will be used.
* __amountOfVisuals:__ The amount of visuals you want to use, e.g. the number of bars
* __distance:__ The distance between the visuals. __allowed values:__ 'none', 'small', 'medium' or 'large'
* __shape:__ The shape the visuals have to be. __allowed values:__ 
    * 'barsBottom'
    * 'dotsBottom'
    * 'barsMiddle'
    * 'dotsMiddle'
    * 'barsTop'
    * 'dotsTop'
    * 'barsCircle'
    * 'dotsCircle'
* __color:__ The color you want the visuals to have, e.g. 'rgb(255,0,255)', 'rgba(255,0,255,0.5)', '#F0F', 'blue'
* __image:__ A link to an image you want to include in the container
* __borderRadius:__ The border-radius of the visuals, e.g. '10px' or '50%'
* __minHeight:__ The minimal height the visuals need to have, e.g. 10 or 20
* __keepPosition:__ set to true if you want the visuals to stay in position when the audio is paused, set to false if you want the visuals to go back to their starting position when the audio is paused

#### The following options are only possible for the shapes 'barsCircle' and 'dotsCircle'

* __circleSize:__ The size of the circle, recommended values between 4 and 12
* __circleDistance:__ The distance between the visuals and the circle, recommended values between 0 and 2
* __visualRotationSpeed:__ The speed in which the visuals rotate around the circle, recommended values between 0 and 2,
* __imageRotationSpeed:__ The speed in which the image rotates, recommended values between 0 and 2,
* __visualRotationDirection:__ The direction the visuals rotate into, 'left' or 'right'.
* __imageRotationDirection:__ The direction the image rotates into, 'left' or 'right'.
* __showControls:__ set to true if you want a play and pause button into the circle. **IMPORTANT:** font-awesome is required for the button to appear!

**_More shapes, options and improvements will be added_**
