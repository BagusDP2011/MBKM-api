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


async function getFinalReportBySubmissionId(submissionId) {
  const result = await logbookRepo.getFinalReportBySubmissionId(submissionId);
  const subAttachment = result.map(item => ({
    ...item,
    Base64: item.Base64?.toString('base64')
}));
  return subAttachment
}


async function uploadFinalReport(submissionId, attachment) {
  return await attachmentRepo.addAttachmentFinalReport(submissionId, attachment);
}

const deleteFinalReportById = async (id) => {
  const result = await logbookRepo.deleteFinalReportById(id);
  return result;
};
const approveFinalReport = async (reportId, accessId) => {
  const result = await logbookRepo.approveFinalReport(reportId, accessId);
  return result;
};
const rejectFinalReport = async (reportId, accessId, note) => {
  const result = await logbookRepo.rejectFinalReport(reportId, accessId, note);
  return result;
};

//Kuisioner
async function createKuisioner(data) {
  return await logbookRepo.createKuisioner(data);
}
async function getKuisioner(data) {
  return await logbookRepo.getKuisioner(data);
}
module.exports = {
  createLogbook,
  getLogbookBySubmissionID,
  getLogbookMentorship,
  uploadFinalReport,
  getFinalReportBySubmissionId,
  deleteFinalReportById,
  createKuisioner,
  getKuisioner,
  approveFinalReport,
  rejectFinalReport
};
