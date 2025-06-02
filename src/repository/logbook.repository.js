const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getLogbookBySubmissionID(submissionId) {
  const rows = await db.query(
    `SELECT * FROM tbllogbook WHERE SubmissionID='${submissionId}'`
  );
  const data = helper.emptyOrRows(rows);
  return data;
}

async function getLogbookMentorship(mentorId) {
  const rows = await db.query(
    `SELECT pt.Color,l.* FROM tblsubmission s INNER JOIN tbllogbook l ON s.SubmissionID = l.SubmissionID INNER JOIN tblprogramtype pt ON s.ProgramType = pt.ProgramName WHERE s.SubmissionID IN (SELECT SubmissionID FROM tblsubmission WHERE LecturerGuardianID = '${mentorId}')`
  );
  const data = helper.emptyOrRows(rows);
  return data;
}

async function createLogbook(logbook) {
  const dateObject = new Date(logbook.Date);

  const result = await db.query(
    `INSERT INTO tbllogbook (SubmissionID, Date, Label, Deskripsi) VALUES(?,?,?,?)`,
    [logbook.SubmissionID, dateObject, logbook.Label, logbook.Deskripsi]
  );

  let message = "Error in submitting logbook";

  if (result.affectedRows) {
    message = "Logbook created successfully";
  }

  return { message };
}

async function getFinalReportBySubmissionId(submissionId) {
  const query = `
    SELECT *
    FROM tbllaporanakhirattachment
    WHERE SubmissionID = ?
  `;
  const result = await db.query(query, [submissionId]);
  return result;
}

// approve Final report
async function approveFinalReport(reportId, accessId) {
  if (!reportId?.id) {
    throw new Error("reportId.id tidak boleh kosong");
  }

  let status;

  if (accessId === 2) {
    status = 'TU Approve';
  } else if (accessId === 4) {
    status = 'KPS Approve';
  } else {
    throw new Error("Akses ID tidak dikenali");
  }

  const query = `
    UPDATE tbllaporanakhirattachment
    SET status = ?, Comment = NULL
    WHERE LAAttachmentID = ?
  `;

  const result = await db.query(query, [status, reportId.id]);
  return result;
}


// reject Final Report
async function rejectFinalReport(reportId, accessId, note) {
  if (!reportId?.id || !note) {
    throw new Error("reportId.id dan note tidak boleh kosong");
  }

  let status;

  if (accessId === 2) {
    status = 'TU Reject';
  } else if (accessId === 4) {
    status = 'KPS Reject';
  } else {
    throw new Error("Akses ID tidak dikenali");
  }

  const query = `
    UPDATE tbllaporanakhirattachment
    SET status = ?, Comment = ?
    WHERE LAAttachmentID = ?
  `;

  const result = await db.query(query, [status, note, reportId.id]);
  return result;
}


async function deleteFinalReportById(id) {
  await db.query(
    `DELETE FROM tbllaporanakhirattachment WHERE LAAttachmentID = '${id}'`
  );

  let message = "Submission has been deleted";

  return { message };
}

//Kuisioner
async function createKuisioner(data) {
  let evaluasi = null;

  try {
    evaluasi = data.evaluasi ? JSON.parse(data.evaluasi) : null;
  } catch (e) {
    console.error("Invalid JSON format in evaluasi");
  }

  // Pastikan data tidak mengandung undefined
  const values = [
    data.userId ?? null,
    evaluasi ?? null,
    data.kesan ?? null,
    data.kendala ?? null,
    data.masukan ?? null,
  ];


  const result = await db.query(
    `INSERT INTO tbllaporanakhirkuisioner (UserID, evaluasi, kesan, kendala, masukan) VALUES(?,?,?,?,?)`,
    values
  );

  let message = "Error in submitting quisioner, please contact admin";

  if (result.affectedRows) {
    message = "Quisioner added successfully";
  }
  return { message };
}

async function getKuisioner(data) {
  const result = await db.query(
    `
      SELECT * FROM tbllaporanakhirkuisioner WHERE UserID = '${data.userId}' 
    `
  );
  const hasil = helper.emptyOrRows(result);
  return hasil;
}

module.exports = {
  getLogbookBySubmissionID,
  getLogbookMentorship,
  createLogbook,
  getFinalReportBySubmissionId,
  deleteFinalReportById,
  createKuisioner,
  getKuisioner,
  approveFinalReport,
  rejectFinalReport
};
