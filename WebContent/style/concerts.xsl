<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
    
  <h2>Concerti</h2>
  
  <table border="1"> 	
  	
  	<th align="center" colspan="3"  bgcolor="#9acd32"> <xsl:value-of select="//concerts/messagetitle" /></th>
  	   
	<xsl:if test="//concerts/concert">
		 <tr bgcolor="#ffddee">
			<td align="center">codice concerto</td>
			<td align="center">nome gruppo</td>
			<td align="center">data concerto</td>
		</tr>
	    <xsl:for-each select="//concerts/concert">
		    <tr>
		      <td align="center"><xsl:value-of select="code" /></td>
		      <td align="center"><xsl:value-of select="name" /></td>
		      <td align="center"><xsl:value-of select="date" /></td>
		    </tr>
	    </xsl:for-each>
    </xsl:if>
  </table>
  <br/><br/>
  
</xsl:template>

</xsl:stylesheet>