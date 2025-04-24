<?php
define('GPO_FRAME_TOKEN', 'a53787fd-b49e-4469-a6ab-fa6acf19db48');
define('GPO_API_URL', 'https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frameToken');
define('GPO_CSS_URL', 'https://pagamentonline.emis.co.ao/gpoconfig/qr_code_mobile_v2.css');

function getGpoPurchaseToken(string $reference, float $amount): string {
    $payload = [
        'reference'   => $reference,
        'amount'      => number_format($amount, 2, '.', ''),
        'token'       => GPO_FRAME_TOKEN,
        'mobile'      => 'AUTHORIZATION',
        'card'        => 'AUTHORIZATION',
        'qrCode'        => 'PAYMENT',
        'callbackUrl' => 'https://deve.angohost.net/gpo/gpo-callback.php',
        'cssUrl'      => GPO_CSS_URL
    ];

    $ch = curl_init(GPO_API_URL);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS     => json_encode($payload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
    ]);

    $raw = curl_exec($ch);
    if (curl_errno($ch)) {
        throw new Exception('cURL error: '.curl_error($ch));
    }
    curl_close($ch);

    $resp = json_decode($raw, true);
    if (!isset($resp['id'])) {
        throw new Exception('GPO error: ' . $raw);
    }

    return $resp['id'];
}