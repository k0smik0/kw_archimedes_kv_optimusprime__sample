package festival.model;

import java.util.Collection;

public class ConcertsSearchResult {

	private Collection<Concert> concerts;
	private int startDate;	
	private int endDate;
	private boolean found;
	
	public void setConcerts(Collection<Concert> concerts) {
		this.concerts = concerts;
	}
	public Collection<Concert> getConcerts() {
		return concerts;
	}
	public int getStartDate() {
		return startDate;
	}
	public void setStartDate(int startDate) {
		this.startDate = startDate;
	}
	public int getEndDate() {
		return endDate;
	}
	public void setEndDate(int endDate) {
		this.endDate = endDate;
	}
	public boolean isFound() {
		return found;
	}
	public void setFound(boolean found) {
		this.found = found;
	}
}
