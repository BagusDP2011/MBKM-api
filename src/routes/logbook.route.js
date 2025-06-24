const express = require('express');
const router = express.Router();
const logbookController = require('../controllers/logbook.controller');
const authenticateToken = require('../middlewares/authenticateToken.middleware');

router.post('/logbook', authenticateToken.authenticateToken, logbookController.createLogbook);
router.get('/logbook/get-final-report', authenticateToken.authenticateToken, logbookController.getFinalReport);
router.get('/logbook-mentorship', authenticateToken.authenticateToken, logbookController.getLogbookMentorship);
router.get('/logbook/:submissionId', authenticateToken.authenticateToken, logbookController.getLogbookBySubmissionID);
router.delete('/logbook/delete-final-report/:id', authenticateToken.authenticateToken, logbookController.deleteFinalReport);
router.post('/logbook/upload-final-report', authenticateToken.authenticateToken, logbookController.submitFinalReport);
router.put('/logbook/approve-final-report/:id', authenticateToken.authenticateToken, logbookController.approveFinalReport);
router.put('/logbook/reject-final-report/:id', authenticateToken.authenticateToken, logbookController.rejectFinalReport);

router.post('/kuisioner-get', authenticateToken.authenticateToken, logbookController.getKuisioner);
router.post('/kuisioner', authenticateToken.authenticateToken, logbookController.createKuisioner);

//Konversi nilai
router.get('/hasil-nilai-get/:UserID', authenticateToken.authenticateToken, logbookController.getRowHasil);
router.post('/hasil-nilai-add/:UserID', authenticateToken.authenticateToken, logbookController.addRowHasil);
router.get('/hasil-nilai-delete/:HasilID', authenticateToken.authenticateToken, logbookController.deleteHasilLaporan);
 
module.exports = router;