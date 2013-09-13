package festival.logic;

import festival.model.Concert;
import festival.model.ConcertInsertResult;
import festival.service.FestivalService;
import net.iubris.kw.logic.Execution;
import net.iubris.kw.logic.KW;
import net.iubris.kw.logic.KWActionLogic;


public class ConcertLogicInsert implements KWActionLogic {
	
	@KW(inject=true)
	private Concert concertToInsert;
	
	@KW(target={Execution.OK,Execution.INPUT})
	private ConcertInsertResult concertInsertResult = new ConcertInsertResult();
		
	public void setConcertToInsert(Concert concertToInsert) {
		this.concertToInsert = concertToInsert;
	}
	
	public ConcertInsertResult getConcertInsertResult() {
		return concertInsertResult;
	}
	
		
	public Execution execute() {		
		
		this.concertInsertResult.setConcert(concertToInsert);
		
		FestivalService bs = new FestivalService();
		if (bs.insert(concertToInsert)){
//			System.out.println("ConcertLogicInsert:36 inserito\n"+concertToInsert.toString());
			this.concertInsertResult.setConcertExistant(false);						
			return Execution.OK;
		}
		
		this.concertInsertResult.setConcertExistant(true);
		return Execution.INPUT;
	}	
	
}
