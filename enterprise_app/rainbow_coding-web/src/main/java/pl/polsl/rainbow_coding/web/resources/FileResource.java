/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.polsl.rainbow_coding.web.resources;

import java.util.List;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import pl.polsl.rainbow_coding.ejb.FileFacade;
import pl.polsl.rainbow_coding.ejb.entities.File;

/**
 *
 * @author mr_shelp
 */
@Stateless
@LocalBean
@Path("/files")
@Produces(MediaType.APPLICATION_XML)
public class FileResource {

    @EJB
    private FileFacade facade;

    @GET
    public List<File> get() {
        return facade.findAll();
    }

    @GET
    @Path("/{id}")
    public File get(@PathParam("id") Long id) {
        return facade.find(id);
    }
    
    @GET
    @Path("/by_language/{id}")
    public List<File> getByLanguage(@PathParam("id") Long id) {
        return facade.findByLanguage(id);
    }
    
    @GET
    @Path("/by_project/{id}")
    public List<File> getByProject(@PathParam("id") Long id) {
        return facade.findByProject(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_XML)
    public File insert(File entity) {
        facade.create(entity);
        return entity;
    }

    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public File update(File entity) {
        facade.edit(entity);
        return entity;
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        facade.remove(facade.find(id));
        return Response.ok().type(MediaType.APPLICATION_XML).build();
    }
}
