/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.polsl.rainbow_coding.web.servlets;

import java.io.IOException;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author mr_shelp
 */
public class LogoutServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    public static final Logger logger = Logger.getLogger("pl.polsl.rainbow_coding.logger");

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        response.setContentType("text/html;charset=UTF-8");
        request.logout();
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        logger.info(String.format("User logged out [%s]", session != null ? session.getId() : "null"));
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "This resource destroys user session in RainbowCoding system.";
    }
}
