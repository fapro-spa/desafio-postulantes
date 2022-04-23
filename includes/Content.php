<?php


require("vendor/autoload.php");
use KubAT\PhpSimple\HtmlDomParser;

Class Content {
    // Se otorga a la clase "Content" los atributos que tendrá por defecto 
    
    public $title = '';
    public $description = '';
    public $last_update = '';
    public $records = [];
    

    //Se construye la instancia con la información otorgada

    public function __construct($data)
    {
        $this->data = $data;
    }
    

    //Se lee la información para luego ser procesada y returnar el resultado obtenido

    public function read_data(){
        $this->data = HtmlDomParser::str_get_html($this->data);
        $result = self::process_data($this->data);
        $this->title = $result->title;
        $this->description = $result->description;
        $this->last_update = $result->last_update;
        $this->records = $result->records;
        return json_encode($result, JSON_UNESCAPED_UNICODE, JSON_PRETTY_PRINT);
        
    }

    //Se procesa la información

    public static function process_data($dom){
        $data = new stdClass();
        foreach ($dom->find('div.contenido') as $element) {

            $data->title = trim($element->find('h2.title')[0]->plaintext);
            $data->description = trim($element->find('p')[1]->plaintext);
            $data->last_update = trim(explode(':', $element->find('div#fechaActualizacion')[0]->plaintext)[1]);
            $data->records = [];
            $table_records = $element->find('tbody > tr');
            foreach ($table_records as $record) {
                $cell_data = new stdClass;
                foreach ($record->find('td') as $index => $cell) {
                    switch ($index) {
                        case 0:
                            $type =  'id';
                            break;
                        case 1:
                            $type =  'razon_social';
                            break;
                        case 2:
                            $type =  'pais';
                            break;
                        case 3:
                            $type =  'datos_inscripcion';
                            break;
                        case 4:
                            $type =  'vigencia';
                            break;
                        case 5:
                            $type =  'ultima_actualizacion';
                            break;
                        case 6:
                            $type =  'estado';
                            break;
                    }

                    $cell_data->$type = $cell->plaintext;
                }
                $data->records[] = $cell_data;
            }
        }
        return $data;
    }


}