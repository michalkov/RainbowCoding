/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.polsl.rainbow_coding.resources;

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
import pl.polsl.rainbow_coding.ejb.NoteFacade;
import pl.polsl.rainbow_coding.ejb.entities.Note;

/**
 *
 * @author mr_shelp
 */
@Stateless
@LocalBean
@Path("/notes")
public class NoteResource {

    @EJB
    private NoteFacade facade;
    
    @GET
    @Produces(MediaType.APPLICATION_XML)
    public List<Note> get()
    {
        return facade.findAll();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_XML)
    public Note get(@PathParam("id") Long id)
    {
        return facade.find(id);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    public void insert(Note entity)
    {
        facade.create(entity);
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public void update(Note entity)
    {
        facade.edit(entity);
    }
    
    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_XML)
    public void delete(@PathParam("id") Long id)
    {
        facade.remove(facade.find(id));
    }
}
