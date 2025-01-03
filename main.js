const form = document.getElementById('formulario');
const nomeSobrenome = document.getElementById('nomeSobrenome');
const numTelefone = document.getElementById('numTelefone');
const nomes = [];
const numeros = [];
let nomeValido = false;
let numeroValido = false;
let linhas = '';
const spanAdd = '<span class="resultado">Salvo</span>';

form.addEventListener('submit', function(e){
    e.preventDefault();

    novoContato();
    atualizarAgenda();
    contatosSalvos();
});

function validaNome(nomeCompleto){
    const nomeComoArray = nomeCompleto.trim().split(' ');
    return nomeComoArray.length >=2;
}

nomeSobrenome.addEventListener('keyup', function(e){
    console.log(e.target.value);
    nomeValido = validaNome(e.target.value);

        
        if(!nomeValido){
            nomeSobrenome.classList.add('erroNome');
            document.querySelector('.alertaNomeErro').style.display="block";
            document.querySelector('.alertaNumErro').style.display="none";
        }else {
            nomeSobrenome.classList.remove('erroNome');
            document.querySelector('.alertaNomeErro').style.display="none";
        }
}); 

numTelefone.addEventListener('input', function(e){
    const apenasNum = e.target.value.replace(/\D/g,'');
    e.target.value = apenasNum;
});

function validaNumero(numero) {
    const numeroComoArray = numero.replace(/\D/g, '');
    return numeroComoArray.length === 9 || numeroComoArray.length === 11;
}

numTelefone.addEventListener('keyup', function(e){
    console.log(e.target.value);
    numeroValido = validaNumero(e.target.value);

    if(!numeroValido){
        numTelefone.classList.add('erroNome');
        document.querySelector('.alertaNumErro').style.display="block";
        document.querySelector('.alertaNomeErro').style.display="none";
    }else {
        numTelefone.classList.remove('erroNome');
        document.querySelector('.alertaNumErro').style.display="none";
    }
});

function novoContato(){

    if(numeros.includes (parseFloat(numTelefone.value))){
        alert (`Numero: ${numTelefone.value} já está salvo`);
    }else if (nomes.includes(nomeSobrenome.value)){
        alert (`Nome: ${nomeSobrenome.value} já está salvo`);
    }else {
        nomes.push (nomeSobrenome.value);
        numeros.push(parseFloat(numTelefone.value));

        let linha = '<tr>'
        linha += `<td>${nomeSobrenome.value}</td>`;
        linha += `<td>${numTelefone.value}</td>`;
        linha += `<td>✅</td>`;   
        linha += '</tr>'

        linhas += linha;
    }

    nomeSobrenome.value = '';
    numTelefone.value = '';
}

function atualizarAgenda(){
    const adicionarContato = document.querySelector('tbody');
    adicionarContato.innerHTML = linhas;
}

function contatosSalvos(){
    const contatosSalvos = numeros.length;
    document.getElementById('contatos-salvos').innerHTML = contatosSalvos;
    document.getElementById('adicionados').innerHTML = spanAdd;
}
