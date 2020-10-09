let botaoAdicionar = document.querySelector("#adicionar-paciente");
const localStorageParticipantes = JSON
.parse(localStorage.getItem("participantes"));
let participantes = localStorage
.getItem("participantes")!== null ? localStorageParticipantes : [];
const generateId = ()=> Math.round( Math.random()*1000);

botaoAdicionar.addEventListener("click", function(){
    event.preventDefault();
    let form = document.querySelector("#form-adiciona");
    let paciente = obtemPacienteDoFormulario(form);
    let erros = validaPaciente(paciente);

    if(erros.length > 0){
        exibeMensagensDeErro(erros);
        return;
    }
    participantes.push(paciente);
 

    atualizaLocalStorage();
    exibeParticipantes()
    form.reset();

    let mensagemDeErro = document.querySelector("#mensagens-erro");
    mensagemDeErro.innerHTML = "";
   
})
//----------------------------------------------------------------

function adicionaPacienteNaTabela(participantes){
    let pacienteTr = montaTr(participantes);
    let tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function obtemPacienteDoFormulario(form) {
    let paciente = {
        id: generateId(),
        nome: form.nome.value,
        data: moment().format('DD/MM/YYYY'),
        peso: form.peso.value,
        altura: form.altura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}

function montaTd (dado,classe) {
    let td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;
    return td;
}
function montaTr (paciente) {
    let pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.data, "info-data") );
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    
    return pacienteTr;
}
function validaPaciente(paciente) {
   let erros = [];

   if(paciente.nome.length == 0){
    erros.push("O nome esta em branco!");
   }

   if(paciente.peso.length == 0){
       erros.push("O peso esta em branco!");
   }

   if(paciente.altura.length == 0){
       erros.push("A altura esta em branco!");
   }

   if(!validaPeso(paciente.peso)){
        erros.push("Peso é invalido!");
   }

   if(!validaAltura(paciente.altura)){
       erros.push("Altura é invalida");
   }
   return erros;
}

function exibeMensagensDeErro(erros) {
    let ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = "";

    erros.forEach(function(erro) {
        let li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

const atualizaLocalStorage = () =>{
    localStorage.setItem("participantes", JSON.stringify(participantes))
}

const exibeParticipantes = () => {
    let tabela = document.querySelector("#tabela-pacientes");
    tabela.innerHTML= "";
    participantes.forEach(participante =>{
       adicionaPacienteNaTabela(participante); 

        
    });
    
}



exibeParticipantes();
