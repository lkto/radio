<?php

header('content-type:text/html;charset-UTF-8');
date_default_timezone_set('America/Bogota'); // zona horaria de colombia
setlocale(LC_ALL, "es_CO.utf8"); // configuracion regional a español

@$con = mysql_connect("localhost","root","") or die(mysql_error()); //conexion al servidor
mysql_select_db('radio'); // selecciono la base de datos
mysql_set_charset('utf8') ; // caracteres español



?>