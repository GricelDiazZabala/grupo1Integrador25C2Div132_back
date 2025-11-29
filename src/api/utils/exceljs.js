import ExcelJS from "exceljs";


export const generateExcel = (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ventas');
    worksheet.columns = [
        { header: 'ID Venta', key: 'id', width: 10 },
        { header: 'Nombre Usuario', key: 'nombre_usuario', width: 30 },
        { header: 'Total', key: 'total', width: 15 },
        { header: 'Fecha', key: 'fecha', width: 20 }
    ];
    data.forEach(sale => {
        worksheet.addRow({
            id: sale.id,
            nombre_usuario: sale.nombre_usuario,
            total: sale.total,
            fecha: new Date(sale.fecha).toLocaleString("es-AR")
        });
    });
    return workbook;
};
