/**
 * HOTEL CLARKS AMER JAIPUR - EMAIL BACKEND PATCH v28
 * Merge this into the existing Apps Script project. Keep exactly ONE doPost(e).
 * Existing doGet(e), saveDSR(), dashboard and sheet functions remain unchanged.
 */
function doPost(e) {
  var result;
  try {
    var raw = (e && e.parameter && e.parameter.payload) || '';
    if (!raw && e && e.postData && e.postData.contents) {
      var body = e.postData.contents;
      var match = body.match(/(?:^|&)payload=([^&]*)/);
      if (match) raw = decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
    if (!raw) throw new Error('Missing email payload.');
    var p = JSON.parse(raw);
    if (p.action !== 'sendEmail') throw new Error('Unknown POST action: ' + String(p.action || 'missing'));
    result = sendSecurityReportEmail_(p);
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    result = { success: false, message: String(err && err.message ? err.message : err) };
  }
  // Return a small HTML response to the hidden form iframe so the page can show
  // a real success/error result instead of assuming the request succeeded.
  var serialized = JSON.stringify(result).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><head><meta charset="utf-8"></head><body><script>' +
    'try{parent.postMessage({type:"CLARKS_MAIL_RESULT",...(' + serialized + ')},"*");}catch(e){}' +
    '</script><p>' + (result.success ? 'Email sent.' : 'Email failed: ' + escapeMailText_(result.message)) + '</p></body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function sendSecurityReportEmail_(p) {
  var to = String(p.recipient || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new Error('Invalid recipient email address.');
  var html = String(p.html || '').trim();
  if (!html || !/<body[\s>]/i.test(html)) throw new Error('Report HTML is empty or incomplete; PDF not created.');
  if (html.length > 7000000) throw new Error('Report/photos are too large. Reduce image size or send fewer photos.');

  var subject = String(p.subject || 'Hotel Clarks Amer Jaipur - Security Report').trim().slice(0, 240);
  var body = String(p.body || 'Please find attached the security report.');
  var filename = (subject.replace(/[\\/:*?"<>|]/g, '-').slice(0, 100) || 'Security_Report') + '.pdf';
  var pdf;
  try {
    pdf = Utilities.newBlob(html, 'text/html', 'report.html').getAs(MimeType.PDF).setName(filename);
  } catch (err) {
    throw new Error('PDF conversion failed: ' + String(err && err.message ? err.message : err));
  }
  MailApp.sendEmail({
    to: to,
    subject: subject,
    body: body,
    htmlBody: '<div style="font-family:Arial,sans-serif;white-space:pre-line">' + escapeMailText_(body) + '</div>',
    attachments: [pdf],
    name: 'Hotel Clarks Amer Jaipur - Security Command Center'
  });
  return { success: true, message: 'Email sent successfully with PDF attachment.', recipient: to, attachment: filename };
}

function escapeMailText_(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
