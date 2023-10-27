function registrarPacienteFHIR() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var tmpGender = $("#slctSexoPaciente").val() == "M" ? "male" : "female";
    var raw = JSON.stringify({
        "resourceType": "Patient",
        "identifier": [
            {
                "use": "official",
                "type": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                            "code": "NNCOL"
                        },
                        {
                            "system": "http://terminology.hl7co.org/CodeSystem/ColombianPersonIdentifiers",
                            "code": $("#slcTipoIdentificacionPaciente").val(),
                            "display": $("#slcTipoIdentificacionPaciente option:selected").text()
                        }
                    ],
                    "text": "Medical Record Number"
                },
                "value": $("#txtIdentificacionPaciente").val()
            }
        ],
        "active": true,
        "name": [
            {
                "family": $("#txtNombresPaciente").val() + " " + $("#txtApellidosPaciente").val(),
                "given": [
                    $("#txtNombresPaciente").val(),
                    $("#txtApellidosPaciente").val()
                ],
                "use": "official"
            }
        ],
        "gender": tmpGender
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://hapi.fhir.org/baseR4/Patient", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            var responsePatient = JSON.parse(result);
            $("#hddnIdPatient").val(responsePatient["id"])
        })
        .catch(error => console.log('error', error));
}