/*******************************************************************************
 * Copyleft 2013 Massimiliano Leone - maximilianus@gmail.com .
 * 
 * ConcertLogicInsert.java is part of 'festival_sample'.
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
