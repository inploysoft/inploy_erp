import * as XLSX from 'xlsx';

const url = 'https://docs.sheetjs.com/executive.json';

export async function createExcel() {
  const raw_data = await (await fetch(url)).json();

  const prez = raw_data.filter((row) =>
    row.terms.some((term) => term.type === 'prez'),
  );

  prez.forEach(
    (row) => (row.start = row.terms.find((term) => term.type === 'prez').start),
  );

  prez.sort((l, r) => l.start.localeCompare(r.start));

  const rows = prez.map((row) => ({
    name: row.name.first + ' ' + row.name.last,
    birthday: row.bio.birthday,
  }));

  console.log(rows);

  // 엑셀 worksheet 생성
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // 엑셀 workbook 생성 및 worksheet 추가
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dates');

  // 엑셀 파일 다운로드
  XLSX.writeFile(workbook, 'members.xlsx');
}
