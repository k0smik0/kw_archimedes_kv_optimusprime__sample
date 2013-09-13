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
