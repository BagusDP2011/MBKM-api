const logbookRepo = require("../repository/logbook.repository");
const attachmentRepo = require("../repository/attachment.repository")

async function createLogbook(logbook) {
  return await logbookRepo.createLogbook(logbook);
}

async function getLogbookBySubmissionID(submissionId) {
  let logbooks = await logbookRepo.getLogbookBySubmissionID(submissionId);
  return logbooks.map((item) => ({
    ...item,
    Date: formatDate(item.Date),
  }));
}

async function getLogbookMentorship(mentorId) {
  let logbooks = await logbookRepo.getLogbookMentorship(mentorId);
  return logbooks.map((item) => ({
    ...item,
    Date: formatDate(item.Date),
  }));
}

const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};


async function getFinalReportBySubmissionId(submissionId, userId) {
  return await logbookRepo.getFinalReportBySubmissionId(submissionId, userId);;
}


async function uploadFinalReport(submissionId, attachment) {
  return await attachmentRepo.addAttachmentFinalReport(submissionId, attachment);
}

const deleteFinalReportById = async (id) => {
  const result = await logbookRepo.deleteFinalReportById(id);
  return result;
};

module.exports = {
  createLogbook,
  getLogbookBySubmissionID,
  getLogbookMentorship,
  uploadFinalReport,
  getFinalReportBySubmissionId,
  deleteFinalReportById
};
