<?php
function myautoload($classname){  //
    $folders = [
        "class/",
        "class/models/",
        "class/repositories/"
    ];

    foreach($folders as $folder){
        $file = $folder.$classname.".php";
        if(file_exists($file)){
            require $file;
            return;
        }
    }
}

spl_autoload_register("myautoload");
?>