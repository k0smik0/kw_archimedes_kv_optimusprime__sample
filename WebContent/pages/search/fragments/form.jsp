<div id="sout"></div>

Cerca un concerto:
<form action="" name="concertssearchform" id="concertssearchform" method="get">
	<fieldset>
		<fieldset>
			<label for="startDate">Data inizio:</label>
			<input type="text" id="startDate" name="startDate">
			<span class="hint">Il campo deve essere di 8 caratteri numerici.</span>
		</fieldset>
		<fieldset>
			<label for="endDate">Data fine:</label>
			<input type="text" id="endDate" name="endDate">
			<span class="hint">Il campo deve essere di 8 caratteri numerici.</span>
		</fieldset>			
		<fieldset>
			<input type="submit" value="submit">
			<input type="submit" value="submit ajax" onclick="ajaxedSearchingCheckAndSubmit()" style="width:100px"> 
			<input type="reset" value="reset">
			<span class="null"></span>
		</fieldset>
	</fieldset>
</form>

<div id="serror"></div>

<jsp:include page="/pages/search/fragments/scripts.jsp" flush="true" />
