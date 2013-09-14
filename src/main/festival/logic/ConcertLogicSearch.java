/*******************************************************************************
 * Copyleft 2013 Massimiliano Leone - maximilianus@gmail.com .
 * 
 * ConcertLogicSearch.java is part of 'festival_sample'.
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
package festival.logic;

import java.util.Collection;

import festival.model.Concert;
import festival.model.ConcertsSearchResult;
import festival.service.FestivalService;

import net.iubris.kw.logic.Execution;
import net.iubris.kw.logic.KW;
import net.iubris.kw.logic.KWActionLogic;

public class ConcertLogicSearch implements KWActionLogic {
	
	public ConcertLogicSearch() {
		System.out.println("sono in concert logic search");
	}
	
	@KW(inject=true)
	private int startDate;
	
	@KW(inject=true)
	private int endDate;
		
	public void setStartDate(int startDate) {
		this.startDate = startDate;
	}	
	public void setEndDate(int endDate) {
		this.endDate = endDate;
	}
	
	
	@KW(target={Execution.OK,Execution.INPUT})
	private ConcertsSearchResult concertsResult = new ConcertsSearchResult();;

	public ConcertsSearchResult getConcertsResult() {
		return concertsResult;
	}

	public Execution execute() {
		
		concertsResult.setStartDate(startDate);
		concertsResult.setEndDate(endDate);
		
		FestivalService bs = new FestivalService();
		Collection<Concert> concerts = bs.search(startDate,endDate);		
		
		if (concerts!=null) {
			concertsResult.setConcerts(concerts);			
			return Execution.OK;
		}
		
		return Execution.INPUT;
	}
	
}
