/*******************************************************************************
 * Copyleft 2013 Massimiliano Leone - massimiliano.leone@iubris.net .
 * 
 * Concert.java is part of 'festival_sample'.
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

import net.iubris.archimedes.db.hsql.HSQLDB;

public class Concert {	
	
	@HSQLDB(position=1)
	private int concertCode;
	
	@HSQLDB(position=2)
	private String groupName;
	
	@HSQLDB(position=3)
	private int concertDate;



	public int getConcertCode() {
		return concertCode;
	}

	public void setConcertCode(int concertCode) {
		this.concertCode = concertCode;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public int getConcertDate() {
		return concertDate;
	}

	public void setConcertDate(int concertDate) {
		this.concertDate = concertDate;
	}
	
	public String toString() {
		String s = "concertCode: "	+this.concertCode+"\n"+
					"groupName: "	+this.groupName+"\n"+
					"concertDate: "	+this.concertDate+"\n";
		return s;					
	}

}
