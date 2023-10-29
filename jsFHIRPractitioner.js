function registrarProfesionalFHIR(verb, id) {
    debugger;
    $("#containerLogin").hide();
    $("#containerLoad").show();
    var tmpLabel = "Registrando Recurso Practitioner";
    if (verb == "update") {
        tmpLabel = "Actualizando Recurso Practitioner";
    }//IF
    $("#labelLoad").html(tmpLabel);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var tmpJSONPractitioner = {
        "resourceType": "Practitioner",
        "identifier": [
            {
                "use": "official",
                "type": {
                    "text": "Documento de identidad"
                },
                "value": $("#txtIdProfesional").val()
            },
            {
                "use": "secondary",
                "type": {
                    "text": "Registro medico"
                },
                "value": $("#txtRegistroMedico").val()
            }
        ],
        "active": true,
        "name": [
            {
                "use": "official",
                "text": $("#txtNombreMedico").val()
            }
        ]
    };
    var tmpMethod = "POST";
    var tmpUrl = "https://hapi.fhir.org/baseR4/Practitioner";
    if (verb == "update") {
        tmpMethod = "PUT";
        tmpUrl = "https://hapi.fhir.org/baseR4/Practitioner/" + id;
        tmpJSONPractitioner["id"] = id;
    }//IF
    var requestOptions = {
        method: tmpMethod,
        headers: myHeaders,
        body: JSON.stringify(tmpJSONPractitioner),
        redirect: 'follow'
    };

    fetch(tmpUrl, requestOptions)
        .then(response => response.text())
        .then(result => {
            debugger;
            console.log(result);
            var responsePractitioner = JSON.parse(result);
            $("#hddnIdPractitioner").val(responsePractitioner["id"]);
            $("#containerLoad").hide();
            $("#containerPaciente").show();
        })
        .catch(error => console.log('error', error));
}




/**
 * 
 */
function buscarProfesionalFHIR() {
    $("#containerLogin").hide();
    $("#containerLoad").show();
    $("#labelLoad").html("Consultando Recurso Practitioner");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("https://hapi.fhir.org/baseR4/Practitioner?identifier=" + $("#txtIdProfesional").val(), requestOptions)
        .then(response => response.text())
        .then(result => {
            debugger;
            var responsePractitioner = JSON.parse(result);
            output1 = responsePractitioner.hasOwnProperty('entry');
            if (output1 == false) {
                registrarProfesionalFHIR("create", "");
            } else {
                registrarProfesionalFHIR("update", responsePractitioner["entry"][0]["resource"]["id"]);
            }
        })
        .catch(error => console.log('error', error));
}