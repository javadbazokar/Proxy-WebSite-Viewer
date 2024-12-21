<?php
class ProxyVisitor {
    private $dbFile;
    private $userAgents;
    private $ch;
    public function __construct($dbFile = 'database.json') {
        $this->dbFile = $dbFile;
        $this->userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 11; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36',
        ];
    }
    public function loadData() {
        if (file_exists($this->dbFile)) {
            return json_decode(file_get_contents($this->dbFile), true);
        }
        return [];
    }
    public function saveData($data) {
        file_put_contents($this->dbFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }
    public function visitUrl($proxy, $postUrl) {
        $this->ch = curl_init();
        curl_setopt_array($this->ch, [
            CURLOPT_URL => $postUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 120,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_PROXY => $proxy,
            CURLOPT_USERAGENT => $this->userAgents[array_rand($this->userAgents)],
        ]);
        $response = curl_exec($this->ch);
        $httpCode = curl_getinfo($this->ch, CURLINFO_HTTP_CODE);
        if (curl_errno($this->ch)) {
            return ['success' => false, 'message' => 'Invalid Proxy'];
        } elseif ($httpCode == 200) {
            $data = $this->loadData();
            if (strpos($response, '<html>') !== false || strpos($response, '<head>') !== false || strpos($response, '<body>') !== false) {
                file_put_contents('valid_proxies.txt', $proxy . PHP_EOL, FILE_APPEND);

                $data[$postUrl]['visits'] = isset($data[$postUrl]) ? $data[$postUrl]['visits'] + 1 : 1;
                $this->saveData($data);

                return ['success' => true, 'message' => 'Successful visit - HTML tag found', 'http_code' => $httpCode, 'response' => $response];
            } else {
                return ['success' => false, 'message' => 'Visit failed, no HTML tag found', 'http_code' => $httpCode, 'response' => $response];
            }
        } else {
            return ['success' => false, 'message' => 'Visit failed', 'http_code' => $httpCode];
        }
    }
    public function closeCurl() {
        curl_close($this->ch);
    }
}
?>
