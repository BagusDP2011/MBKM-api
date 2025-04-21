const db = require("./db.service");
const helper = require("../utils/helper.util");

async function addAttachment(submissionId, attachment) {
    const base64Data = attachment.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    const bufferData = Buffer.from(base64Data, 'base64');
    const result = await db.query(`INSERT INTO tblsubmissionattachment (SubmissionID,AttachType,Base64,AttachName) VALUES(?,?,?,?)`,
        [
            submissionId,
            'pdf',
            bufferData,
            attachment.name
        ]
    )

    let message = "Error in add Attachment";

    if (result.affectedRows) {  
        message = "Attachment created successfully";
    }
    
    return { message };
}
async function addAttachmentFinalReport(submissionId, attachment) {
    // Periksa apakah ada data di attachment
    if (!attachment || !attachment.Attachment || !attachment.Attachment[0]) {
        throw new Error("Attachment data is missing");
    }

    // Ambil base64 dari array
    const base64String = attachment.Attachment[0];
    const fileName = attachment.filename;

    const base64Data = base64String.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    const bufferData = Buffer.from(base64Data, 'base64');

    const result = await db.query(`INSERT INTO tbllaporanakhirattachment (SubmissionID, AttachType, Base64, AttachmentName) VALUES(?, ?, ?, ?)`, 
        [
            submissionId,
            'pdf',
            bufferData,
            fileName
        ]
    );

    let message = "Error in add Attachment Final Report";

    if (result.affectedRows) {
        message = "Attachment Final Report created successfully";
    }

    return { message };
}


module.exports = {
    addAttachment,
    addAttachmentFinalReport
}