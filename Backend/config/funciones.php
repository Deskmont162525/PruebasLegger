<?php 


require __DIR__ . '/../config/BD.php'; 
 


function obtenerClientes()
{
    $pdo = BD::obtenerConexion();
   
    try {

        // Preparamos la consulta a la tabla.
        $stmt = $pdo->prepare("SELECT id, Nombre_del_cliente, Nit, Nombre_del_punto, Nombre_del_equipo, Ciudad, Promotor, RTC, Capitan, Fecha FROM clientes");
        $stmt->execute();
        // Almacenamos los resultados en un array asociativo.
        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // Devolvemos ese array asociativo como un string JSON.        
        return $resultados;
    } catch (PDOException $e) {
        $datos = array('status' => 'error', 'data' => $e->getMessage());
        return $datos;
    }
}

function insertDatosCliente($datos, $ip)
{
    $datos_insertados = "";
    $pdo = BD::obtenerConexion();
    try {

        $sql = "INSERT INTO clientes(Nombre_del_cliente, Nit, Nombre_del_punto, Nombre_del_equipo, Ciudad, Promotor, RTC, Capitan, Fecha, Ip) VALUES (:Nombre_del_cliente,:Nit, :Nombre_del_punto, :Nombre_del_equipo, :Ciudad, :Promotor, :RTC, :Capitan, :Fecha, :Ip)";

        $sentencia = $pdo->prepare($sql);

        $Nombre_del_cliente = $datos['Nombre_del_cliente']; 
        $Nit = $datos['Nit']; 
        $Nombre_del_punto = $datos['Nombre_del_punto'];
        $Nombre_del_equipo = $datos['Nombre_del_equipo']; 
        $Ciudad = $datos['Ciudad']; 
        $Promotor = $datos['Promotor'];
        $RTC = $datos['RTC']; 
        $Capitan = $datos['Capitan'];    
        $Fecha = date("Y/m/d");
        $ip1 = $ip;     
        
        
        $sentencia->bindParam(':Nombre_del_cliente', $Nombre_del_cliente, PDO::PARAM_STR); 
        $sentencia->bindParam(':Nit', $Nit, PDO::PARAM_STR); 
        $sentencia->bindParam(':Nombre_del_punto', $Nombre_del_punto, PDO::PARAM_STR); 
        $sentencia->bindParam(':Nombre_del_equipo', $Nombre_del_equipo, PDO::PARAM_STR);
        $sentencia->bindParam(':Ciudad', $Ciudad, PDO::PARAM_STR); 
        $sentencia->bindParam(':Promotor', $Promotor, PDO::PARAM_STR);
        $sentencia->bindParam(':RTC', $RTC, PDO::PARAM_INT); 
        $sentencia->bindParam(':Capitan', $Capitan, PDO::PARAM_STR); 
        $sentencia->bindParam(':Fecha', $Fecha, PDO::PARAM_STR);
        $sentencia->bindParam(':Ip', $ip1, PDO::PARAM_STR);
        
        

       $datos_insertados = $sentencia->execute();
       if($datos_insertados){
        $datos_insertados = "Creado con exito";
       }
    } catch (PDOException $ex) {
        print "ERROR" . $ex->getMessage();
    }

    return $datos_insertados;
}

?> 