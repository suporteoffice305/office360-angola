<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $reference = $_POST['reference'];
    $amount = floatval($_POST['amount']);

    try {
        $token = getGpoPurchaseToken($reference, $amount);
        header("Location: gpo-frame.php?token=" . urlencode($token));
        exit;
    } catch (Exception $e) {
        echo "<p>Erro: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
} else {
    http_response_code(405);
    echo "Método não permitido.";
}