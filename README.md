# gain-capital-email-archiver
Automated Google Apps Script that converts daily forex trading confirmation emails to searchable PDFs in Google Drive.

Features:

Automatically processes emails from Gain Capital/FOREX.com with "Daily Confirmation" subject
Converts emails to formatted PDFs with headers (date, sender, subject)
Saves to organized Google Drive folder with standardized naming
Prevents duplicate processing
Removes Gmail labels after processing
Runs on configurable daily schedule
Use Case: Designed for forex traders who receive daily trading confirmations and want to maintain organized, searchable archives for performance analysis, compliance, and integration with AI tools like Google NotebookLM.

Setup Requirements:

Gmail label: GainCapitalReports
Gmail filter to auto-label target emails
Google Apps Script daily trigger
Google Drive permissions
Output: Individual PDFs named GainCapital_Daily_YYYY-MM-DD.pdf stored in GainCapital_Archive folder, ready for monthly consolidation and AI analysis.

Tech Stack: Google Apps Script, Gmail API, Google Drive API
