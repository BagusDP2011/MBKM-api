const db = require("./db.service");
const helper = require("../utils/helper.util");

async function getRowHasil(StudentID) {
  const FindStudentID = StudentID;
  const query = await db.query(`
        SELECT * FROM tblHasilAkhir THA JOIN tbluser u ON THA.StudentID = u.UserID WHERE THA.StudentID = ${FindStudentID}
        `);

  const data = helper.emptyOrRows(query);
  return data;
}

async function addRowHasil(
  Kode_Matkul,
  Nama_Matkul,
  Nilai,
  Predikat,
  StudentID,
  SubmissionID
) {
  const safeValues = [
    Kode_Matkul ?? null,
    Nama_Matkul ?? null,
    Nilai ?? null,
    Predikat ?? null,
    StudentID ?? null,
    SubmissionID ?? null,
  ];

  const query = await db.query(
    `
    INSERT INTO tblHasilAkhir (Kode_Matkul, Nama_Matkul, Nilai, Predikat, StudentID, SubmissionID)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    safeValues
  );

  const data = helper.emptyOrRows(query);
  return data;
}

async function deleteHasilLaporan(HasilID) {
  try {
    const query = await db.query(
      "DELETE FROM tblHasilAkhir WHERE HasilID = ?",
      [HasilID]
    );

    const data = helper.emptyOrRows(query);
    return data;
  } catch (err) {
    console.error("Gagal menghapus hasil laporan:", err);
    res.status(500).json({ message: "Gagal menghapus data." });
  }
}

module.exports = {
  getRowHasil,
  addRowHasil,
  deleteHasilLaporan,
};
