<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/../vendor/autoload.php';

date_default_timezone_set('Pacific/Auckland');

//local site
if($_SERVER['SERVER_NAME'] == 'dhl.loc'){
    $config['displayErrorDetails'] = true;
    $config['db']['host']   = "localhost";
    $config['db']['user']   = "root";
    $config['db']['pass']   = "";
    $config['db']['dbname'] = "dhl";
}



$app = new \Slim\App(["settings" => $config]);
$container = $app->getContainer();

$container['view'] = new \Slim\Views\PhpRenderer("../templates/");

$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};


$app->get('/', function (Request $request, Response $response) {

    $tag_mapper = new TagMapper($this->db);
    $result = $tag_mapper->getBeachList();

    $response = $this->view->render($response, "index.phtml",array('result'=>$result));
    return $response;
});

$app->get('/tnc', function (Request $request, Response $response) {

    $tag_mapper = new TagMapper($this->db);
    $result = $tag_mapper->getBeachList();

    $response = $this->view->render($response, "tnc.phtml",array('result'=>$result));
    return $response;
});


$app->get('/testpost', function (Request $request, Response $response) {
    $tag_mapper = new TagMapper($this->db);
    $result = $tag_mapper->getBeachList();

    $response = $this->view->render($response, "test.phtml", array('result'=>$result));
    return $response;
});





$app->post('/addtag', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $tag_data = [];
    $tag_data['fname'] = filter_var($data['fname'], FILTER_SANITIZE_STRING);
    $tag_data['lname'] = filter_var($data['lname'], FILTER_SANITIZE_STRING);
    $tag_data['phone'] = filter_var($data['phone'], FILTER_SANITIZE_STRING);
    $tag_data['email'] = filter_var($data['email'], FILTER_SANITIZE_STRING);
    $tag_data['lat'] = filter_var($data['lat'], FILTER_SANITIZE_STRING);
    $tag_data['lng'] = filter_var($data['lng'], FILTER_SANITIZE_STRING);

    $tag_mapper = new TagMapper($this->db);
    $result = $tag_mapper->saveTag($tag_data);

    //$result = json_encode($tag_data);
    return $result;
    
    // $response = $response->withRedirect("/tickets");
    // return $response;
});

$app->post('/removetag',function (Request $request, Response $response) {
     $data = $request->getParsedBody();
     $id = filter_var($data['id'], FILTER_SANITIZE_STRING);
    $tag_mapper = new TagMapper($this->db);
    $result = $tag_mapper->removeTag($id);

    if($result){
        return true;
    }
     
    
    
    
});


$app->get('/gettag', function (Request $request, Response $response, $args){
    $mapper = new TagMapper($this->db);
    $result = $mapper->getTag();

});



$app->run();
