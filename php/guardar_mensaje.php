<?php 
header('cntent-type: application/json; charset=utf-8');
header('access-controll-allow-origin :*');

	require_once("conexion.php");

	  $datos = json_decode(file_get_contents("php://input"));
      $id_chat = $datos -> id_chat;
      $message= $datos -> message;
      $id= $datos -> usuario;

   $s="SELECT id
   FROM  persona
   WHERE user= '$id' or email = '$id'";

   $r = mysql_query($s);

   while ($rw = mysql_fetch_assoc($r)) {
      $id_persona=$rw['id'];
   }

   
   $sql="SELECT * FROM chat WHERE id='$id_chat' and id_persona_p='$id_persona'";
   $r=mysql_query($sql);

   if (mysql_num_rows($r)>0) {
   	$tipo=1;
   	$nom_tipo = "sent";
   }else
   {
   	$tipo=2;
   	$nom_tipo = "received";
   }

   $sql="INSERT INTO detalle_chat (id_chat,mensaje,id_tipo_mensaje,imagen) 
   VALUES('$id_chat','$message','$tipo','')";

   $prueba = array();
   $prueba['mensaje'] = $message;
   $prueba['id_chat'] = $id_chat;
   $prueba['tipo'] = $nom_tipo;

   mysql_query($sql);

   echo json_encode($prueba,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
 ?>