<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  
  <h2>Concerti</h2>
  <table border="1">
    <tr bgcolor="#9acd32">    
      <th align="left">Località : <xsl:value-of select="//concertiRichiesti/località" /></th>      
    </tr>
    <xsl:for-each select="//concerti/evento">
	    <tr>
	      <td><xsl:value-of select="data" /></td>
	      <td><xsl:value-of select="prezzo" /></td>
	      <td><xsl:value-of select="gruppo" /></td>
	    </tr>
    </xsl:for-each>
  </table>
  
</xsl:template>

</xsl:stylesheet>