<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifica se os parâmetros necessários foram enviados
    if (!isset($_POST['reference']) || !isset($_POST['amount'])) {
        http_response_code(400);
        echo "<p>Parâmetros ausentes.</p>";
        exit;
    }

    $reference = $_POST['reference'];
    $amount = floatval($_POST['amount']);

    try {
        $token = getGpoPurchaseToken($reference, $amount);
        header("Location: gpo-frame.php?token=" . urlencode($token));
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo "<p>Erro: " . htmlspecialchars($e->getMessage()) . "</p>";
    }
} else {
    http_response_code(405);
    echo "Método não permitido.";
}