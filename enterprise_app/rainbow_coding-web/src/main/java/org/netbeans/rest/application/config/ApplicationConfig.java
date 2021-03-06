/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.netbeans.rest.application.config;

import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 *
 * @author mr_shelp
 */
@ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        // following code can be used to customize Jersey 1.x JSON provider:
        try {
            Class jacksonProvider = Class.forName("org.codehaus.jackson.jaxrs.JacksonJsonProvider");
            resources.add(jacksonProvider);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, ex);
        }
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method. It is automatically
     * re-generated by NetBeans REST support to populate given list with all
     * resources defined in the project.
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(pl.polsl.rainbow_coding.web.resources.FileResource.class);
        resources.add(pl.polsl.rainbow_coding.web.resources.LanguageResource.class);
        resources.add(pl.polsl.rainbow_coding.web.resources.NoteResource.class);
        resources.add(pl.polsl.rainbow_coding.web.resources.OperatorResource.class);
        resources.add(pl.polsl.rainbow_coding.web.resources.ProjectResource.class);
        resources.add(pl.polsl.rainbow_coding.web.resources.RoleResource.class);
    }
}
