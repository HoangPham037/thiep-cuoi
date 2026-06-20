const SHEET_NAME = "RSVP";
const ADMIN_KEY = "doi-key-admin-o-day";

function doPost(e) {
  const sheet = getSheet_();
  const data = JSON.parse(e.postData.contents || "{}");
  sheet.appendRow([
    new Date(),
    data.name || "",
    data.attend || "",
    data.message || "",
    data.sentAt || "",
  ]);
  return json_({ ok: true });
}

function doGet(e) {
  const action = e.parameter.action || "list";
  const callback = e.parameter.callback || "callback";

  if (e.parameter.key !== ADMIN_KEY) {
    return jsonp_(callback, { ok: false, error: "Sai admin key." });
  }

  if (action === "clear") {
    const sheet = getSheet_();
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) sheet.deleteRows(2, lastRow - 1);
    return jsonp_(callback, { ok: true });
  }

  const values = getSheet_().getDataRange().getValues().slice(1);
  const data = values.map((row) => ({
    receivedAt: row[0],
    name: row[1],
    attend: row[2],
    message: row[3],
    sentAt: row[4],
  }));
  return jsonp_(callback, { ok: true, data });
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Received At", "Name", "Attend", "Message", "Sent At"]);
  }
  return sheet;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function jsonp_(callback, payload) {
  return ContentService.createTextOutput(`${callback}(${JSON.stringify(payload)});`).setMimeType(
    ContentService.MimeType.JAVASCRIPT
  );
}
