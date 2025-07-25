# Detailed Setup Guide

## Gmail Configuration

### Create Label
1. Gmail → Settings → Labels → Create new label
2. Name: GainCapitalReports

### Create Filter
1. Gmail → Settings → Filters and Blocked Addresses
2. Create new filter with criteria:
   - From: metatrader@forex.com
   - Subject: Daily Confirmation
3. Actions:
   - Apply label: GainCapitalReports
   - Also apply to existing conversations (optional)

## Google Apps Script Deployment

### Create Project
1. Navigate to script.google.com
2. Create new project
3. Name: "GainCapital-Email-Archiver"
4. Paste Code.gs content from this repository

### Grant Permissions
The script requires these permissions:
- Gmail read access
- Gmail modify access (to remove labels)
- Google Drive file creation access

### Set Up Daily Trigger
1. Click the clock icon in Apps Script
2. Add Trigger with these settings:
   - Function: saveGainCapitalEmailsAsPDF
   - Event: Time-driven
   - Type: Day timer
   - Time: After daily email receipt (suggested: 11 PM)

## Troubleshooting

### Common Issues
1. "Label not found" error → Create Gmail label first
2. "No emails to process" → Apply label to test emails manually
3. Permission errors → Re-run authorization flow

### Verification Steps
1. Check execution log for processing confirmations
2. Verify GainCapital_Archive folder creation in Google Drive
3. Confirm PDF content includes email headers and trading data

## Customization Options

You can modify the script to:
- Change PDF naming convention
- Use different Gmail labels
- Save to different Google Drive folders
- Process different email types

## Monthly NotebookLM Workflow

1. Download all monthly PDFs from Google Drive
2. Combine into single monthly PDF using PDF merger tool
3. Upload combined PDF to Google NotebookLM
4. Use AI to analyze trading patterns and performance
