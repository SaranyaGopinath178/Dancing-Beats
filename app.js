$(document).ready(function () {


//audio connect
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// audio element to get the input from the dataset and read it..
  var audioElement = document.getElementById('audioElement');
  
  // creating a source to link with the audio element 
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  
  // The analyser node function is used to creat frequency data 
  var analyser = audioCtx.createAnalyser();

  // audio element to destination
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  var svgHeight = '300';
  var svgWidth = '1515';
  var barPadding = '2';

  //frequency motion
  var frequency = new Uint8Array(analyser.frequencyBinCount);
  var frequency = new Uint8Array(100);


  //creating SVG elements for the web page 
  function createSvg(parent, height, width, center) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  
  // D3 depiction 
  svg.selectAll('rect')
     .data(frequency)
     .enter()
     .append('rect')
     // x axis is given position details 
     .attr('x', function (d, i) {
        return i * (svgWidth / frequency.length);
     })
     .attr('width', svgWidth / frequency.length - barPadding);


  // looping with frequency data based on the song input...
  function renderChart() {
     requestAnimationFrame(renderChart);

     // syncing to frequency data
     analyser.getByteFrequencyData(frequency);

     //updating according to new song
     svg.selectAll('rect')
        .data(frequency)
        //y axis is given position etails
        .attr('y', function(d) {
           return svgHeight - d;
        })
        .attr('height', function(d) {
           return d;
        })
        .attr('fill', function(d) {
          return 'rgb(0, 250 ,' + d/2 * 200+ ')';
        });
  }

  //run 
  renderChart();

});
