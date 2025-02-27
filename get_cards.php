<?php
header("Access-Control-Allow-Origin: *"); // Allow all domains (or specify your GitHub Pages URL)
header("Content-Type: application/json");

$cardImages = [];
foreach (glob('sets/*/img/*.{jpg,jpeg,png,gif}', GLOB_BRACE) as $file) {
    $cardImages[] = $file;
}
shuffle($cardImages);
echo json_encode($cardImages);
?>
