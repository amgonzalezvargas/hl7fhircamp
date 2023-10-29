function calcularRiesgoFramingham() {
    /*
        Se utiliza esta URL para realizar el anaslisis del indice de Framingham
        https://www.msdmanuals.com/medical-calculators/Framingham08_M-es.htm
    */
    const edad = $("#txtEdadPaciente").val();
    const colesterolTotal = $("#txtColesterolTotalPaciente").val();
    const colesterolHDL = $("#txtColesterolHDLPaciente").val();
    const presionArterialSistolica = $("#txtTASistolicaPaciente").val();
    const noFumador = $("#slctFumadorCigarrillosPaciente").val(); // 1 si no fuma, 0 si fuma
    const diabetes = $("#slctDiagnosticoDiabetesEnFamiliaPaciente").val();
    /*
    const factorEdad = Math.pow(0.95012, edad - 20);
    const factorColesterol = Math.pow(0.98767, colesterolTotal - 160);
    const factorEdadColesterolHDL = Math.pow(1.00631, (edad * colesterolHDL) - (20 * 40));
    const factorPresionArterial = Math.pow(1.01277, presionArterialSistolica - 120);
    const factorNoFumador = Math.pow(0.99341, noFumador);
    const factorDiabetes = Math.pow(1.59914, diabetes);
    const riesgo = 1 - (factorEdad * factorColesterol * factorEdadColesterolHDL * factorPresionArterial * factorNoFumador * factorDiabetes);
    */
    debugger;
    var tmpFactorRiesgo = (Math.log(edad) * 3.06117) + (Math.log(colesterolTotal) * 1.12370) - (Math.log(colesterolHDL) * 0.93263) + (Math.log(presionArterialSistolica) * presionArterialSistolica) + noFumador + diabetes - 23.9802;
    var tmpRiesgo = 100 * (1 - power(0.88936, eTo(tmpFactorRiesgo)));


    if (tmpRiesgo <= 10) {
        tmpResultadoFramingham = "Nivel de riesgo bajo";
    } else if (tmpRiesgo > 10 && tmpRiesgo <= 20) {
        tmpResultadoFramingham = "Nivel de riesgo intermedio";
    } else if (tmpRiesgo > 20) {
        tmpResultadoFramingham = "Nivel de riesgo alto";
    }
    $("#divFramingham").html(`${tmpRiesgo} - <span style='font-weight:bolder;'>${tmpResultadoFramingham}</span>`);
}



function power(x, y) {
    return Math.pow(x, y);
}
function eTo(x) {
    return Math.exp(x);
}