const CONFIG = {
  labelName: 'GainCapitalReports',
  archiveFolderName: 'GainCapital_Archive',
  filePrefix: 'GainCapital_Daily_'
};

/**
 * Processes all labeled confirmation emails and archives each one as a PDF.
 * The Gmail label is removed only after a PDF is created successfully.
 */
function saveGainCapitalEmailsAsPDF() {
  const label = getRequiredLabel_();
  if (!label) return;

  const threads = label.getThreads();
  const folder = getOrCreateArchiveFolder_();

  console.log(`Found ${threads.length} email thread(s) to process.`);
  const processedCount = processThreads_(threads, label, folder);
  console.log(`Successfully processed ${processedCount} email thread(s).`);
}

/**
 * Processes at most one labeled email thread for a controlled test run.
 */
function testSingleEmail() {
  const label = getRequiredLabel_();
  if (!label) return;

  const threads = label.getThreads(0, 1);
  if (threads.length === 0) {
    console.log(`No email threads found with label '${CONFIG.labelName}'.`);
    return;
  }

  const folder = getOrCreateArchiveFolder_();
  console.log('Testing with one email thread.');
  const processedCount = processThreads_(threads, label, folder);
  console.log(`Test processed ${processedCount} email thread(s).`);
}

function getRequiredLabel_() {
  const label = GmailApp.getUserLabelByName(CONFIG.labelName);
  if (!label) {
    console.log(`Label '${CONFIG.labelName}' was not found. Create it before running the archiver.`);
    return null;
  }
  return label;
}

function getOrCreateArchiveFolder_() {
  const folders = DriveApp.getFoldersByName(CONFIG.archiveFolderName);
  if (folders.hasNext()) {
    return folders.next();
  }

  const folder = DriveApp.createFolder(CONFIG.archiveFolderName);
  console.log(`Created archive folder: ${CONFIG.archiveFolderName}`);
  return folder;
}

function processThreads_(threads, label, folder) {
  let processedCount = 0;

  threads.forEach(function(thread) {
    const messages = thread.getMessages();
    if (messages.length === 0) {
      console.log('Skipping an empty email thread.');
      return;
    }

    const firstMessage = messages[0];
    const date = firstMessage.getDate();
    const dateStr = Utilities.formatDate(
      date,
      Session.getScriptTimeZone(),
      'yyyy-MM-dd'
    );
    const pdfName = `${CONFIG.filePrefix}${dateStr}.pdf`;

    if (folder.getFilesByName(pdfName).hasNext()) {
      console.log(`File already exists: ${pdfName}. Skipping duplicate creation.`);
      return;
    }

    try {
      const sender = escapeHtml_(firstMessage.getFrom());
      const subject = escapeHtml_(thread.getFirstMessageSubject());
      const messageHTML = firstMessage.getBody();

      const headerHTML = `
        <div style="font-family: Arial, sans-serif; margin-bottom: 20px; border-bottom: 2px solid #ccc; padding-bottom: 10px;">
          <h3>Gain Capital Daily Confirmation</h3>
          <p><strong>Date:</strong> ${dateStr}</p>
          <p><strong>From:</strong> ${sender}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
      `;

      const blob = Utilities
        .newBlob(headerHTML + messageHTML, MimeType.HTML, pdfName)
        .getAs(MimeType.PDF)
        .setName(pdfName);

      folder.createFile(blob);
      thread.removeLabel(label);
      processedCount++;
      console.log(`Created PDF: ${pdfName}`);
    } catch (error) {
      console.log(`Error processing ${pdfName}: ${error.toString()}`);
    }
  });

  return processedCount;
}

function escapeHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
