var tabela = document.querySelector("#tabela-pacientes");

tabela.addEventListener("dblclick", function(event){
    
      console.log(event.target);
    
});
const remove = ID => {
    participantes = participantes
    .filter(participante => participante.id !== ID);
    updateLocalStorage();
    exibeParticipantes();
}