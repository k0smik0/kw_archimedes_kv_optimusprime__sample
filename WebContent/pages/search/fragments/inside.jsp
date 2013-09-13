<%@page language="java" contentType="text/xml; charset=UTF-8"pageEncoding="UTF-8"%>

<%@page import="festival.model.Concert"%>
<%@page import="festival.model.ConcertsSearchResult"%>
<%@page import="java.util.Collection"%>

<jsp:useBean id="concertsResult" scope="request" type="festival.model.ConcertsSearchResult" />
<div name="cxml" id="cxml" style="display:none;">	
	<?xml version="1.0" encoding="UTF-8"?>
	<xml>
	<concerts>
	<% if (concertsResult.getConcerts() == null) { %>
		<messagetitle>
			Spiacente, non sono stati trovati concerti nel periodo specificato: dal <%= concertsResult.getStartDate() %> al <%= concertsResult.getEndDate() %> 
		</messagetitle>
	<% } else { %>
		<messagetitle>
			Concerti nel periodo da: 
				<jsp:getProperty name="concertsResult" property="startDate"/>
			 a: <jsp:getProperty name="concertsResult" property="endDate"/>
		</messagetitle>
		<% for (Concert c: concertsResult.getConcerts()) { %>	
		<concert>
			<code> <%= c.getConcertCode() %> </code>
			<name> <%= c.getGroupName() %> </name>
			<date> <%= c.getConcertDate() %> </date>
		</concert>
		<% } %>
	<% } %>
	</concerts>
	</xml>
</div>

<div id="sout"></div>

<script src="/<%= application.getServletContextName() %>/js/optimus_prime/xslt.js"></script>
<script type="application/javascript">	
	var xslUrl = "/<%= application.getServletContextName() %>/style/concerts.xsl";
	convertByXSL(document.getElementById("cxml").innerHTML,xslUrl,"out");
</script>


	