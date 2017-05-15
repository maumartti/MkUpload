 $(document).ready(function(){
    upload = Array();
   $('.Mkuploader').each(function(index){
        dataName = $(this).attr('id');
        imgPrev  = $(this).attr('data-imgPrev');
        var codeHtml = '<div class="thumbnail">'+
            '<input type="hidden" id="imgPost'+dataName+'" value="'+imgPrev+'" />'+
            '<div class="upImageWait" style="display:none"><i class="fa fa-spin fa-spinner"></i></div>'+
            '<canvas id="canvas'+dataName+'" class="canvas" width="400" height="250" ></canvas>'+
            '<div class="caption">'+
                '<span class="btn btn-primary btn-file">'+
                '<i class="fa fa-upload"></i>'+
                '<input data-index="'+index+'" type="file" class="Inpfile" />'+
                '</span>'+
                '<button data-index="'+index+'" type="button" class="btnIz btn btn-warning" ><i class="fa fa-undo"></i></button>'+
                '<button data-index="'+index+'" type="button" class="btnDr btn btn-warning" ><i class="fa fa-repeat"></i></button>'+
                '<button data-index="'+index+'" type="button" class="btnCn btn btn-danger"><i class="fa fa-times"></i></button>'+
            '</div>'+
            '<div class="bloque">'+
                '<canvas id="canvas3'+dataName+'" style="display:none;"  ></canvas>'+
                '<canvas id="canvas2'+dataName+'" style="display:none;" ></canvas>'+
                '<input type="hidden" class="img" id="img'+dataName+'" name="img'+dataName+'" value="">'+
            '</div>'+
        '</div>';
        $('div #'+dataName).html(codeHtml);
        
        upload[index] = new Mkuploader('canvas'+dataName,'canvas2'+dataName,'canvas3'+dataName);
        upload[index].cargaImagePost('imgPost'+dataName);
        
    });

    $('.btnIz').click(function(){
        var i = $(this).attr('data-index');
        upload[i].rotaIz();
    }); 
    $('.btnDr').click(function(){
        var i = $(this).attr('data-index');
        upload[i].rotaDr();
    });  
    $('.btnCn').click(function(){
        var i = $(this).attr('data-index');
        upload[i].cancel();
    }); 
    $('.Inpfile').change(function(){
        var i = $(this).attr('data-index');
        upload[i].readURL(this);
    }); 
    $('form').each(function(){
        $(this).submit(function(){
            $('.Mkuploader').each(function(index){
                var xw = $(this).attr('data-maxWidth');
                var fm = $(this).attr('data-format');
                var id = 'img'+$(this).attr('id');
                upload[index].scalaSave(id,xw,fm);
                var inpt = document.getElementById(id);
                if(inpt.value == ''){
                    alert("Imagen requerida");
                    e.preventDefault();
                    $('button[type="submit"]').removeAttr('disabled');
                    $('button[type="submit"]').removeClass('disabled');
                }
            });
        });
    });
//uploader.scalaSave('imgMinWidth',1000,'image/jpeg'); formato

});




function Mkuploader(canvas,canvas2,canvas3){

var that = this;

var canvas = document.getElementById(canvas);
var ctx = canvas.getContext('2d');

var canvas2 = document.getElementById(canvas2);
var ctx3 = canvas2.getContext("2d");

var canvas3 = document.getElementById(canvas3);
var ctx4 = canvas3.getContext("2d");


var img = new Image();
var img3 = new Image();
var img4 = new Image();

var gradosRot = 0;

var imgWidth = 0;
var imgHeight = 0;

var marginX = 0;
var marginY = 0;

var rota = false;


this.rotaIz = function(){
    if(img4.src){
        gradosRot -=90;
        this.rotar(ctx4,canvas3,img4);
        this.cargaRotada(ctx,canvas3,canvas,img4);
    }   
}
this.rotaDr = function(){
    if(img4.src){
        gradosRot +=90;
        this.rotar(ctx4,canvas3,img4);
        this.cargaRotada(ctx,canvas3,canvas,img4);
    }    
}

this.cancel = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.restore();
    ctx3.clearRect(0,0,canvas2.width,canvas2.height);
    ctx3.save();
    ctx3.restore();
    ctx4.clearRect(0,0,canvas3.width,canvas3.height);
    ctx4.save();
    ctx4.restore();
}

this.rotateAndPaintImage = function( context, image, angleInRad , positionX, positionY, axisX, axisY, widthX, heightY ) {
  context.clearRect(0,0,context.width,context.height);
  context.save();
  context.translate( positionX, positionY );
  context.rotate( angleInRad );
  context.drawImage( image, axisX, axisY, widthX, heightY );
  context.rotate( -angleInRad );
  context.translate( -positionX, -positionY );
  context.restore();
}

this.rotar = function(context,canvas,image){
    var positionX=0; var positionY=0;
    var widthX = image.width; 
    var heightY = image.height;
    if(gradosRot == 360 || gradosRot == -360){gradosRot=0;}
    if(gradosRot== 90 || gradosRot== -270){
        positionX = image.height;
        canvas.width = image.height;
        canvas.height = image.width;
    }else if(gradosRot== 180 || gradosRot== -180){
        positionX=0;positionY=0;
        positionX = image.width;
        positionY = image.height;
        canvas.width = image.width;
        canvas.height = image.height;
    }else if(gradosRot== 270 || gradosRot== -90){
        positionY = image.width;
        canvas.width = image.height;
        canvas.height = image.width;
    }else if(gradosRot== 0){
        positionY = 0;
        positionX = 0;
        canvas.width = image.width;
        canvas.height = image.height;
    }
    var TO_RADIANS = Math.PI/180; 
    this.rotateAndPaintImage (context, image, gradosRot*TO_RADIANS, positionX, positionY, 0, 0, widthX, heightY);
}


