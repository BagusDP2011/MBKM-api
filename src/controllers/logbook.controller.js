const logbookService = require("../services/logbook.service");

async function getLogbookBySubmissionID(req, res, next) {
  try {
    res.json(
      await logbookService.getLogbookBySubmissionID(req.params.submissionId)
    );
  } catch (err) {
    console.error(`Error while get logbook`, err.message);
    next(err);
  }
}

async function getLogbookMentorship(req, res, next) {
  try {
    res.json(await logbookService.getLogbookMentorship(req.user.id));
  } catch (err) {
    console.error(`Error while get logbook`, err.message);
    next(err);
  }
}

async function createLogbook(req, res, next) {
  try {
    res.json(await logbookService.createLogbook(req.body));
  } catch (err) {
    console.error(`Error while create logbook`, err.message);
    next(err);
  }
}

// upload final report
async function submitFinalReport(req, res, next) {
  const item = req.body;
  const submissionId = item.submissionID;
  try {
    res.json(await logbookService.uploadFinalReport(submissionId, item));
  } catch (err) {
    console.error(`Error while submit submission`, err.message);
    next(err);
  }
}
// approve final report
async function approveFinalReport(req, res, next) {
  const reportId = req.params;
  const { accessId } = req.body;
  try {
    res.json(await logbookService.approveFinalReport(reportId, accessId));
  } catch (err) {
    console.error(`Error while submit item`, err.message);
    next(err);
  }
}
// reject final report
async function rejectFinalReport(req, res, next) {
  const reportId = req.params;
  const { accessId, note } = req.body;
  try {
    res.json(await logbookService.rejectFinalReport(reportId, accessId, note));
  } catch (err) {
    console.error(`Error while submit item`, err.message);
    next(err);
  }
}

async function getFinalReport(req, res, next) {
  const submissionId = req.query.SubmissionID;
  // const userId = req.user.id;

  if (!submissionId) {
    return res.status(400).json({ message: "SubmissionID  belum tersedia." });
  }
  try {
    const result = await logbookService.getFinalReportBySubmissionId(
      submissionId
    );
    const data = Array.isArray(result) ? result : result ? [result] : [];
    if (data.length === 0) {
      res.json({ message: "Belum ada file yg di upload." });
    } else if (data.length > 0) {
      res.json({ result: data });
    } else {
      res
        .status(404)
        .json({ message: "No final report found for this submission ID" });
    }
  } catch (err) {
    console.error("Error while getting final report", err.message);
    next(err);
  }
}

const deleteFinalReport = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await logbookService.deleteFinalReportById(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Final report not found or not authorized to delete",
      });
    }

    return res
      .status(200)
      .json({ message: "Final report deleted successfully" });
  } catch (error) {
    console.error("Error deleting final report:", error.message);
    next(error);
  }
};

//kuisioner
async function createKuisioner(req, res, next) {
  try {
    res.json(await logbookService.createKuisioner(req.body));
  } catch (err) {
    console.error(`Error while adding Quisioner`, err.message);
    next(err);
  }
}

async function getKuisioner(req, res, next) {
  try {
    res.json(await logbookService.getKuisioner(req.body));
  } catch (err) {
    console.error(`Error while adding Quisioner`, err.message);
    next(err);
  }
}

async function addRowHasil(req, res, next) {
  try {
    const { Kode_Matkul, Nama_Matkul, Nilai, Predikat, StudentID, SubmissionID } = req.body;
    res.json(
      await logbookService.addRowHasil(
        Kode_Matkul,
        Nama_Matkul,
        Nilai,
        Predikat,
        StudentID,
        SubmissionID
      )
    );
  } catch (err) {
    console.error(`Error while adding hasil nilai ke table`, err.message);
    next(err);
  }
}

async function getRowHasil(req, res, next) {
  try {
    const UserID = req.params.UserID;

    res.json(await logbookService.getRowHasil(UserID));
  } catch (err) {
    console.error(`Error while adding mencari hasil nilai table`, err.message);
    next(err);
  }
}

async function deleteHasilLaporan(req, res, next) {
  try {
    const HasilID = req.params.HasilID;
    res.json(await logbookService.deleteHasilLaporan(HasilID));
  } catch (err) {
    console.error(`Error while adding mencari hasil nilai table`, err.message);
    next(err);
  }
}

module.exports = {
  getLogbookBySubmissionID,
  getLogbookMentorship,
  createLogbook,
  submitFinalReport,
  getFinalReport,
  deleteFinalReport,
  createKuisioner,
  getKuisioner,
  approveFinalReport,
  rejectFinalReport,
  addRowHasil,
  getRowHasil,
  deleteHasilLaporan,
};
