import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students');
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Class', key: 'class', width: 20 },
    ];
    worksheet.getRow(1).font = { bold: true };
    worksheet.addDataValidation({
      type: 'list',
      allowBlank: true,
      formula1: '"Class 6,Class 7,Class 8,Class 9,Class 10,Class 11,Class 12"',
      ranges: [{ column: 2, row: 2, columnCount: 1, rowCount: 1000 }],
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const filename = `student_template_${new Date().toISOString().split('T')[0]}.xlsx`;
    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Template generation error:', err);
    return NextResponse.json({ error: err.message || 'Failed to generate template' }, { status: 500 });
  }
}
