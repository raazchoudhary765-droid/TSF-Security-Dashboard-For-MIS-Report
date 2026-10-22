HOTEL CLARKS AMER JAIPUR PWA v28 — MOD + CAFETERIA + EMAIL FIX

WHAT IS FIXED
1. Added the October 2026 MOD roster hardcoded from the calendar image supplied by the user (1–31 October).
2. MOD Calendar renders the date/day/name rows after the calendar panel opens.
3. Cafeteria calendar opens and renders the weekly Breakfast/Lunch/Dinner menu for each date. Blank saved fields fall back to the supplied weekly menu. Save fills missing values with the weekly menu.
4. Email form submission now waits for a backend postMessage response instead of always claiming the request succeeded.
5. DSR/PDF, Incident PDF, and the overall existing screens were otherwise kept intact.

GITHUB UPDATE
1. Upload index.html to the root of your existing GitHub Pages repository as index.html.
2. Keep manifest.webmanifest, service-worker.js, icon-192.png, icon-512.png in the same repository root. This ZIP carries the existing files unchanged.
3. Commit changes, wait for Pages deployment, then open the live site and press Ctrl+Shift+R. For an installed PWA, close/reopen it after deployment.

APPS SCRIPT EMAIL UPDATE — REQUIRED
1. Open the Apps Script project that serves your existing /exec URL.
2. Open Code.gs. Add the contents of Email_Backend_Patch.gs to that project.
3. IMPORTANT: If a doPost(e) already exists, merge the email action into it; do not leave two doPost functions. Existing doGet(e) must remain unchanged for DSR/dashboard API calls.
4. Click Save.
5. Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy. Keep the same Web App URL used in index.html.
6. Ensure Web App is configured to execute as the owner and access is allowed for your intended users. Authorize MailApp permission when prompted. If no authorization prompt appears, run the helper function authorizeMailOnce below once from the editor, accept permission, then redeploy.

OPTIONAL ONE-TIME AUTHORIZATION HELPER
function authorizeMailOnce(){ MailApp.getRemainingDailyQuota(); }

TEST EMAIL
1. Use the Send Mail button and enter a valid recipient address.
2. Wait for the result toast. Success should say Email sent successfully; failures should show a backend message.
3. If it times out, check Apps Script > Executions for doPost. Check recipient Spam/Junk too.

IMPORTANT
- Mail sending requires a deployed backend and MailApp authorization. Updating GitHub HTML alone cannot enable email sending.
- Apps Script PDF conversion can fail for oversized embedded photos or unsupported external resources. Reduce photo size if the backend reports a PDF/size error.
- MOD names are hardcoded only for October 2026 from the provided image. Other months show “Roster not configured for this month”.
- Cafeteria menu edits remain browser-local; this patch does not sync cafeteria data to Google Sheets.
- Live deployment/email delivery has not been tested from this environment.
