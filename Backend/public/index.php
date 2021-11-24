<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;


require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../config/constantes.php'; 
require __DIR__ . '/../config/funciones.php';
require __DIR__ .'/../config/cors.php';

define("DIRECTORIO_RAIZ", __DIR__);
define("DIRECTORIO_APLICACION", DIRECTORIO_RAIZ . "/");

$app = AppFactory::create();
$app->setBasePath('/pruebaLeggerphp/Backend/public');

 
$app->get('/all', function (Request $request, Response $response, $args) {

    $clientes = obtenerClientes();
    $response->getBody()->write(json_encode($clientes));
    return $response->withAddedHeader('Content-Type', 'application/json');
});

$app->post('/crear', function (Request $request, Response $response, $args) {

    $ip = getenv('REMOTE_ADDR');
    $data = $request->getParsedBody();
    $respu = insertDatosCliente($data, $ip);
    $response->getBody()->write($respu);
    return $response->withAddedHeader('Content-Type', 'application/json');
});

 
$app->run();