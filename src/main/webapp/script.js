function getCurrentRValue() {
    const rInput = document.querySelector('input[name="r"]:checked');
    return rInput ? parseFloat(rInput.value) : null;
}

function getCurrentXValue() {
    const xInput = document.querySelector('input[name="x"]:checked');
    return xInput ? parseFloat(xInput.value) : null;
}

document.getElementById('check-btn').addEventListener('click', () => {
    document.getElementById("yError").textContent = "";
    document.getElementById("xError").textContent = "";
    document.getElementById("rError").textContent = "";
    document.getElementById("notRError").textContent = "";

    const yValue = parseFloat(document.getElementById("y").value.replace(',', '.'));
    const rValue = getCurrentRValue();
    const xValue = getCurrentXValue();

    let isValid = true;

    if (isNaN(yValue) || yValue < -5 || yValue > 5) {
        document.getElementById("yError").textContent = "Введите корректное значение Y∊[-5;5]";
        isValid = false;
    }

    if (xValue === null || xValue < -5 || xValue > 3) {
        document.getElementById("xError").textContent = "Укажите корректное значение X∊[-5;3]";
        isValid = false;
    }

    if (isNaN(rValue) || rValue < 1 || rValue > 3) {
        document.getElementById("rError").textContent = "Укажите корректное значение R∊[1;3]";
        isValid = false;
    }

    if (isValid) {
        fetch(`app?x=${xValue}&y=${yValue}&r=${rValue}`, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    console.log(`Server error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                drawPoint(xValue, yValue, data.hit);
                addResultToTable(data);
            });
    }
});

const graphCanvas = document.querySelector('#graphCanvas');
const context = graphCanvas.getContext('2d');
const range = 11;

function renderGraph() {
    context.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

    const radius = getCurrentRValue();
    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;
    const scale = graphCanvas.width / range;

    drawCoordinateAxes(scale);
    drawMarkers(scale);

    if (!radius) return;

    context.fillStyle = 'rgba(255,0,234,0.89)';

    context.beginPath();
    context.arc(centerX, centerY, scale * radius / 2, Math.PI, 1.5 * Math.PI, false);
    context.lineTo(centerX, centerY);
    context.closePath();
    context.fill();

    context.fillRect(centerX, centerY, scale * radius / 2, scale * radius);


    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX, centerY - scale * radius);
    context.lineTo(centerX + scale * radius / 2, centerY);
    context.closePath();
    context.fill();
}

function drawCoordinateAxes(scale) {
    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;

    context.strokeStyle = '#fff';
    context.lineWidth = 1.5;


    context.beginPath();
    context.moveTo(0, centerY);
    context.lineTo(graphCanvas.width, centerY);
    context.moveTo(centerX, 0);
    context.lineTo(centerX, graphCanvas.height);
    context.stroke();


    context.beginPath();
    context.moveTo(graphCanvas.width - 10, centerY - 5);
    context.lineTo(graphCanvas.width, centerY);
    context.lineTo(graphCanvas.width - 10, centerY + 5);
    context.moveTo(centerX - 5, 10);
    context.lineTo(centerX, 0);
    context.lineTo(centerX + 5, 10);
    context.stroke();
}

function drawMarkers(scale) {
    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;

    context.fillStyle = '#fff';
    context.font = '12px Arial';

    for (let i = -5; i <= 5; i++) {
        if (i !== 0) {
            const x = centerX + i * scale;
            context.beginPath();
            context.moveTo(x, centerY - 5);
            context.lineTo(x, centerY + 5);
            context.stroke();
            context.textAlign = i === -5 ? 'left' : i === 5 ? 'right' : 'center';
            context.fillText(i.toString(), x, centerY + 15);

            const y = centerY - i * scale;
            context.beginPath();
            context.moveTo(centerX - 5, y);
            context.lineTo(centerX + 5, y);
            context.stroke();
            context.textBaseline = i === 5 ? 'top' : i === -5 ? 'bottom' : 'middle';
            context.fillText(i.toString(), centerX + 15, y);
        }
    }
}

function drawPoint(x, y, isWithin) {
    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;
    const scale = graphCanvas.width / range;

    const pixelX = centerX + x * scale;
    const pixelY = centerY - y * scale;

    context.fillStyle = isWithin ? 'green' : 'red';
    context.beginPath();
    context.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
    context.fill();
}

function renderAllPoints() {
    const tableRows = document.querySelector('#resultsTable tbody').rows;
    const selectedRadius = getCurrentRValue();
    if (!selectedRadius) return;

    Array.from(tableRows).forEach(row => {
        const x = parseFloat(row.cells[0].innerText);
        const y = parseFloat(row.cells[1].innerText);
        const r = parseFloat(row.cells[2].innerText);
        const isHit = row.cells[3].innerText === 'Попадание';

        if (selectedRadius === r) drawPoint(x, y, isHit);
    });
}

graphCanvas.addEventListener('click', event => {
    const errorElements = ['yError', 'xError', 'rError', 'notRError'];
    errorElements.forEach(id => document.getElementById(id).textContent = '');

    const radius = getCurrentRValue();
    if (!radius) {
        document.getElementById('notRError').textContent = 'Выберите значение R перед взаимодействием с графиком';
        return;
    }

    const rect = graphCanvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const centerX = graphCanvas.width / 2;
    const centerY = graphCanvas.height / 2;
    const scale = graphCanvas.width / range;

    const graphX = Math.round((clickX - centerX) / scale);
    const graphY = (centerY - clickY) / scale;

    fetch(`app?x=${graphX}&y=${graphY.toFixed(2)}&r=${radius}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            drawPoint(graphX, graphY, data.hit);
            addResultToTable(data);
        });
});

function addResultToTable(result) {
    const tbody = document.querySelector('#resultsTable tbody');
    const row = tbody.insertRow(0);

    row.insertCell(0).textContent = Math.round(result.x);
    row.insertCell(1).textContent = result.y.toFixed(2);
    row.insertCell(2).textContent = result.r.toFixed(1);
    row.insertCell(3).textContent = result.hit ? 'Попадание' : 'Промах';
    row.insertCell(4).textContent = new Date(result.timestamp * 1000).toLocaleString();
}

function adjustCanvas() {
    graphCanvas.width = graphCanvas.offsetWidth;
    graphCanvas.height = graphCanvas.offsetHeight;
    console.log(`Canvas resized to: ${graphCanvas.width}x${graphCanvas.height}`);
    renderGraph();
    renderAllPoints();
}

document.querySelectorAll('input[name="r"]').forEach(input => {
    input.addEventListener('click', () => {
        renderGraph();
        renderAllPoints();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    adjustCanvas();
});
