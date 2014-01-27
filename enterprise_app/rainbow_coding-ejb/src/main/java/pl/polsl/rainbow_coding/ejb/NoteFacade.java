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
import pl.polsl.rainbow_coding.ejb.entities.File;
import pl.polsl.rainbow_coding.ejb.entities.Note;

/**
 *
 * @author mr_shelp
 */
@Singleton
@LocalBean
@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
public class NoteFacade extends AbstractFacade<Note> {

    @PersistenceContext(unitName = "rainbow_coding_pu")
    private EntityManager em;
    @EJB
    private FileFacade fileFacade;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public NoteFacade() {
        super(Note.class);
    }
    
    public List<Note> findByFile(Object id)
    {
        return fileFacade.find(id).getNoteList();
    }
}
