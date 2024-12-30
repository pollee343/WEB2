<%@ page import="java.util.List" %>
<%@ page import="beans.Result" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>WEB Lab №2</title>
</head>
<body>
<header>Соколова Полина Дмитриевна<br>P3215<br>Вариант: 1337<br>С Новым Годом, спасибо, что посмотрели!!!<br></header>

<div class="container">
    <h2>Проверить точки</h2>

    <div class="graph-container">
        <canvas id="graphCanvas" width="250" height="250"></canvas>
    </div>
    <div>
        <span class="error" id="notRError"></span>
    </div>
    <div id="dataForm">
        <div class="form-group">
            <label>Выберите X:</label>
            <div class="radio-group">
                <label><input type="radio" name="x" value="-5">-5</label>
                <label><input type="radio" name="x" value="-4">-4</label>
                <label><input type="radio" name="x" value="-3">-3</label>
                <label><input type="radio" name="x" value="-2">-2</label>
                <label><input type="radio" name="x" value="-1">-1</label>
                <label><input type="radio" name="x" value="0">0</label>
                <label><input type="radio" name="x" value="1">1</label>
                <label><input type="radio" name="x" value="2">2</label>
                <label><input type="radio" name="x" value="3">3</label>
            </div>
            <span class="error" id="xError"></span>
        </div>

        <div class="form-group">
            <label for="y">Введите Y:</label>
            <input type="text" id="y" name="y" placeholder="Y∊[-5;5]">
            <span class="error" id="yError"></span>
        </div>


        <!-- должна ли быть возможность выбрать несколько checkbox,
        или наоборот лучше оставить "отмену" предыдущего выбора при нажатии на другой checkbox -->
        <div class="form-group">
            <label>Выберите R:</label>
            <div class="checkbox-group">
                <label>
                    <input type="checkbox" name="r" value="1" onclick="updateHiddenCheckbox(this)">1
                    <input type="checkbox" name="r" value="1.5" onclick="updateHiddenCheckbox(this)">1.5
                    <input type="checkbox" name="r" value="2" onclick="updateHiddenCheckbox(this)">2
                    <input type="checkbox" name="r" value="2.5" onclick="updateHiddenCheckbox(this)">2.5
                    <input type="checkbox" name="r" value="3" onclick="updateHiddenCheckbox(this)">3
                </label>
            </div>
            <span class="error" id="rError"></span>
        </div>

        <div class="form-group">
            <button id="check-btn" class="check-button">Проверить</button>
        </div>

        <!-- такой переход на страницу результатов это ок? -->
        <a href="${pageContext.request.contextPath}/result.jsp">Посмотреть таблицу результатов</a>
    </div>



    <!-- Оставить таблицу результатов только при переходе по ссылке? -->
    <h3>Таблица результатов</h3>
    <table id="resultsTable">
        <thead>
        <tr><th>X</th><th>Y</th><th>R</th><th>Результат</th><th>Время</th></tr>
        </thead>
        <tbody>
        <%

            beans.ResultsBean resultsBean = (beans.ResultsBean) session.getAttribute("resultsBean");

            if (resultsBean != null && !resultsBean.getResults().isEmpty()) {
                for (Result point : resultsBean.getResults()) {
        %>
        <tr>
            <td><%= point.getX() %></td>
            <td><%= point.getY() %></td>
            <td><%= point.getR() %></td>
            <td><%= point.isHit() ? "Попадание" : "Промах" %></td>
            <td><%= new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date(point.getTimestamp() * 1000)) %></td>
        </tr>
        <%
            }
        } else {
        %>
        <tr>
            <td colspan="5">Проверок еще не было</td>
        </tr>
        <%
            }
        %>
        </tbody>
    </table>
</div>
<script>
    function updateHiddenCheckbox(checkbox) {
        const checkboxes = document.querySelectorAll('input[name="r"]');
        checkboxes.forEach(cb => {
            if (cb !== checkbox) {
                cb.checked = false;
            }
        });
    }
</script>
<script src="script.js"></script>
</body>
</html>
