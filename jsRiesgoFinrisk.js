/*
Se utiliza esta URL para realizar el anaslisis del indice de FINRISK
https://escueladesalud.castillalamancha.es/sites/escueladesalud.castillalamancha.es/files/documentos/escala_findrisc_0.pdf
*/
function calcularRiesgoFinrisk() {
    var tmPuntaje = 0;
    //validacion de la edad
    if ($("#txtEdadPaciente").val() < 45) {
        tmPuntaje += 0;
    } else if ($("#txtEdadPaciente").val() >= 45 && $("#txtEdadPaciente").val() <= 54) {
        tmPuntaje += 2;
    } else if ($("#txtEdadPaciente").val() >= 54 && $("#txtEdadPaciente").val() < 64) {
        tmPuntaje += 3;
    } else if ($("#txtEdadPaciente").val() >= 64) {
        tmPuntaje += 4;
    }//IF
    //validacion del IMC
    if (constantIMC <= 25) {
        tmPuntaje += 0;
    } else if (constantIMC > 25 && constantIMC <= 30) {
        tmPuntaje += 1;
    } else if (constantIMC > 30) {
        tmPuntaje += 2;
    }//IF
    //validacion del permietro abdominal 
    tmpPerimetroAbdominal = $("#txtPerimetroAbdominalPaciente").val();
    switch ($("#slctSexoPaciente").val()) {
        case "M"://Masculino
            if (tmpPerimetroAbdominal < 94) {
                tmPuntaje += 0;
            } else if (tmpPerimetroAbdominal >= 94 && tmpPerimetroAbdominal <= 102) {
                tmPuntaje += 3;
            } else if (tmpPerimetroAbdominal > 102) {
                tmPuntaje += 4;
            }//IF
            break;
        case "F"://Femenino
            if (tmpPerimetroAbdominal < 80) {
                tmPuntaje += 0;
            } else if (tmpPerimetroAbdominal >= 80 && tmpPerimetroAbdominal <= 88) {
                tmPuntaje += 3;
            } else if (tmpPerimetroAbdominal > 88) {
                tmPuntaje += 4;
            }//IF
            break;
    }//SWITCH
    tmPuntaje += ($("#slctActividadFisicaPaciente").val() == 0) ? 2 : 0;
    tmPuntaje += ($("#slctAlimentacionFrutasVerdurasPaciente").val() == 0) ? 0 : 1;
    tmPuntaje += ($("#slctMedicacionHipertensionPaciente").val() == 0) ? 0 : 2;
    tmPuntaje += ($("#slctDiabetesPaciente").val() == 0) ? 0 : 5;
    switch ($("#slctDiagnosticoDiabetesEnFamiliaPaciente").val()) {
        case "0": tmPuntaje += 0; break;
        case "1": tmPuntaje += 3; break;
        case "2": tmPuntaje += 5; break;
    }//SWITCH
    var tmpResultadoFinrisc = "";
    if (tmPuntaje < 7) {
        tmpResultadoFinrisc = "Nivel de riesgo bajo";
    } else if (tmPuntaje >= 7 && tmPuntaje <= 11) {
        tmpResultadoFinrisc = "Nivel de riesgo ligeramente elevado";
    } else if (tmPuntaje > 12 && tmPuntaje <= 14) {
        tmpResultadoFinrisc = "Nivel de riesgo moderado";
    } else if (tmPuntaje > 15 && tmPuntaje <= 20) {
        tmpResultadoFinrisc = "Nivel de riesgo alto";
    } else if (tmPuntaje > 20) {
        tmpResultadoFinrisc = "Nivel de riesgo muy alto";
    }//IF
    $("#divFindrisc").html(`${tmPuntaje} - <span style='font-weight:bolder;'>${tmpResultadoFinrisc}</span>`);
}