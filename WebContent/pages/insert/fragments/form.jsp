
	Inserisci un concerto:
	<form action="" name="concertsinsertform" id="concertsinsertform" method="post">
		<fieldset>
			<fieldset>
				<label for="concertCode">Codice Concerto:</label>
				<input type="text" id="concertCode" name="concertCode">
				<span class="hint">Il campo deve essere di caratteri numerici.</span>
			</fieldset>
			<fieldset>
				<label for="groupName">Nome del Gruppo:</label>
				<input type="text" id="groupName" name="groupName">
				<span class="hint">Il campo deve essere di caratteri alfabetici.</span>
			</fieldset>
			<fieldset>
				<label for="concertDate">Data del Concerto:</label>
				<input type="text" id="concertDate" name="concertDate">
				<span class="hint">Il campo deve essere di caratteri numerici.</span>
			</fieldset>
			<fieldset>
				<input type="submit" value="submit">
				<input type="submit" value="submit ajax" onclick="ajaxedInsertingCheckAndSubmit()" style="width:100px">
				<input type="reset" value="reset">
				<span class="null"></span>
			</fieldset>
		</fieldset>
	</form>
	
	<div id="ierror"></div>

	<jsp:include page="/pages/insert/fragments/scripts.jsp" flush="true" />
	