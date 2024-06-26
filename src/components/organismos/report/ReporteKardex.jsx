import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// import { useQuery } from "@tanstack/react-query";
// import { SpinnerLoader, useEmpresaStore, useKardexStore } from "../../../index";
Font.register({
  family: "Inconsolata",
  src: "http://fonts.gstatic.com/s/inconsolata/v15/7bMKuoy6Nh0ft0SHnIGMuaCWcynf_cDxXwCLxiixG1c.ttf",
});

const styles = StyleSheet.create({
  page: { flexDirection: "row" },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  table: { width: "100%", margin: "auto", marginTop: 10 },
  row: {
    flexDirection: "row",
    borderBottom: 1,
    borderBottomColor: "#121212",
    alignItems: "stretch",
    height: 24,
    borderLeftColor: "#000",
    borderLeft: 1,
    textAlign: "left",
    justifyContent: "flex-start",
  },
  cell: {
    flex: 1,
    textAlign: "left",
    borderLeftWidth: 2, // Ancho del borde izquierdo en píxeles
    borderLeftColor: "#000",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerCell: {
    flex: 1,
    backgroundColor: "#dcdcdc",
    fontWeight: "bold",
    textAlign: "left",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
const renderTableRow = (rowData, isHeader = false) => (
  <View style={styles.row} key={rowData.id}>
    <Text style={[styles.cell, isHeader && styles.headerCell]}>
      {rowData.fecha}
    </Text>
    <Text style={[styles.cell, isHeader && styles.headerCell]}>
      {rowData.descripcion}
    </Text>
    <Text style={[styles.cell, isHeader && styles.headerCell]}>
      {rowData.tipo}
    </Text>
    <Text style={[styles.cell, isHeader && styles.headerCell]}>
      {rowData.cantidad}
    </Text>
  </View>


);

const renderPage = (pageNumber, pageCount) => (
  <Text style={{ position: "absolute", top: 16, right: 16 }}>
    Página {pageNumber} de {pageCount}
  </Text>

);

export function ReporteKardex({ data}) {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.section}>
          <View>
            <Text>Movimientos de Kardex</Text>
            <Text style={{ marginBottom: 10 }}>Fecha y Hora de impresion: {formattedDate}</Text>
            <View style={styles.table}>
              {renderTableRow(
                {
                  fecha: "Fecha",
                  descripcion: "Producto",
                  tipo: "Movimiento",
                  cantidad: "Cantidad",
                },
                true
              )}
              
 
              {data?.map((movement) => renderTableRow(movement))}
            </View>
            
          </View>
        </View>
        {renderPage}
      </Page>
    </Document>
  );
}
export default ReporteKardex;
