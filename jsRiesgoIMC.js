/*
IMC
Fórmula: peso (kg) / [estatura (m)]2
Con el sistema métrico, la fórmula para el IMC es el peso en kilogramos dividido por la estatura en metros cuadrados. Debido a que la estatura por lo general se mide en centímetros, divida la estatura en centímetros por 100 para obtener la estatura en metros.
Ejemplo: Peso = 68 kg, Estatura = 165 cm (1.65 m)
Cálculo: 68 ÷ (1.65)2 = 24.98
*/
let constantIMC = null;
function calcularRiesgoIMC() {
    var constantIMC = ($("#txtPesoPaciente").val() / (($("#txtEstaturaPaciente").val() / 100) * 2)).toFixed(2);;
    var tmpResultadoIMC = "";
    if (constantIMC < 18.5) {
        tmpResultadoIMC = "Bajo Peso";
    } else if (constantIMC >= 18.5 && constantIMC < 25) {
        tmpResultadoIMC = "Normal";
    } else if (constantIMC >= 25 && constantIMC < 30) {
        tmpResultadoIMC = "Sobrepeso";
    } else if (constantIMC >= 30) {
        tmpResultadoIMC = "Obesidad";
    }
    $("#divIMC").html(`${constantIMC} - <span style='font-weight:bolder;'>${tmpResultadoIMC}</span>`);
}