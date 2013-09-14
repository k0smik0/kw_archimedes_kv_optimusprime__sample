/*******************************************************************************
 * Copyleft 2013 Massimiliano Leone - massimiliano.leone@iubris.net .
 * 
 * FestivalService.java is part of 'festival_sample'.
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
package festival.service;

import java.util.ArrayList;
import java.util.Collection;

import festival.model.Concert;

import net.iubris.archimedes.dao.EGDAO;
import net.iubris.archimedes.service.ArchimedesService;


public class FestivalService {

	public boolean insert(Concert c) {
	
		EGDAO<Concert> h = ArchimedesService.INSTANCE.getDAO();
		
		Collection<Concert> c1 = h.read("groupName", c.getGroupName());				
		Collection<Concert> c2 = h.read("ConcertCode", c.getConcertCode());
				
		if (c1 == null && c2 == null) {
			boolean r = h.create(c);
			return r;
		}	
		
		return false;
	}
	
	public Collection<Concert> search(int date1, int date2) {
		EGDAO<Concert> h = ArchimedesService.INSTANCE.getDAO();
		//HsqlDAO<Concert> h = new HsqlDAO<Concert>(Concert.class, 0);	

		if (date1 > date2) return null;
		
		Collection<Concert> allConcerts = h.readAll();
		
		Collection<Concert> concertsResult = new ArrayList<Concert>();
		
		for (Concert c: allConcerts) {
			if (c.getConcertDate() >= date1 && c.getConcertDate() <= date2) {
				concertsResult.add(c);
			}
		}	
		if (concertsResult.size()>0) return concertsResult;
		
		return null;
	} 
}
