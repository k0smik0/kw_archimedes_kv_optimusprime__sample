<%@page language="java" contentType="text/xml; charset=UTF-8"pageEncoding="UTF-8"%>

<%@page import="festival.model.Concert"%>
<%@page import="festival.model.ConcertInsertResult"%>

<jsp:useBean id="concertInsertResult" scope="request" type="festival.model.ConcertInsertResult"/>
<div id="cxml" style="display:none;">
	<?xml version="1.0" encoding="UTF-8"?>
	<concerts>
	<% if (concertInsertResult.isConcertExistant()) { %>
		<messagetitle>Spiacente, il seguente concerto gia esiste:</messagetitle>
	<% } else { %>
		<messagetitle>OK, il seguente concerto è stato inserito:</messagetitle>
	<% } %>
		<concert>
			<code> <%= concertInsertResult.getConcert().getConcertCode() %> </code>
			<name> <%= concertInsertResult.getConcert().getGroupName() %> </name>
			<date> <%= concertInsertResult.getConcert().getConcertDate() %> </date>
		</concert>
	</concerts>
</div>

<div id="iout"></div>

<script src="/<%= application.getServletContextName() %>/js/optimus_prime/xslt.js"></script>
<script type="application/javascript">	
	var xslUrl = "/<%= application.getServletContextName() %>/style/concerts.xsl";
	convertByXSL(document.getElementById("cxml").innerHTML,xslUrl,"iout");
</script>