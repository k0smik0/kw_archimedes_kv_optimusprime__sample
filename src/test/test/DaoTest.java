/*******************************************************************************
 * Copyleft 2013 Massimiliano Leone - massimiliano.leone@iubris.net .
 * 
 * DaoTest.java is part of 'festival_sample'.
 * 
 * 'festival_sample' is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 * 
 * 'festival_sample' is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with 'festival_sample'; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA
 ******************************************************************************/
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
