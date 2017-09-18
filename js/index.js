function calculaImc(peso, altura) {
    var calculo = peso / (Math.pow(altura, 2));
    return calculo.toFixed(2);
}

function imcMasc(imc) {
    if (imc < 20.7) {
        return -1;
    } else if (imc >= 20.7 && imc < 26.4) {
        return 0;
    } else if (imc >= 26.4) {
        return 1;
    }
}

function imcFem(imc) {
    if (imc < 19.1) {
        return -1;
    } else if (imc >= 19.1 && imc < 25.8) {
        return 0;
    } else if (imc >= 25.8) {
        return 1;
    }
}

var chart = c3.generate({
    data: {
        columns: [
            ['Imc', 0]
        ],
        type: 'gauge',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    gauge: {
        label: {
            format: function (value, ratio) {
                return value;
            },
            show: false // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 100, // 100 is default
        units: '',
        width: 60 // for adjusting arc thickness
    },
    color: {
        pattern: ['#d50000','#ffff00','#60B044','#ffff00','#d50000'], // the three color levels for the percentage values.
        threshold: {
            values: [19.1, 20.7, 25.8, 26.4, 100]
        }
    },
    size: {
        height: 180
    }
});

function validar(event){
    event.preventDefault();
    var peso = $("#peso").val();
    var altura = $("#altura").val();
    var sexo = $("#sexo option:selected").val();
    if(peso <= 0){
        alert('Favor preencha o peso!');
        return;
    }else if(altura <= 0){
        alert('Favor preencha a altura!');
        return;
    }else if(sexo <= 0){
        alert('Favor seleciona um gênero!');
        return;
    }else{
        calcular(peso, altura, sexo);
        return;
    }

}

function calcular(peso, altura, sexo) {
    var imc = calculaImc(peso, altura);
    chart.load({
        columns: [['Imc', imc]],
    });
    if(sexo == 1){
        switch(imcFem(imc)){
            case -1:
                alert('Abaixo do peso Ideal!');
                break;
            case 0:
                alert('Na faixa de peso Ideal!');
                break;
            case 1:
                alert('Acima do peso Ideal!');
                break;
            default:
                alert('Erro!!');
                break;
        }
    }else if(sexo == 2){
       switch(imcMasc(imc)){
            case -1:
                alert('Abaixo do peso Ideal!');
                break;
            case 0:
                alert('Na faixa de peso Ideal!');
                break;
            case 1:
                alert('Acima do peso Ideal!');
                break;
            default:
                alert('Erro!!');
                break;
        } 
    }
}

$(document).ready(function () {
    $('select').material_select();
    $('#btnCalcular').on('click', validar);
});