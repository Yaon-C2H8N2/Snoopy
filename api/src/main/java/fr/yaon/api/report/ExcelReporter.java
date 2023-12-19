package fr.yaon.api.report;

import fr.yaon.api.repositories.EmployeRepository;
import fr.yaon.api.repositories.PrestationInterventionRepository;
import fr.yaon.api.web.models.Employe;
import fr.yaon.api.web.models.PrestationIntervention;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Bean;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ExcelReporter {
    private PrestationInterventionRepository prestationInterventionRepository;

    private EmployeRepository employeRepository;

    public ExcelReporter(
            PrestationInterventionRepository prestationInterventionRepository,
            EmployeRepository employeRepository
    ) {
        this.prestationInterventionRepository = prestationInterventionRepository;
        this.employeRepository = employeRepository;
    }

    private Map<String, Object> initReportData(){
        Map<String, Object> reportData = new HashMap<>();

        reportData.put("TYPE_PRESTATION", null);
        reportData.put("INTERVENANT_1", null);
        reportData.put("INTERVENANT_2", null);
        reportData.put("INTERVENANT_3", null);
        reportData.put("INTERVENANT_4", null);
        reportData.put("INTERVENANT_5", null);
        reportData.put("NOM_PRESTATION", null);
        reportData.put("NOM_CLIENT", null);
        reportData.put("INTERIEUR_EXTERIEUR", null);
        reportData.put("DETAIL_PRESTATION", null);
        reportData.put("HEURE_DEBUT", null);
        reportData.put("HEURE_FIN", null);
        reportData.put("CONFIRMATION_SIGNATURE", null);
        reportData.put("SIGNATURE_CLIENT", null);
        reportData.put("COMMENTAIRES_PRESTATION", null);

        return reportData;
    }

    public byte[] generatePrestationReport(int idPrestationIntervention) {
        try{
            Map<String, Object> reportData = this.initReportData();
            PrestationIntervention prestationIntervention = prestationInterventionRepository.findByIdPrestationIntervention(idPrestationIntervention);
            List<Employe> employes = employeRepository.findAllByPrestationInterventionId(idPrestationIntervention);

            for (int i = 0; i < employes.size(); i++) {
                reportData.put("INTERVENANT_" + (i+1), employes.get(i).getPrenom()+" "+employes.get(i).getNom());
            }

            FileInputStream file = new FileInputStream("src/main/resources/edition/template/edition_bon.xlsx");
            XSSFWorkbook workbook = new XSSFWorkbook(file);

            for(Row row: workbook.getSheetAt(0)){
                for(Cell cell: row){
                    if(cell.getCellType() == CellType.STRING){
                        String cellValue = cell.getStringCellValue();
                        if(reportData.containsKey(cellValue)){
                            String value = reportData.get(cellValue) == null ? "" : reportData.get(cellValue).toString();
                            cell.setCellValue(value);
                        }
                    }
                }
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);

            return out.toByteArray();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
