HPROG.canvas = {};
 
HPROG.canvas.loadImage = function(image, context) {
  console.log('I am here...');
  //var img = new Image();
  //img.src = imageScr;
  //img.crossOrigin = "anonymous";
  //img.onload = loadImage(this, ctx);
  console.log('Yip your in the function');
  //// Clip to just the non-text part of the logo
  //// save the context state
  context.drawImage(image, 0, 0, 250, 250 );
  context.save();
};



HPROG.canvas.resizeAndUpload = function(file) {
var reader = new FileReader();
    reader.onloadend = function() {
 
    var tempImg = new Image();
    tempImg.src = reader.result;
    tempImg.onload = function() {
 
        var MAX_WIDTH = 400;
        var MAX_HEIGHT = 400;
        var tempW = tempImg.width;
        var tempH = tempImg.height;
        if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
               tempH *= MAX_WIDTH / tempW;
               tempW = MAX_WIDTH;
            }
        } else {
            if (tempH > MAX_HEIGHT) {
               tempW *= MAX_HEIGHT / tempH;
               tempH = MAX_HEIGHT;
            }
        }
 
        var canvas = document.createElement('canvas');
        canvas.width = tempW;
        canvas.height = tempH;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, tempW, tempH);
        var dataURL = canvas.toDataURL("image/jpeg");
 
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(ev){
            document.getElementById('filesInfo').innerHTML = 'Done!';
        };
 
        xhr.open('POST', 'uploadResized.php', true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        var data = 'image=' + dataURL;
        xhr.send(data);
      }
 
   }
   reader.readAsDataURL(file);
}
/* ///   
$('#imguploader').bind('change', function() {
    var file = this.files[0]; //we can retrive the file array.
    // alert(file.type); if you want to check image type, uncomment this line. 
    // alert(file.size); if you want to check the image size, uncomment this line.   
 
   var reader = new FileReader();

    // file.target.result holds the DataURL which
    // can be used as a source of the image:  

    //imgpreview is the id of the img tag where you want to display the image  
    reader.onload = function(file){
        $('#imgpreview').attr('src',  file.target.result);
    };

    // Reading the file as a DataURL. When finished,
    // this will trigger the onload function above:  
    reader.readAsDataURL(file); 
}); */