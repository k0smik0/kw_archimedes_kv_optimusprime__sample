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
