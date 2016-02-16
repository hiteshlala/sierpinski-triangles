// Functions and Fractals: Sierpinski triangles
// generates sierpinski triangle with n iterations and 
//   original hight h
//   should be at least 4
function sierpinski(n, h) {
  var b = 'hidden';
  var f = 'visible';
  
  // this generates an array containing a triangle
  //  that has hight h and width = (h * 2 - 1)
  function drawTriangle(h) {
    var image = [];
    var width = h * 2 - 1;
    for (var i = 0; i < h; i++) {
      image[i] = [];
      var edgeIdx = (width - 1) / 2;

      for (var j = 0; j < width; j++) {
        if(j < edgeIdx - i || j > edgeIdx + i ) image[i].push(b);
        else image[i].push(f);
      }
    }
    return image;
  }
  
  // this is the recursive function and generates sub triangles
  function drawSubTriangles(h, n) {
    var smallTriangle = n === 0 ? drawTriangle(h/2): drawSubTriangles(h/2, n - 1);

    var image = [];
    var width = h * 2 - 1;

    // add top triangle
    for (var i = 0; i < h/2; i++) {
      image.push([]);
      for (var j = 0; j < width / 4; j++) {
        image[i].push(b);
      }
      image[i] = image[i].concat(smallTriangle[i]);
      for (var j = 0; j < width / 4; j++) {
        image[i].push(b);
      }
    }

    //add bottom two triangles
    for (var i = h/2, j = 0; i < h; i++, j++) {
      image.push([]);
      image[i] = image[i].concat(smallTriangle[j]);
      image[i].push(b);
      image[i] = image[i].concat(smallTriangle[j]);
    }

    return image;
  }

  var image = n === 0 ? drawTriangle(h) : drawSubTriangles(h, n-1);

  // convert image data into a string
  function sendImgStr(ary) {
    var imgStr = "";
    for (var i = 0; i < ary.length; i++) {
       imgStr += ary[i].join("");
       imgStr += "\n";
     }
     return imgStr;
  }
  
  return image; // returns triangle as an array of arrays
  // return sendImgStr(image); // returns an string
}

// generates and returns a random color code
var randColor = function() {
  return "#"
      + (Math.floor(Math.random()*256)).toString(16) 
      + (Math.floor(Math.random()*256)).toString(16) 
      + (Math.floor(Math.random()*256)).toString(16);
};

// image variables 

var ht = 128;
var iter = 7;
var radius = 1;
var xsf = 3;
var ysf = 4;

// initial render function
var render = function render(iter){
  var data = sierpinski(iter, ht);
  var joinedData = [];
  data.forEach(function(ary, i) {
    ary.forEach(function(vis, j) {
      joinedData.push({visi: vis, row: i, col: j, color: randColor()});
    });
  });

  d3.select(".board")
    .selectAll("circle")
      .data(joinedData)
      .attr("cy", function(d) {return d.row * ysf + 20; })
      .attr("cx", function(d) { return d.col * xsf + 20; })
      .attr("r", radius)
      .attr('visibility', function(d) { return d.visi; })
      .attr('fill', function(d){ return d.color; })
    .enter().append("circle")
      .attr("cy", function(d) {return d.row * ysf + 20; })
      .attr("cx", function(d) { return d.col * xsf + 20; })
      .attr("r", radius)
      .attr('visibility', function(d) { return d.visi; })
      .attr('fill', function(d){ return d.color; });
};

// secondary renders
var reRender = function render(iter){
  var data = sierpinski(iter, ht);
  var joinedData = [];
  data.forEach(function(ary, i) {
    ary.forEach(function(vis, j) {
      joinedData.push({visi: vis, row: i, col: j, color: randColor()});
    });
  });

  d3.select(".board")
    .selectAll("circle")
      .data(joinedData)
      .attr("cy", function(d) {return d.row * ysf + 20; })
      .attr("cx", function(d) { return d.col * xsf + 20; })
      .attr("r", radius)
      .attr('visibility', function(d) { return d.visi; })
      .attr('fill', function(d){ return d.color; });
};

// initial render
render(0);
$('.iterations').text(0);

// reRender due to user input
$('#iterations').change(function() {
  var iterations = Number(this.value);
  // console.log('iterations',iterations);
  reRender(iterations);
  $('.iterations').text(iterations);

});
