# Gain Capital Email Archiver

Automated Google Apps Script that converts daily forex trading confirmation emails to searchable PDFs in Google Drive.

## Features

- ✅ Automatically processes emails from Gain Capital/FOREX.com with "Daily Confirmation" subject
- ✅ Converts emails to formatted PDFs with headers (date, sender, subject)  
- ✅ Saves to organized Google Drive folder with standardized naming
- ✅ Prevents duplicate processing
- ✅ Removes Gmail labels after processing
- ✅ Runs on configurable daily schedule

## Use Case

Designed for forex traders who receive daily trading confirmations and want to maintain organized, searchable archives for:
- Performance analysis
- Compliance documentation  
- Integration with AI tools like Google NotebookLM

## Setup Instructions

### Prerequisites
- Gmail account with Gain Capital trading emails
- Google Drive access
- Google Apps Script access

### Step 1: Gmail Setup
1. Create Gmail label: `GainCapitalReports`
2. Create Gmail filter:
   - **From:** `metatrader@forex.com`
   - **Subject:** `Daily Confirmation`
   - **Action:** Apply label `GainCapitalReports`

### Step 2: Deploy Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Create new project: "GainCapital-Email-Archiver"
3. Copy code from `Code.gs` into the script editor
4. Save the project

### Step 3: Test & Setup Automation
1. Run `testSingleEmail` function to test
2. Grant required permissions (Gmail + Drive access)
3. Verify PDF creation in `GainCapital_Archive` folder
4. Set up daily trigger for `saveGainCapitalEmailsAsPDF` function

## Output

Individual PDFs named `GainCapital_Daily_YYYY-MM-DD.pdf` stored in `GainCapital_Archive` Google Drive folder.

## Monthly Workflow

1. Download all monthly PDFs from Google Drive
2. Combine into single monthly PDF
3. Upload to Google NotebookLM for AI-powered trading analysis

## Tech Stack

- Google Apps Script
- Gmail API
- Google Drive API
- HTML to PDF conversion

## License

MIT License - See LICENSE file for details

## Contributing

Issues and pull requests welcome! This script can be adapted for other email providers and trading platforms.

---

**Note:** This is a personal automation tool. Ensure compliance with your broker's terms of service and data handling policies.
