<?php
$cardImages = [];
foreach (glob('sets/*/img/*.{jpg,jpeg,png,gif}', GLOB_BRACE) as $file) {
    $cardImages[] = $file;
}
shuffle($cardImages);
header('Content-Type: application/json');
echo json_encode($cardImages);
?>
