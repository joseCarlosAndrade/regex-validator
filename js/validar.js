//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");

var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");

var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");

var inputResult = document.querySelector("#inputResult");
var resultadoCadastro = "Seus dados não foram registrados";

var results = [
    false,
    false,
    false, 
    false
]

// fonte : https://www.freecodecamp.org/news/regular-expressions-for-beginners/

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);

/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[(A-Za-z)+ ]{6,}$/; // qualquer tipo de letra, com um minimo de 6 caracteres
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Nome inválido"; 
        nomeHelp.style.color="red";
        results[0] = false;
    }
    else{
        nomeHelp.textContent = "";
        results[0] = true;
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

ano.addEventListener('focusout', () => {
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Ano inválido";
        anoHelp.style.color="red";
        results[1] = false;
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > 2022 ){ // colocando limite de 2022
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            // anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${2022}.`;
            anoHelp.textContent = "Ano inválido";
            anoHelp.style.color="red";
            results[1] = false;
        }
        else if( parseInt(anoTrimado) < 1900 ){ // colocando limite de 1900
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            // anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${1900}.`;
            anoHelp.textContent = "Ano inválido";
            anoHelp.style.color="red";
            results[1] = false;
        }
        else{
            anoHelp.textContent="";
            results[1] = true;
        }        
        
    }
}
);


email.addEventListener('focusout', validarEmail);

function validarEmail(e){
    const emailTrimmado = e.target.value.trim();

    // \w = [A-Za-z0-9_]
    // \d = [0-0]
    // \W = [^A-Za-z0-9_]
    // + faz com que a classe [(\w\d\W)+] apareça pelo menos uma vez
    // explicação: requisitos do pdf: 
    //      antes do @ -> letras e/ou numeros
    //      depois do @ ->letras e/ou numeros 
    //      depois do . -> net ou br ou org ou com
    const regexEmail =/^[(\w\d\W)+]+@[(\w\d\W)+]+\.[(net|br|org|com)]+$/

    if (emailTrimmado.match(regexEmail) == null) {
        emailHelp.textContent = "Formato de email inválido";
        emailHelp.style.color="red";
        results[2] = false;
    } else { 
        emailHelp.textContent = ""
        results[2] = true;
    }
}


senha.addEventListener('input', validarSenha);

function validarSenha(e){
    const senhaTrimmado = e.target.value.trim();

    // \w = [A-Za-z0-9_]
    // \d = [0-0]
    // \W = [^A-Za-z0-9_]
    // + faz com que a classe [(\w\d\W)+] apareça pelo menos uma vez
    // explicação: requisitos do pdf: 
    //      antes do @ -> letras e/ou numeros
    //      depois do @ ->letras e/ou numeros 
    //      depois do . -> net ou br ou org ou com
    // const regexEmail =/^[(\w\d\W)+]+@[(\w\d\W)+]+\.[(net|br|org|com)]+$/
    const regexSenhaPequena = /^[0-9A-Za-z!@#$%^&*()_+{}\[\]:;<>,.?/~\-]{1,5}$/;
    const regexSenhaMuitoGrande = /^[0-9A-Za-z!@#$%^&*()_+{}\[\]:;<>,.?/~\-]{21,}$/;
    const regexSenhaForte = /^(?=(.*\d){2,})(?=(.*[A-Z]){2,})(?=.*[a-z])(?=(.*[!@#$%^&*()_+{}\[\]:;<>,.?/~]){2,})[0-9A-Za-z!@#$%^&*()_+{}\[\]:;<>,.?/~\-]{12,20}$/; // positive lookahead -> (?=) checa se o padrao seguinte esta contido na string sem consumir o caractere. no caso, ?=.*CHAR checa se o char CHAR aparece na string apos 0 ou X vezes o char . (qualquer caractere, representado por '.')
    const regexSenhaModerada = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~])[0-9A-Za-z!@#$%^&*()_+{}\[\]:;<>,.?/~\-]{8,20}$/;  
    const regexSenhaFraca = /^(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~])[0-9A-Za-z!@#$%^&*()_+{}\[\]:;<>,.?/~\-]{6,7}$/;  

    // fazer regex para: caso forte, caso medio, caso fraco, caso invalido
    if (senhaTrimmado.match(regexSenhaMuitoGrande) || senhaTrimmado.match(regexSenhaPequena)) {
        senhaHelp.textContent = "Tamanho inválido. A senha deve conter de 6 a 20 caracteres, pelo menos um número e um caractere especial."
        senhaHelp.style.color = "red";
        results[3] = false;
    } else if (senhaTrimmado.match(regexSenhaForte)) {
        senhaHelp.textContent = "Senha Forte";
        senhaHelp.style.color = "green";
        results[3] = true;
    } else if (senhaTrimmado.match(regexSenhaModerada)) {
        senhaHelp.textContent = "Senha Modearada";
        senhaHelp.style.color="orange";
        results[3] = true;
    } else if (senhaTrimmado.match(regexSenhaFraca)) {
        senhaHelp.textContent = "Senha Fraca";
        senhaHelp.style.color="yellow";
        results[3] = true;
    } else { 
        senhaHelp.textContent = "Senha inválida";
        senhaHelp.style.color="red";
        results[3] = false;
    }
}

const verificarCadastro = () => {
    const res = results.filter(v => v==true);
    if (res.length === 4) {
        resultadoCadastro = "Seus dados foram registrados"
    }
    console.log(res); 
    console.log(results);  

    inputResult.textContent = resultadoCadastro;

}