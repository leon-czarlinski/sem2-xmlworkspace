<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<head>
<title>Construction Data</title>
<style>
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            text-align: left;
            padding: 8px;
            border: 1px solid #ddd;
          }
          th {
            background-color: #4CAF50;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2
          }
        </style>
</head>
<body>
<h1>Construction Data</h1>
<table>
<tr>
<th>Start Date</th>
<th>End Date</th>
<th>Street</th>
<th>City</th>
<th>Region</th>
<th>Country</th>
<th>Contractors</th>
<th>Workers</th>
<th>Equipments (Qty)</th>
<th>Supplies (Qty)</th>
</tr>
<xsl:apply-templates select="buildings/building"/>
</table>
</body>
</html>
</xsl:template>

<xsl:template match="building">
<tr>
<td><xsl:value-of select="startDate"/></td>
<td><xsl:value-of select="endDate"/></td>
<td><xsl:value-of select="address/street"/></td>
<td><xsl:value-of select="address/city"/></td>
<td><xsl:value-of select="address/region"/></td>
<td><xsl:value-of select="address/country"/></td>
<td><xsl:value-of select="contractors"/></td>
<td>
<xsl:apply-templates select="workers/worker"/>
</td>
<td>
<xsl:apply-templates select="equipments/equipment"/>
</td>
<td>
<xsl:apply-templates select="supplies/supply"/>
</td>
</tr>
</xsl:template>

<xsl:template match="worker">
<xsl:value-of select="concat(firstName, ' ', lastName, ' (', role, ')')"/>
<br/>
</xsl:template>

<xsl:template match="equipment">
<xsl:value-of select="concat(type, ' (', qty, ')')"/>
<br/>
</xsl:template>

<xsl:template match="supply">
<xsl:value-of select="concat(material, ' (', qty, ')')"/>
<br/>
</xsl:template>

</xsl:stylesheet>