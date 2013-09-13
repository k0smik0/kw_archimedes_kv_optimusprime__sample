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
