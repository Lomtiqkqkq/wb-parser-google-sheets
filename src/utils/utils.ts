function extractSheetId(inputArray: Array<string>): Array<string> {
  return inputArray.map((item) => {
    const match = item.match(/\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : item;
  });
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export { extractSheetId, formatDate };
