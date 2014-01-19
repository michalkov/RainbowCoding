/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package pl.polsl.rainbow_coding.ejb.services;

import java.io.Serializable;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import pl.polsl.rainbow_coding.ejb.FileFacade;
import pl.polsl.rainbow_coding.ejb.LanguageFacade;
import pl.polsl.rainbow_coding.ejb.NoteFacade;
import pl.polsl.rainbow_coding.ejb.OperatorFacade;
import pl.polsl.rainbow_coding.ejb.ProjectFacade;
import pl.polsl.rainbow_coding.ejb.RoleFacade;
import pl.polsl.rainbow_coding.ejb.entities.File;
import pl.polsl.rainbow_coding.ejb.entities.Language;
import pl.polsl.rainbow_coding.ejb.entities.Note;
import pl.polsl.rainbow_coding.ejb.entities.Operator;
import pl.polsl.rainbow_coding.ejb.entities.Project;
import pl.polsl.rainbow_coding.ejb.entities.Role;

/**
 *
 * @author mr_shelp
 */
@Singleton
@LocalBean
//@Startup
public class TestService implements Serializable {
    
    private static final long serialVersionUID = 1L;
    public static final Logger logger = Logger.getLogger("pl.polsl.rainbow_coding.logger");
    @EJB
    private FileFacade fileFacade;
    @EJB
    private LanguageFacade languageFacade;
    @EJB
    private NoteFacade noteFacade;
    @EJB
    private OperatorFacade operatorFacade;
    @EJB
    private ProjectFacade projectFacade;
    @EJB
    private RoleFacade roleFacade;
    
    @PostConstruct
    public void init() {
        try {
            Language language = new Language();
            language.setDescription("test language");
            language.setName("Yava");
            languageFacade.create(language);
            logger.info("Language created successfully.");
            
            Role role = new Role();
            role.setDescription("test role");
            role.setName("TEST");
            roleFacade.create(role);
            logger.info("Role created successfully.");
            
            Operator operator = new Operator();
            operator.setLogin("user");
            operator.setPassword("pass");
            operator.setRole(role);
            operatorFacade.create(operator);
            logger.info("Operator created successfully.");
            
            Project project = new Project();
            project.setDescription("test project");
            project.setName("ProJect");
            project.setOperator(operator);
            projectFacade.create(project);
            logger.info("Project created successfully.");
            
            File file = new File();
            file.setContent("test content");
            file.setLanguage(language);
            file.setProject(project);
            fileFacade.create(file);
            logger.info("File created successfully.");
            
            Note note = new Note();
            note.setContent("test note");
            note.setFile(file);
            noteFacade.create(note);
            logger.info("Note created successfully.");
            
            noteFacade.remove(note);
            logger.info("Note removed successfully.");
            
            fileFacade.remove(file);
            logger.info("File removed successfully.");
            
            projectFacade.remove(project);
            logger.info("Project removed successfully.");
            
            operatorFacade.remove(operator);
            logger.info("Operator removed successfully.");
            
            roleFacade.remove(role);
            logger.info("Role removed successfully.");
            
            languageFacade.remove(language);
            logger.info("Language removed successfully.");
            
            logger.info("Tests completed.");
            
        } catch (Exception e) {
            logger.severe(e.getMessage() == null ? e.toString() : e.getMessage());
        }
    }
}
