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

/**
 *
 * @author mr_shelp
 */
@Singleton
@LocalBean
@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
public class FileFacade extends AbstractFacade<File> {

    @PersistenceContext(unitName = "rainbow_coding_pu")
    private EntityManager em;
    @EJB
    private LanguageFacade languageFacade;
    @EJB
    private ProjectFacade projectFacade;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public FileFacade() {
        super(File.class);
    }
    
    public List<File> findByLanguage(Object id)
    {
        return languageFacade.find(id).getFileList();
    }
    
    public List<File> findByProject(Object id)
    {
        return projectFacade.find(id).getFileList();
    }
}
