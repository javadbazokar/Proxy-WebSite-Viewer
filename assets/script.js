let successCount = 0;
let errorCount = 0;
let totalRequests = 0;
let totalProxies = 0;
let currentVisits = 0;
let visitLimit = 0;
const parallelRequests = 100;
let stopProcess = false;
let soundActivated = false;
const successSound = new Audio('assets/success.mp3');
successSound.preload = 'auto';
successSound.volume = 0.8;

function startVisits() {
    const targetUrl = document.getElementById('targetUrl').value;
    const visitInput = document.getElementById('visitLimit').value;
    if (!targetUrl) {
        alert("Please enter the target URL.");
        return;
    }
    visitLimit = parseInt(visitInput, 10);
    currentVisits = 0;
    const fileInput = document.getElementById('proxyFile');
    const successCounter = document.getElementById('successCount');
    const errorCounter = document.getElementById('errorCount');
    const totalRequestsCounter = document.getElementById('totalRequests');
    const totalProxiesCounter = document.getElementById('totalProxies');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    successCount = 0;
    errorCount = 0;
    totalRequests = 0;
    totalProxies = 0;
    stopProcess = false;
    successCounter.textContent = successCount;
    errorCounter.textContent = errorCount;
    totalRequestsCounter.textContent = totalRequests;
    startButton.classList.add('d-none');
    stopButton.classList.remove('d-none');
    loadingSpinner.classList.remove('d-none');
    if (!fileInput.files.length) {
        resetButtons();
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        const proxies = event.target.result.split('\n').map(p => p.trim()).filter(p => p !== '');
        totalProxies = proxies.length;
        totalProxiesCounter.textContent = totalProxies;

        if (proxies.length === 0) {
            resetButtons();
            return;
        }
        processProxies(proxies, targetUrl);
    };
    reader.readAsText(fileInput.files[0]);
}

function processProxies(proxies, targetUrl) {
    let index = 0;
    function handleBatch() {
        if (stopProcess || currentVisits >= visitLimit) {
            resetButtons();
            return;
        }
        const batch = proxies.slice(index, index + parallelRequests);
        index += parallelRequests;
        const requests = batch.map(proxy => sendProxy(proxy, targetUrl));
        Promise.all(requests).then(() => {
            if (index < proxies.length) {
                handleBatch();
            } else {
                resetButtons();
            }
        });
    }

    handleBatch();
}

function sendProxy(proxy, targetUrl) {
    if (currentVisits >= visitLimit) {
        stopVisits();
        return Promise.resolve();
    }

    const formData = new FormData();
    formData.append('proxy', proxy);
    formData.append('url', targetUrl);

    totalRequests++;
    document.getElementById('totalRequests').textContent = totalRequests;

    return fetch('assets/Api.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                successCount++;
                document.getElementById('successCount').textContent = successCount;
                currentVisits++;
                successSound.play();
            } else {
                errorCount++;
                document.getElementById('errorCount').textContent = errorCount;
            }
        })
        .catch(error => {
            errorCount++;
            document.getElementById('errorCount').textContent = errorCount;
        });
}

function stopVisits() {
    stopProcess = true;
}

function resetButtons() {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    startButton.classList.remove('d-none');
    stopButton.classList.add('d-none');
    loadingSpinner.classList.add('d-none');
}
function validateVisitLimit() {
    const visitLimitInput = document.getElementById('visitLimit');
    const errorMessage = document.getElementById('visitLimitError');
    const visitLimit = parseInt(visitLimitInput.value, 10);

    if (visitLimit % 100 !== 0) {
        errorMessage.classList.remove('d-none');
        visitLimitInput.classList.add('is-invalid');
    } else {
        errorMessage.classList.add('d-none');
        visitLimitInput.classList.remove('is-invalid');
    }
}
