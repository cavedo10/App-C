let pacientes = document.querySelectorAll(".paciente");


for (let i = 0; i < pacientes.length; i++){
    let paciente = pacientes[i];
    let peso = paciente.querySelector(".info-peso").textContent;
    let altura = paciente.querySelector(".info-altura").textContent;

    let tdImc = paciente.querySelector(".info-imc");

    let pesoEhValido = validaPeso(peso);
    let alturaEhValida = validaAltura(altura);

    if (!pesoEhValido) {
        alert("Peso invalido!");
        pesoEhValido = false;
        paciente.classList.add("paciente-invalido");
    }if (!alturaEhValida) {
        alert("Altura invalida!");
        alturaEhValida = false;
        paciente.classList.add("paciente-invalido");
    }if (pesoEhValido && alturaEhValida ) {
        let imc = calculaImc(peso,altura);
        tdImc.textContent = imc;
    }
}
//-------------------------------------------------------------------------------
function calculaImc (peso,altura) {
    let imc = 0;
    imc = peso / (altura * altura);
    return imc.toFixed(2);
}

function validaPeso(peso){
    if (peso > 0 && peso < 400){
        return true;
    }else {
        return false;
    }
}

function validaAltura(altura){
    if (altura > 0 && altura < 3.00 ) {
        return true;
    }else {
        return false
    }
}






