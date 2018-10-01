window.onload = function () {
    var canvas = document.getElementById('canvas');
    var canvas2;
    var buttonDownload = document.getElementById('download');
    var context = canvas.getContext('2d');
    var dragging = false;
    var inputSelected = null;
    var movetoX = null;
    var movetoY = null;
    var snapShot = null;
    var divide = null;
    var screens = null;
    //selected function
    $('label').on('click', function(){
        $('label').removeClass('selected');
        $(this).addClass('selected');
        inputSelected = $('#'+$(this).attr('for')).val();
        console.log(inputSelected);
        if(inputSelected == 'cryon'){
          $('.canvass').css('cursor','url(images/cryon.png),auto');
        }
        else if(inputSelected == 'line' || inputSelected == 'rec' || inputSelected == 'circle'){
          $('.canvass').css('cursor','cell');
        }
        else if(inputSelected == 'rubber'){
          $('.canvass').css('cursor','url(images/rubber.png),auto');
        }
        else{
          $('.canvass').css('cursor','default');
        }
    });
    ////////////////
    canvas.width = window.innerWidth - 18;
    canvas.height = window.innerHeight;
        var engage = function(e){
            if (inputSelected == 'cryon'){
                dragging = true;
            }
            else if(inputSelected == 'line'){
                dragging = true;
                engageX = e.offsetX;
                engageY = e.offsetY;
                snapShot = context.getImageData(0,0,canvas.width , canvas.height);
            }
            else if(inputSelected == 'rec'){
                dragging = true;
                engageX = e.offsetX;
                engageY = e.offsetY;
                snapShot = context.getImageData(0,0,canvas.width , canvas.height);
            }
            else if(inputSelected == 'circle'){
                dragging = true;
                engageX = e.offsetX;
                engageY = e.offsetY;
                mouseX= e.offsetX;
                snapShot = context.getImageData(0,0,canvas.width , canvas.height);
            }
            else if (inputSelected == 'rubber') {
              dragging = true;
            }
        }
        var disengage = function(e){
              if (inputSelected == 'circle') {
                var fillOrStroke = $('#circleValue').val();
                dragging = false;
                engageX = e.offsetX;
                mouseY= e.offsetY;
                var width=mouseX-engageX;
                if(width<0){
                  width = -width;
                }
                context.lineWidth = $('#thickness').val();
                context.arc(mouseX, mouseY, width, 0, 2 * Math.PI, false);
                if(fillOrStroke == "fill"){
                    context.fillStyle = $('#color').val();
                    context.fill();
                }
                else if (fillOrStroke == "stroke") {
                    context.stroke();
                }
                context.beginPath();
              }
              else{
                dragging = false;
                context.beginPath();
              }
              if (divide == "divide") {
                    var destCtx = canvas2.getContext('2d');
                    destCtx.drawImage(canvas, 0, 0);

                    var destCtx2 = canvas.getContext('2d');
                    destCtx2.drawImage(canvas2, 0, 0);
              }
        }
        var draw = function(e){
            if(dragging){
              context.strokeStyle = $('#color').val();
              if (inputSelected == 'cryon'){
                  context.lineWidth = $('#thickness').val();
                  context.lineTo(e.offsetX,e.offsetY);
                  context.stroke();
                  context.beginPath();
                  context.moveTo(e.offsetX,e.offsetY);
                }
              else if (inputSelected == 'line') {
                  context.lineWidth = $('#thickness').val();
                  context.putImageData(snapShot,0,0);
                  context.beginPath();
                  context.moveTo(engageX,engageY);
                  context.lineTo(e.offsetX,e.offsetY);
                  context.stroke();
              }
              else if (inputSelected == 'rec') {
                  context.lineWidth = $('#thickness').val();
                  var fillOrStroke = $('#recValue').val();
                  context.putImageData(snapShot,0,0);
                  mouseX= e.offsetX;
                  mouseY= e.offsetY;
                  var width=mouseX-engageX;
                  var height=mouseY-engageY;
                  if(fillOrStroke == "fill"){
                      context.fillStyle = $('#color').val();
                      context.fillRect(engageX,engageY,width,height);
                  }
                  else if (fillOrStroke == "stroke") {
                      context.strokeRect(engageX,engageY,width,height);
                  }
              }
              else if (inputSelected == 'rubber'){
                  context.strokeStyle= "#FFFFFF";
                  context.lineWidth = $('#thickness').val();
                  context.lineTo(e.offsetX,e.offsetY);
                  context.stroke();
                  context.beginPath();
                  context.moveTo(e.offsetX,e.offsetY);
                }
              if (divide == "divide") {
                  if (inputSelected == 'cryon') {
                          var destCtx = canvas.getContext('2d');
                          destCtx.drawImage(canvas2, 0, 0);

                          var destCtx2 = canvas2.getContext('2d');
                          destCtx2.drawImage(canvas, 0, 0);
                    }
                    if (inputSelected == 'rubber') {
                      var destCtx = canvas2.getContext('2d');
                      destCtx.drawImage(canvas1, 0, 0);
                    }
                }
            }
        }
        var download = function(){
            var td = canvas.toDataURL();
            this.href = td;
        }
    canvas.addEventListener('mousedown', engage);
    canvas.addEventListener('mouseup', disengage);
    canvas.addEventListener('mousemove', draw);
    buttonDownload.addEventListener('click', download);

    $("#file_input").change(function(e){
        var URL =  window.URL;
        var url = URL.createObjectURL(e.target.files[0]);
        var img = new Image();
        img.src = url;
        img.onload = function() {
              img_width = img.width;
              img_height = img.height;
              if (img_width > 400) {
                  img_width = 400;
              }
              if (img_height > 400) {
                  img_height = 400;
              }

              context.drawImage(img, 700, 20, img_width, img_height);
    }
  });
  $("#divide").on('click',function(){
      $('.screen').slideDown();
      $(".canvass").append("<canvas id='canvas2' class='canvas2'></canvas>");
      $('#canvas').css('border-bottom', '3px solid grey');
      canvas.width = window.innerWidth - 18;
      canvas.height = window.innerHeight / 2;
      divide = $('#divide').val();
      canvas2 = document.getElementById('canvas2');
      canvas2.width = window.innerWidth - 18;
      canvas2.height = window.innerHeight / 2;
      canvas2.addEventListener('mousedown', engage);
      canvas2.addEventListener('mouseup', disengage);
      canvas2.addEventListener('mousemove', draw);
  });
}
