HOTEL CLARKS AMER DSR v23 FRONTEND FIX

Replace the existing index.html in your GitHub repository with this index.html.
Keep your current Apps Script Code.gs and API URL unchanged for this frontend-only patch.
Then commit changes and hard-refresh the website/app (Ctrl+Shift+R). If using the installed PWA, close it fully and reopen it after refresh.

Changes:
- MOD Calendar rendering is forced on open and initialized at page load.
- DSR Edit loads the selected record fields and event rows, then lets the user save changes.
- DSR PDF opens its print window immediately to avoid popup blocking after asynchronous photo reads.
- Incident photo preview has a per-image Remove Photo button.

Note: Browser/device permissions and live Google Sheets deployment cannot be verified from this package alone.
