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

async function deleteFinalReportById(id) {
  await db.query(
    `DELETE FROM tbllaporanakhirattachment WHERE LAAttachmentID = '${id}'`
  );

  let message = "Submission has been deleted";

  return { message };
}

module.exports = {
  getLogbookBySubmissionID,
  getLogbookMentorship,
  createLogbook,
  getFinalReportBySubmissionId,
  deleteFinalReportById
};
