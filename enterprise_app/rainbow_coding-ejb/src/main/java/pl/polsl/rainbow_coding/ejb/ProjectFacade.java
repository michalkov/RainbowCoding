/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.polsl.rainbow_coding.ejb;

import java.util.List;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import pl.polsl.rainbow_coding.ejb.entities.Project;

/**
 *
 * @author mr_shelp
 */
@Singleton
@LocalBean
@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
public class ProjectFacade extends AbstractFacade<Project> {

    @PersistenceContext(unitName = "rainbow_coding_pu")
    private EntityManager em;
    @EJB
    private OperatorFacade operatorFacade;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public ProjectFacade() {
        super(Project.class);
    }
    
    public List<Project> findByOperator(Object id)
    {
        return operatorFacade.find(id).getProjectList();
    }
}
