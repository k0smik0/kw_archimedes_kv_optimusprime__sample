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
