<?php

// Se importa el autoload, clases y dependencias
require("vendor/autoload.php");
require("includes/Content.php");
use Nesk\Puphpeteer\Puppeteer;
use Nesk\Rialto\Data\JsFunction;
use KubAT\PhpSimple\HtmlDomParser;


// Se utilizan las dependencias para ejecutar la solictud get a la página https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html

$puppeteer = new Puppeteer;
$browser = $puppeteer->launch();

$page = $browser->newPage();
$url = 'https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html';
$page->goto($url);

//Se evalua que el contenido Javascript haya sido ejecutado y cargado en la página

$data = $page->evaluate(JsFunction::createWithBody('return document.documentElement.outerHTML'));
$dom = HtmlDomParser::str_get_html($data);
$browser->close();

// Se genera una nueva instancia de la clase registros

$content = new Content($data);
$result = $content->read_data();
header('Content-Type: application/json; charset=utf-8');
echo $result;
$dom->clear();