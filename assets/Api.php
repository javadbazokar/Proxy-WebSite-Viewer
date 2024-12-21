<?php
require_once 'class.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['proxy'], $_POST['url'])) {
    $proxy = trim($_POST['proxy']);
    $postUrl = trim($_POST['url']);
    $proxyVisitor = new ProxyVisitor();
    $result = $proxyVisitor->visitUrl($proxy, $postUrl);
    echo json_encode($result);
    sleep(rand(2, 5));
    $proxyVisitor->closeCurl();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
}
?>
