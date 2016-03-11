<?php
header('cntent-type: application/json; charset=utf-8');
header('access-controll-allow-origin :*');

	require_once("conexion.php");

	//$datos = json_decode(file_get_contents("php://input"));
	//$id = $datos -> usuario;


  // $datos = explode('-',$_GET['datos']);

  //$id_chat = $datos[0];
  //$id = $datos[1];
  $datos = json_decode(file_get_contents("php://input"));
  $id_chat = $datos -> id_chat;
  $id= $datos -> usuario;


  $s="SELECT id,img
   FROM  persona
   WHERE user= '$id' or email = '$id'";

   $r = mysql_query($s);

   while ($rw = mysql_fetch_assoc($r)) {
      $id=$rw['id'];
      $img=$rw['img'];
   }

   $chat_total = array();
    $num=0;

   $sql =" SELECT c.id,c.fecha_hora,c.id_persona_s,p.nombre,p.img
         FROM persona p, chat c 
         WHERE c.id_persona_p='$id' and c.id_persona_s=p.id and c.id='$id_chat'
   ";
   $r = mysql_query($sql);


   while ($rw=mysql_fetch_assoc($r)) {

      $chat=array();
       $chat['id']=$rw['id'];
       $chat['name']=$rw['nombre'];
       $chat['face']=$rw['img'];
       $chat['face2']=$img;
       
       $sql =" SELECT d.*,t.nombre as tipo_mensaje
         FROM detalle_chat d, tipo_mensaje t
         WHERE d.id_chat ='$rw[id]' and t.id=d.id_tipo_mensaje";
         $rc=mysql_query($sql);
         
         $detalles_chat_completo=array();
         
         while ($rdc=mysql_fetch_assoc($rc)) {
            $detalles_chat=array();
            $detalles_chat['type']= $rdc['tipo_mensaje'];
            $detalles_chat['text']= $rdc['mensaje'];
            $detalles_chat['image']= $rdc['imagen'];
            $detalles_chat['time']= $rdc['fecha_hora'];
            $detalles_chat_completo[$rdc['id']]=$detalles_chat;

         }

         $chat['messages']=$detalles_chat_completo;
         $chat_total[]=$chat;
   }


   $sql =" SELECT c.id,c.fecha_hora,c.id_persona_p,p.nombre,p.img
         FROM persona p, chat c 
         WHERE c.id_persona_s='$id' and c.id_persona_p=p.id and c.id='$id_chat'
   ";
   $r = mysql_query($sql);


   while ($rw=mysql_fetch_assoc($r)) {

      $chat=array();
       $chat['id']=$rw['id'];
       $chat['name']=$rw['nombre'];
       $chat['face']=$rw['img'];
       $chat['face2']=$img;
       
       $sql =" SELECT d.*,t.nombre as tipo_mensaje
         FROM detalle_chat d, tipo_mensaje t
         WHERE d.id_chat ='$rw[id]' and t.id=d.id_tipo_mensaje";
         $rc=mysql_query($sql);
         
         $detalles_chat_completo=array();
         
         while ($rdc=mysql_fetch_assoc($rc)) {
            $detalles_chat=array();

            $tipo='sent';
            if ($rdc['tipo_mensaje']=='sent') {
               $tipo='received';
            }
            $detalles_chat['type']= $tipo;
            $detalles_chat['text']= $rdc['mensaje'];
            $detalles_chat['image']= $rdc['imagen'];
            $detalles_chat['time']= $rdc['fecha_hora'];
            $detalles_chat_completo[$rdc['id']]=$detalles_chat;

         }

         $chat['messages']=$detalles_chat_completo;
         $chat_total[]=$chat;
   }

sort($chat_total);
  


  

   echo json_encode($chat_total,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
   //echo print_r($chat);

   // echo json_encode($id);
	

?> 