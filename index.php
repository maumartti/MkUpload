<?php

$img = $_POST['imgmiUp']; // Your data 'data:image/png;base64,AAAFBfj42Pj4';
$img = str_replace('data:image/jpeg;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
file_put_contents('image.jpg', $data);
?>

<html>
<head>
  <title>ubpload</title>
  <link href="bootstrap/css/bootstrap.css" rel="stylesheet" >
  <link href="fa/fa.css" rel="stylesheet" type="text/css">

  <script  type="text/javascript" src="js/jquery.js" ></script>
  <script  type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
  <script type="text/javascript" src="js/maurok.js"></script>
<style type="text/css">
.btn-file {
  position: relative;
  overflow: hidden;
}
.btn-file input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}
.btn-file, .btnIz, .btnDr, .btnCn{
  margin: 1px;
}
.canvas{
  border: 1px solid silver;
  background: #DADADA;
  width: 100%;
}
div.thumbnail .caption{
  padding: 4px;
  text-align: center;
}
.upImageWait {
  position: absolute;
  z-index: 100;
  font-size: 80px;
  width: 100%;
  padding-top: 20%;
  color: #FFF;
  text-align: center;
}
</style>
</head>
<body>
<div class="row">
  <div class="col-lg-12">
  <form action="" method="post" enctype="multipart/form-data">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
        
        <div id="miUp" class="Mkuploader" data-imgPrev="img.jpg" data-maxWidth="1000" data-format="image/jpeg"  ></div>
        
        <!-- In case of using two Mkuploader -->
        <!-- <div id="miUp2" class="Mkuploader" data-imgPrev="img2.jpg" data-maxWidth="1000" data-format="image/jpeg"  ></div> -->
      </div>
    
    <input type="submit" value="enviar">
  </form>
  </div>
</div>
<script type="text/javascript">


</script>
</body>
</html>
