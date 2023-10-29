function registrarPacienteFHIR(verb, id) {
    debugger;
    $("#containerPaciente").hide();
    $("#containerLoad").show();
    var tmpLabel = "Registrando Recurso Patient";
    if (verb == "update") {
        tmpLabel = "Actualizando Recurso Patient";
    }//IF
    $("#labelLoad").html(tmpLabel);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var tmpGender = $("#slctSexoPaciente").val() == "M" ? "male" : "female";
    var tmpJSONPatient = {
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
    };
    var tmpMethod = "POST";
    var tmpUrl = "https://hapi.fhir.org/baseR4/Patient";
    if (verb == "update") {
        tmpMethod = "PUT";
        tmpUrl = "https://hapi.fhir.org/baseR4/Patient/" + id;
        tmpJSONPatient["id"] = id;
    }//IF
    var requestOptions = {
        method: tmpMethod,
        headers: myHeaders,
        body: JSON.stringify(tmpJSONPatient),
        redirect: 'follow'
    };

    fetch(tmpUrl, requestOptions)
        .then(response => response.text())
        .then(result => {
            debugger;
            var responsePatient = JSON.parse(result);
            $("#hddnIdPatient").val(responsePatient["id"]);
            $("#containerLoad").hide();
            $("#containerFormulario").show();
        })
        .catch(error => console.log('error', error));
}



/**
 * 
 */
/**
 * 
 */
function buscarPacienteFHIR() {
    $("#containerPaciente").hide();
    $("#containerLoad").show();
    $("#labelLoad").html("Consultando Recurso Practitioner");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://hapi.fhir.org/baseR4/Patient?identifier=" + $("#txtIdentificacionPaciente").val(), requestOptions)
        .then(response => response.text())
        .then(result => {
            debugger;
            var responsePatient = JSON.parse(result);
            output1 = responsePatient.hasOwnProperty('entry');
            if (output1 == false) {
                registrarPacienteFHIR("create", "");
            } else {
                registrarPacienteFHIR("update", responsePatient["entry"][0]["resource"]["id"]);
            }
        })
        .catch(error => console.log('error', error));
}