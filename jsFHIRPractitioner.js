function registrarProfesionalFHIR() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "resourceType": "Practitioner",
        "id": "practitioner12345",
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
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://hapi.fhir.org/baseR4/Practitioner", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            var responsePractitioner = JSON.parse(result);
            $("#hddnIdPractitioner").val(responsePractitioner["id"])
        })
        .catch(error => console.log('error', error));
}