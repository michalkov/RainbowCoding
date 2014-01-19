/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.polsl.rainbow_coding.web.servlets;

import java.io.IOException;
import java.util.Date;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import pl.polsl.rainbow_coding.ejb.OperatorFacade;
import pl.polsl.rainbow_coding.ejb.entities.Operator;

/**
 *
 * @author mr_shelp
 */
public class LoginServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    public static final Logger logger = Logger.getLogger("pl.polsl.rainbow_coding.logger");
    @EJB
    private OperatorFacade operatorFacade;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("text/html;charset=UTF-8");
        try {
            request.login(request.getParameter("username"), request.getParameter("password"));
            if (request.getUserPrincipal() == null) {
                authorizationFailed(request, response);
            } else {
                HttpSession session = request.getSession(true);
                Operator operator = operatorFacade.getFromPrincipal();
                if (operator == null) {
                    throw new ServletException("Can't find operator for login " + request.getParameter("username"));
                }
                session.setAttribute("user", operator);
                logger.info(String.format("Operator %s logged in [%s, %s]", operator.getLogin(), new Date(), session.getId()));
            }
        } catch (ServletException ex) {
            if (!ex.getMessage().equals("Attempt to re-login while the user identity already exists")) {
                authorizationFailed(request, response);
            }
        }
    }

    private void authorizationFailed(HttpServletRequest request, HttpServletResponse response) {
        StringBuilder logMessage = new StringBuilder("authorization failed for username ");
        logMessage.append(request.getParameter("username") == null ? "null" : request.getParameter("username"));
        logger.info(logMessage.toString());
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setHeader("login_url", getServletContext().getContextPath());
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
        return "This resource authorizes RainbowCoding API users";
    }
}
