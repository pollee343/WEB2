package servlets;

import beans.Result;
import beans.ResultsBean;
import com.google.gson.Gson;
import utils.ErrorUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static utils.AreaChecker.isInArea;
import static utils.CoordinatesValidator.checkData;

@WebServlet("/app/check")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String xParam, yParam, rParam;

        try {
            xParam = request.getParameter("x");
            yParam = request.getParameter("y");
            rParam = request.getParameter("r");

            checkData(xParam, yParam, rParam);
        } catch (IllegalArgumentException e) {
            ErrorUtil.sendError(response, 422, e.getMessage());
            return;
        }

        double x = Double.parseDouble(xParam);
        double y = Double.parseDouble(yParam);
        double r = Double.parseDouble(rParam);

        boolean isHit = isInArea(x, y, r);


        Result result = new Result(x, y, r, isHit);


        ResultsBean resultsBean = (ResultsBean) request.getSession().getAttribute("resultsBean");
        if (resultsBean == null) {
            resultsBean = new ResultsBean();
            request.getSession().setAttribute("resultsBean", resultsBean);
        }

        resultsBean.addResult(result);

        response.setContentType("application/json");
        Gson gson = new Gson();
        response.getWriter().print(gson.toJson(result));
    }
}

