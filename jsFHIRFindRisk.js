function verListadoRiesgosDelDia() {
    $("#containerFormulario").hide();
    $("#containerLoad").show();
    var tmpLabel = "Cargando Recurso FindRisk";
    $("#labelLoad").html(tmpLabel);
    let yourDate = new Date()
    yourDate.toISOString().split('T')[0]
    console.log(yourDate);

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://hapi.fhir.org/baseR4/RiskAssessment?_lastUpdated=ge2023-10-01T00:00:00&_lastUpdated=le2023-10-31T23:59:59", requestOptions)
        .then(response => response.text())
        .then(result => {
            debugger;
            var responseRisk = JSON.parse(result);
            for (i = 0; i <= responseRisk["entry"].length; i++) {
                var tmpRisk = responseRisk["entry"][i]["resource"];
                console.log(tmpRisk);
            }//FOR
        })
        .catch(error => console.log('error', error));
}





$("#btnVerRiesgoDelPaciente").click(function () {
    verListadoRiesgosDelDia();
});