package test;


import java.util.Collection;
import festival.model.Concert;

import net.iubris.archimedes.dao.EGDAO;
import net.iubris.archimedes.dao.support.hsql.HsqlDAO;
import net.iubris.archimedes.service.ArchimedesService;


public class DaoTest {
	
	public static void main(String args[]) {

		//init
		HsqlDAO<Concert> h = new HsqlDAO<Concert>(Concert.class, 0);
		h.buildTable();
		
		
		
		Concert concerto = new Concert(); 
		concerto.setConcertCode(1);
		concerto.setGroupName("Rolling Stones");
		concerto.setConcertDate(10071969);
		
		
		
		
		/*
		ArchimedesService as = ArchimedesService.INSTANCE;
		HsqlDBHandler hsqldbh = HsqlDBHandlerSimplerThanSimple.INSTANCE;
			
		Class[] cs = {Concerto.class.getClass(),HsqlDBHandler.class};
		Object[] eargs = {Concerto.class,hsqldbh};
		as.setArgumentForConcreteEGDAOClassConstructorRetriever(cs);
		as.setArgumentForConcreteEGDAOClassConstructorInvoker(eargs);
		*/
		
		
		//System.out.println("DaoTest:40 "+as.getArgsLength());
		EGDAO<Concert> d = ArchimedesService.INSTANCE.getDAO();
		d = h;
		/*
		System.out.println( SQLStrings.INSTANCE.getBuildTable() );
		System.out.println( SQLStrings.INSTANCE.getDropTable() );
		System.out.println( SQLStrings.INSTANCE.getInsert() );
		System.out.println( SQLStrings.INSTANCE.getDeleteExactElement() );
		*/
		
		
		
		d.create(concerto);
		
		Collection<Concert> cc = h.read("codiceConcerto", 1);
		for (Concert c: cc ) {
			System.out.println(c.toString());
		}
		
		
	}
}
