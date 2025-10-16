var botaoAdicionar = document.querySelector("#adicionar-paciente"); //quando adiciona um paciente

botaoAdicionar.addEventListener('click',
    function(event){
        event.preventDefault();
        
        //Seleciona a tag <form> a partir do id
        var formulario = document.querySelector('#form-adiciona');
        
        //Variáveis para acessar o valor do <input>
        var paciente = dadosPacientesFormulario(formulario);
    
         //Cria o elemento <tr>
        var pacienteTr = criaTr(paciente);
        
        //quando essa condição de validar o paciente não for correta, vai retornar o erro
        var erros = validarPaciente(paciente); //O parâmetro é o paciente, pois dentro do paciente há o peso e altura
        
        //Impede de adicionar o paciente e emite mensagem de erro
        
        if(erros.length > 0){ //comprimento 0 é porque está certo (true), o falso tem um comprimento maior que 0

            exibirMensagemErro(erros); //chamando a função antes de criar
            return; 
        }

         var tabela = document.querySelector("#tabela-pacientes");
         tabela.appendChild(pacienteTr);

         let mensagemErro = document.querySelector("#mensagens-erro");
         formulario.reset(); //Reseta o campo do formulário
    }
);

function dadosPacientesFormulario(formulario){
    //Objeto paciente 
    var paciente = {
        nome: formulario.nome.value,
        peso: formulario.peso.value,
        altura: formulario.altura.value,
        gordura: formulario.gordura.value,
        IMC: calculaIMC(formulario.peso.value, formulario.altura.value)
    }
    return paciente;
}

//criação da função com o parâmetro "paciente"
function criaTr(paciente){  
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

     //cria as tag <td>
     pacienteTr.appendChild(criaTd(paciente.nome, "info-nome"));
     pacienteTr.appendChild(criaTd(paciente.peso, "info-peso"));
     pacienteTr.appendChild(criaTd(paciente.altura, "info-altura"));
     pacienteTr.appendChild(criaTd(paciente.gordura, "info-gordura"));
     pacienteTr.appendChild(criaTd(paciente.IMC, "info-imc"));
     return pacienteTr;
}

function criaTd(dado, classes){ //parâmetros vazios, mas são trocados
    var td = document.createElement("td"); //cria qualquer td
    td.textContent = dado; //dados do paciente, peso, altura, etc.
    td.classList.add(classes); //classes de peso, altura, etc.

    return td;
}


function validarPaciente(paciente){

    var erros = [];

    if(!validarPeso(paciente.peso)) erros.push("Peso Inválido Animal!");

    if (!validarAltura(paciente.altura)) erros.push("Altura Inválida, Animal!");

    if(paciente.nome.length == 0) erros.push("O nome não pode ser nulo");

    if(paciente.peso.length == 0) erros.push("O peso não pode ser nulo");

    if (paciente.altura.length == 0) erros.push("A altura não pode ser nula");

    if (paciente.gordura.length == 0) erros.push("A gordura não pode ser nula");

    return erros;
}

function exibirMensagemErro(erros){
    //acessa tag <ul>
    let ul = document.querySelector("#mensagens-erro");

    ul.innerHTML = ""; //apaga o erro adicionar corretamente.

    //acessa o array erros, para cada elemento, uma função vai ser criada
    erros.forEach(function(erro){ //o parâmetro é responsável por colocar o valor em cada lista, pode ser qualquer coisa
    let li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
    });
}