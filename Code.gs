/**
 * Saves Gain Capital trading emails as PDFs to Google Drive
 * Customized for daily forex trading confirmations
 */
function saveGainCapitalEmailsAsPDF() {
  // Get emails with the "GainCapitalReports" label
  let label = GmailApp.getUserLabelByName("GainCapitalReports");
  if (!label) {
    console.log("Label 'GainCapitalReports' not found. Please create it first.");
    return;
  }
  
  let threads = label.getThreads();
  console.log(`Found ${threads.length} email threads to process`);

  // Get or create the "GainCapital_Archive" folder in Google Drive
  let folders = DriveApp.getFoldersByName("GainCapital_Archive");
  let folder;
  if (!folders.hasNext()) {
    folder = DriveApp.createFolder("GainCapital_Archive");
    console.log("Created new folder: GainCapital_Archive");
  } else {
    folder = folders.next();
  }

  // Process each email thread
  let processedCount = 0;
  for (let i = 0; i < threads.length; i++) {
    let messages = threads[i].getMessages();
    let firstMessage = messages[0];
    
    // Get email details
    let subject = threads[i].getFirstMessageSubject();
    let date = firstMessage.getDate();
    let sender = firstMessage.getFrom();
    
    // Create filename with date and account info
    let dateStr = Utilities.formatDate(date, "GMT", "yyyy-MM-dd");
    let pdfName = `GainCapital_Daily_${dateStr}`;
    
    // Check if PDF already exists to avoid duplicates
    let existingFiles = folder.getFilesByName(pdfName + ".pdf");
    if (existingFiles.hasNext()) {
      console.log(`File already exists: ${pdfName}.pdf - Skipping`);
      continue;
    }
    
    // Get email content (use HTML for better formatting)
    let messageHTML = firstMessage.getBody();
    
    // Add header information to PDF
    let headerHTML = `
      <div style="font-family: Arial, sans-serif; margin-bottom: 20px; border-bottom: 2px solid #ccc; padding-bottom: 10px;">
        <h3>Gain Capital Daily Confirmation</h3>
        <p><strong>Date:</strong> ${dateStr}</p>
        <p><strong>From:</strong> ${sender}</p>
        <p><strong>Subject:</strong> ${subject}</p>
      </div>
    `;
    
    let fullHTML = headerHTML + messageHTML;
    
    try {
      // Generate PDF blob
      let blob = Utilities.newBlob(fullHTML, MimeType.HTML, pdfName).getAs(MimeType.PDF);
      
      // Create the PDF file in the folder
      let file = folder.createFile(blob);
      console.log(`Created PDF: ${pdfName}.pdf`);
      
      // Remove the label from processed email
      threads[i].removeLabel(label);
      processedCount++;
      
    } catch (error) {
      console.log(`Error processing email ${pdfName}: ${error.toString()}`);
    }
  }
  
  console.log(`Successfully processed ${processedCount} emails`);
}

/**
 * Test function to process just one email (for testing)
 */
function testSingleEmail() {
  let label = GmailApp.getUserLabelByName("GainCapitalReports");
  let threads = label.getThreads(0, 1); // Get just 1 email
  
  if (threads.length > 0) {
    console.log("Testing with one email...");
    // Process the single email using same logic
    saveGainCapitalEmailsAsPDF();
  } else {
    console.log("No emails found with GainCapitalReports label");
  }
}