this.cargaRotada = function(context,canvasGet,canvasSet,image){
    imgReset = new Image();
    image=imgReset;
    image.src = canvasGet.toDataURL();
    image.onload = function(){
        that.calculate(image);
        context.clearRect(0,0,canvasSet.width,canvasSet.height);
        context.save();
        context.translate(marginX, marginY);
        context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0,0, imgWidth, imgHeight);
        context.restore();
    }
}


this.scalaSave = function(inputID,setWidth,format){
    var imageMx = new Image();
    imageMx.src = img.src;
    if(img.src != ""){
        if(imageMx.width > setWidth){
            var scale = imageMx.width / imageMx.height;
            canvas2.width = setWidth;
            canvas2.height = setWidth / scale; 
            imageMx.width = setWidth;
            imageMx.height = setWidth / scale;
        }else{
            canvas2.width = imageMx.width;
            canvas2.height = imageMx.height;
        }
        if (gradosRot==0){
            ctx3.clearRect(0,0,canvas2.width,canvas2.height);
            ctx3.save();
            ctx3.drawImage(imageMx,0,0,imageMx.width,imageMx.height);
            ctx3.restore();
        }else{
            this.rotar(ctx3,canvas2,imageMx);
        }  
        document.getElementById(inputID).value = canvas2.toDataURL(format,0.8);
    }     
}


this.redimenciona = function(image){
    var scale=1;
    var scaleX=1;
    var scaleY=1;
    var imgWidth = image.width;
    var imgHeight = image.height;  
    var screenWidth  = canvas.width;
    var screenHeight = canvas.height;
    
    if (imgWidth >= screenWidth){
        scaleX =  imgWidth /screenWidth;
    }

    if (imgHeight >= screenHeight){
        scaleY = imgHeight / screenWidth;
    }

    scale = scaleY;

    if(scaleX > scaleY){//console.log('scale: '+scaleX);
        scale = scaleX;
    }   

    if(scale > 1){//console.log('scale: '+scale);
        imgWidth = imgWidth/scale; 
        imgHeight = imgHeight/scale;     
    }
    
    img4.width = imgWidth;
    img4.height = imgHeight;

}
 


this.calculate = function(image){ 
           
            marginX = 0;
            marginY = 0;

            var scale = 0;
            var scaleX = 1;
            var scaleY = 1;    

            imgWidth = image.width;
            imgHeight = image.height;  
            var screenWidth  = canvas.width;
            
            if (imgWidth >= screenWidth){
                scaleX = screenWidth / imgWidth;
            }else{
                 marginX = (screenWidth - image.width) / 2;
            }

            var screenHeight = canvas.height;
            
            if (imgHeight >= screenHeight){
                scaleY = screenHeight / imgHeight;
            }else{
                marginY = (screenHeight - image.height) / 2;
            }
             
            //console.log('1 - margX:'+marginX, 'margY:'+marginY);    
            scale = scaleY;//console.log('scaleY:'+scaleY);

            if(scaleX < scaleY){//console.log('1: y'+scaleY);
                scale = scaleX;
            }   

            if(scale < 1){//console.log('2: '+scale);
                imgHeight = imgHeight*scale;
                imgWidth = imgWidth*scale; 
                marginY = (screenHeight - imgHeight) / 2;  
                marginX = (screenWidth - imgWidth) / 2;       
            }

}

this.wait = function(canvas,i){
    if(i == true){
        var cont =  $(canvas).parent().width();
        $(canvas).prev('.upImageWait').width(cont);
        $(canvas).prev('.upImageWait').fadeIn(250);
    }else{
        $(canvas).prev('.upImageWait').fadeOut(250);
    }    
}

this.readURL = function(input) {
    if (input.files && input.files[0]) {
        this.wait(canvas,true);
        gradosRot=0;
        
        var reader = new FileReader();

        reader.onload = function (e) {
            img.onload = function(){   
            
            imgReset = new Image();
            img4 = imgReset;
            img4.src = img.src;
            that.redimenciona(img4);
            that.calculate(img);

            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.save();
            ctx.translate(marginX, marginY);
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0,0, imgWidth, imgHeight);
            ctx.restore();
            that.wait(canvas,false);
            }
    
            img.src = e.target.result;           
        }

        if(canvas.getContext){
            reader.readAsDataURL(input.files[0]);
        }else{
            alert('su navegador no soporta canvas')
        }
    }
}


/*funciones de pre imagen cargada por post*/
this.cargaImagePost = function(dataName){
    if($('#'+dataName).val()){
        img.src = $('#'+dataName).val();
        img.onload = function(){   
            
            imgReset = new Image();
            img4 = imgReset;
            img4.src = img.src;
            that.redimenciona(img4);
            that.calculate(img);

            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.save();
            ctx.translate(marginX, marginY);
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0,0, imgWidth, imgHeight);
            ctx.restore();
            that.wait(canvas,false);
            }
    }
}

}