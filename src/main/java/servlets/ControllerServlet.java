package servlets;

import utils.ErrorUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {
        if (request.getParameter("x") != null &&
                request.getParameter("y") != null &&
                request.getParameter("r") != null ) {

            try {
                request.getRequestDispatcher("/app/check").forward(request, response);
            } catch (Exception e) {
                ErrorUtil.sendError(response, 500, e.getMessage());
            }
            return;
        }
        request.getRequestDispatcher("/index.jsp").forward(request, response);
    }
}
