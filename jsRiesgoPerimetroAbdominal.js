/*
Se utiliza esta URL para realizar el analisis del indice de perimetro abdominal
https://mundoentrenamiento.com/perimetro-abdominal-y-riesgo-de-muerte/
*/
function calcularRiesgoPerimetroAbdominal() {
    var tmpPerimetroAbdominal = $("#txtPerimetroAbdominalPaciente").val();
    switch ($("#slctSexoPaciente").val()) {
        case "M"://Masculino
            if (tmpPerimetroAbdominal <= 95) {
                tmpResultadoPerimetroAbdominal = "Normal";
            } else if (tmpPerimetroAbdominal > 95 && tmpPerimetroAbdominal <= 101) {
                tmpResultadoPerimetroAbdominal = "Riesgo elevado";
            } else if (tmpPerimetroAbdominal > 101) {
                tmpResultadoPerimetroAbdominal = "Riesgo muy elevado";
            }//IF
            break;
        case "F"://Femenino
            if (tmpPerimetroAbdominal <= 82) {
                tmpResultadoPerimetroAbdominal = "Normal";
            } else if (tmpPerimetroAbdominal > 82 && tmpPerimetroAbdominal <= 87) {
                tmpResultadoPerimetroAbdominal = "Riesgo elevado";
            } else if (tmpPerimetroAbdominal > 87) {
                tmpResultadoPerimetroAbdominal = "Riesgo muy elevado";
            }//IF
            break;
    }//SWITCH
    $("#divPerimetroAbdominal").html(`${tmpPerimetroAbdominal} - <span style='font-weight:bolder;'>${tmpResultadoPerimetroAbdominal}</span>`);
}