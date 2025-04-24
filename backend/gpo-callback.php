<?php
file_put_contents("gpo_callback_log.txt", date('Y-m-d H:i:s') . " - Dados recebidos:\n" . file_get_contents('php://input') . "\n\n", FILE_APPEND);
http_response_code(200);
echo 'OK';