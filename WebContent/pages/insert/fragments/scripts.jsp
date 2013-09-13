<jsp:include page="/pages/fragments/scripts.jsp" flush="true" />

<script type="application/javascript">
	//ajaxedInsertingCheckAndSubmit(); //ajax	 
	document.getElementById("concertsinsertform").action = "ConcertLogicInsert"; //no ajax
</script>