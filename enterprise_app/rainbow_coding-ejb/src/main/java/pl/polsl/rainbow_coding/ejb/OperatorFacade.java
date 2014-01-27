/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.polsl.rainbow_coding.ejb;

import java.util.List;
import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.SessionContext;
import javax.ejb.Singleton;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import pl.polsl.rainbow_coding.ejb.entities.Operator;

/**
 *
 * @author mr_shelp
 */
@Singleton
@LocalBean
@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
public class OperatorFacade extends AbstractFacade<Operator> {

    @PersistenceContext(unitName = "rainbow_coding_pu")
    private EntityManager em;
    @Resource
    private SessionContext context;
    @EJB
    private RoleFacade roleFacade;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public OperatorFacade() {
        super(Operator.class);
    }
    
    public List<Operator> findByRole(Object id)
    {
        return roleFacade.find(id).getOperatorList();
    }

    public Operator find(String login) {
        TypedQuery<Operator> query = em.createNamedQuery("Operator.findByLogin", Operator.class);
        query.setParameter("login", login);
        List<Operator> resultList = query.getResultList();
        if (resultList != null && resultList.size() > 0) {
            return resultList.get(0);
        }
        return null;
    }

    public Operator getFromPrincipal() {
        if (context.getCallerPrincipal() == null) {
            return null;
        } else {
            return find(context.getCallerPrincipal().getName());
        }
    }
}
