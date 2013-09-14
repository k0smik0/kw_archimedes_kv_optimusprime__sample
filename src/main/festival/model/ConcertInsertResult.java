/*******************************************************************************
 * Copyleft 2013 Massimiliano Leone - massimiliano.leone@iubris.net .
 * 
 * ConcertInsertResult.java is part of 'festival_sample'.
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
package festival.model;

public class ConcertInsertResult {

	private Concert concert;
	private boolean concertExistant;
	
	public Concert getConcert() {
		return concert;
	}
	public void setConcert(Concert concert) {
		this.concert = concert;
	}
	public boolean isConcertExistant() {
		return concertExistant;
	}
	public void setConcertExistant(boolean concertExistant) {
		this.concertExistant = concertExistant;
	}
	
	
}
