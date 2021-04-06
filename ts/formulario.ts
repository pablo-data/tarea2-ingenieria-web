let formulario:any = document.getElementById("formulario");
let mensaje: any = document.getElementById("mensaje");


function limpiarDatos() {
    //resear los datos
    formulario.reset();
}

formulario.addEventListener("submit", function(event:any){

    //valido si cumple con los requerimientos solicitados
    if(validar()){
        formulario.style.display = "none";
        mensaje.style.display = "block";
        mensaje.innerHTML = "Hemos recibido sus datos, pronto nos estaremos comunicando con usted";
        mensaje.style.color="red";
        mensaje.style.margin = "50px";
        let experiencia:any = document.getElementsByName("experiencia");


        for(let i = 0; i < experiencia.length; i++){
             if(experiencia[i].checked){
                 console.log(experiencia[i].value)
             }
        }

    } else {
        alert('Error Ingrese datos correctemente')
    }

    event.preventDefault(); //evitar que se refresque
});

function validar(){
    if(validarCheckboxLenguaje() && validarRut() && validarTelefono() && validarTextArea()){
        return true;
    }else {
        return false;
    }
}


//Funcion para validar de que se tacho al menos un checkbox
function validarCheckboxLenguaje(): boolean{
    let lenguaje:any = document.getElementsByName("checkbox-grupo");

    let divLenguajes = document.getElementById("checkbox-lenguajes");
    let warning = document.getElementById("advertencia-checkbox");

    //validar si se eligio un lenguaje programacion
    for(let i = 0; i < lenguaje.length; i++){
        if(lenguaje[i].checked){
           warning?.remove();
           return true;
        }
   }

   if(!warning){
       console.log(lenguaje);
       advertencia("Eliga al menos un lenguaje", divLenguajes, "advertencia-checkbox");
   }
    return false;
}

//Funcion para validar que el RUT ingresado tiene numeros, sin punto y con digito verificador
function validarRut(): boolean{
    let rut: any = document.getElementById("rut");
    let digito_verificador= '0123456789kK';
    let guion = '-';
    let numeros = "0123456789";
    let punto = '.';

    let warning = document.getElementById("advertencia-rut");

    //verifico si tiene punto
    if(rut.value.includes(punto)){
        if(!warning){
            advertencia("Ejemplo: 11222333-K", rut, "advertencia-rut");
        }
        alert('No incluya puntos en el RUT');
        return false;
    }
    //verifico que incluya el guion en la penultima posicion
    let posicion_guion = rut.value.length - 2;
    if(rut.value.charAt(posicion_guion) !== guion){
        if(!warning){
            advertencia("Ejemplo: 11222333-K", rut, "advertencia-rut");
        }
        alert('Ingrese guion para digito verificador');
        return false;
    }

    //verifico que no exista mas de 1 guion
    let contador = 0;
    for(let i = 0; i < rut.value.length -1 ; i++){
        if(rut.value.charAt(i) === guion){
            contador++;
        }

        if(contador > 1){
            if(!warning){
                advertencia("Ejemplo: 11222333-K", rut, "advertencia-rut");
            }
            alert('Ingrese solo un guion para digito verificador');
            return false;
        }
    }

    //verifico que sean digitos los caracteres sin incluir el digito verificador
    for(let i = 0; i < rut.value.length - 2; i++){

        let contiene_numero = numeros.indexOf(rut.value.charAt(i));

        if(contiene_numero === -1){
            if(!warning){
                advertencia("Ejemplo: 11222333-K", rut, "advertencia-rut");
            }
            alert('Ingrese solo numeros');
            return false;
        }
    }

    //verifico que el digito verificador cumpla con los caracteres
    let ultima_posicion = rut.value.length - 1;
    if(digito_verificador.indexOf(rut.value.charAt(ultima_posicion)) === -1){
        if(!warning){
            advertencia("Ejemplo: 11222333-K", rut, "advertencia-rut");
        }
        alert('Ingrese solo caracteres permitidos en el digito verificador');
        return false;
    }


    warning?.remove();
    
    return true;
    
    
}

//Funcion para validar que el numero ingresado tenga exactamente 9 digitos
function validarTelefono(): boolean {
    let numero: any = document.getElementById("telefono");
    let warning = document.getElementById("advertencia-telefono");
    if(numero.value.length !== 9){
        //prueba
        if(!warning){
            advertencia("Valor de digitos no permitido, ingrese 9 digitos", numero, "advertencia-telefono");
        }
        return false;
    }

    warning?.remove();

    return true;
}

//Funcion para validar de que text Area tenga un tope de 300 caracteres maximos.
function validarTextArea(): boolean {
    let descripcion: any = document.getElementById("descripcion");
    let warning = document.getElementById("advertencia-textArea");
    if(descripcion.value.length > 300){
        if(!warning){
        advertencia("Prohibido agregar mas de 300 caracteres", descripcion, "advertencia-textArea");

        }
        return false;
    }

    warning?.remove();


    return true;

    
}

//Funcion para agregar una advertencia a los errores.
function advertencia(mensaje: string, elemento: any, id: any){
     let nuevoDiv = document.createElement("div");
         nuevoDiv.setAttribute("id", id);
         nuevoDiv.style.color = 'red';
         nuevoDiv.innerHTML = mensaje;

    //agrego
    elemento.insertAdjacentElement("afterend", nuevoDiv);
}