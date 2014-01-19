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
import javax.ws.rs.core.Response;
import pl.polsl.rainbow_coding.ejb.RoleFacade;
import pl.polsl.rainbow_coding.ejb.entities.Role;

/**
 *
 * @author mr_shelp
 */
@Stateless
@LocalBean
@Path("/roles")
@Produces(MediaType.APPLICATION_XML)
public class RoleResource {

    @EJB
    private RoleFacade facade;

    @GET
    public List<Role> get() {
        return facade.findAll();
    }

    @GET
    @Path("/{id}")
    public Role get(@PathParam("id") Long id) {
        return facade.find(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_XML)
    public Role insert(Role entity) {
        facade.create(entity);
        return entity;
    }

    @PUT
    @Consumes(MediaType.APPLICATION_XML)
    public Role update(Role entity) {
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
