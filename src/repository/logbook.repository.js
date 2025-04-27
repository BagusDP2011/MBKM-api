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

async function getFinalReportBySubmissionId(submissionId, userId) {
  const query = `
    SELECT fr.*
    FROM tbllaporanakhirattachment fr
    JOIN tblsubmission s ON fr.SubmissionID = s.SubmissionID
    WHERE s.StudentID = ? AND s.SubmissionID = ?
  `;
  const result = await db.query(query, [userId, submissionId]);
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

  console.log(data);
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
    data.masukan ?? null
  ];

  // Log nilai yang akan dimasukkan ke dalam query
  console.log("Values to insert:", values);

  const result = await db.query(
    `INSERT INTO tbllaporanakhirkuisioner (UserID, evaluasi, kesan, kendala, masukan) VALUES(?,?,?,?,?)`,
    values
  );

  let message = "Error in submitting quisioner, please contact admin";

  if (result.affectedRows) {
    message = "Quisioner added successfully";
  }

  // const result = await db.query(
  //   `INSERT INTO tbllaporanakhirkuisioner (UserID, evaluasi, kesan, kendala, masukan) VALUES(?,?,?,?,?)`,
  //   [data.userId, data.evaluasi, data.kesan, data.kendala, data.masukan]
  // );

  // let message = "Error in submitting quisioner, please contact admin";

  // if (result.affectedRows) {
  //   message = "Quisioner added successfully";
  // }

  return { message };
}


module.exports = {
  getLogbookBySubmissionID,
  getLogbookMentorship,
  createLogbook,
  getFinalReportBySubmissionId,
  deleteFinalReportById,
  createKuisioner,
};
