<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="beans.Result" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Results</title>
    <link href="${pageContext.request.contextPath}/style.css" rel="stylesheet">
</head>
<body>
<header>Соколова Полина Дмитриевна.<br>P3215<br>Вариант: 1337</header>

<div class="container">

    <h2>Таблица результатов</h2>

    <table id="resultsTable">
        <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Результат</th>
            <th>Время</th>
        </tr>
        </thead>
        <tbody>
        <%
            beans.ResultsBean resultsBean = (beans.ResultsBean) session.getAttribute("resultsBean");

            if (resultsBean != null && !resultsBean.getResults().isEmpty()) {
                for (Result point : resultsBean.getResults()) {
        %>
        <tr>
            <td><%= point.getX() %>
            </td>
            <td><%= point.getY() %>
            </td>
            <td><%= point.getR() %>
            </td>
            <td><%= point.isHit() ? "Попадание" : "Промах" %>
            </td>
            <td><%= new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date(point.getTimestamp() * 1000)) %>
            </td>
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

    <div class="form-group">
        <input type="button" class="check-button" onclick="location.href='${pageContext.request.contextPath}';"
               value="Вернуться">
    </div>
</div>
</body>
</html>
