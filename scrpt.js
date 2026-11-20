// ======== ESTILO DE LA HOME ========

const titulo = document.querySelector("h1");

if (titulo && window.location.pathname.includes("index")) {
    titulo.style.color = "white";
}

// ======== FUNCIONES MATEMÁTICAS ========

function mostrarResultado(resultado, procedimiento) {

    const resultadoHTML =
        document.getElementById("resultado");

    const procedimientoHTML =
        document.getElementById("procedimiento");

    resultadoHTML.innerHTML =
        `<h3>Resultado: ${resultado}</h3>`;

    procedimientoHTML.innerHTML =
        `<p><strong>Procedimiento:</strong></p>
         <p>${procedimiento}</p>`;
}

// ======== SUMAS ========

function calcularSuma() {

    const numero1 =
        Number(document.getElementById("numero1").value);

    const numero2 =
        Number(document.getElementById("numero2").value);

    const resultado = numero1 + numero2;

    mostrarResultado(
        resultado,
        `${numero1} + ${numero2} = ${resultado}`
    );
}

// ======== RESTAS ========

function calcularResta() {

    const numero1 =
        Number(document.getElementById("numero1").value);

    const numero2 =
        Number(document.getElementById("numero2").value);

    const resultado = numero1 - numero2;

    mostrarResultado(
        resultado,
        `${numero1} - ${numero2} = ${resultado}`
    );
}

// ======== MULTIPLICACIONES ========

function calcularMultiplicacion() {

    const numero1 =
        Number(document.getElementById("numero1").value);

    const numero2 =
        Number(document.getElementById("numero2").value);

    const resultado = numero1 * numero2;

    mostrarResultado(
        resultado,
        `${numero1} × ${numero2} = ${resultado}`
    );
}

// ======== DIVISIONES ========

function calcularDivision() {

    const numero1 =
        Number(document.getElementById("numero1").value);

    const numero2 =
        Number(document.getElementById("numero2").value);

    if (numero2 === 0) {

        document.getElementById("resultado").innerHTML =
            "<h3>No se puede dividir entre cero</h3>";

        document.getElementById("procedimiento").innerHTML = "";

        return;
    }

    const resultado = numero1 / numero2;

    mostrarResultado(
        resultado,
        `${numero1} ÷ ${numero2} = ${resultado}`
    );
}

// ===== LOGIN =====

const loginForm =
    document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit", function(event){

        event.preventDefault();

        alert(
            "Login listo para conectar con el backend."
        );

    });

}

// ===== REGISTRO =====

const registroForm =
    document.getElementById("registroForm");

if(registroForm){

    registroForm.addEventListener("submit", function(event){

        event.preventDefault();

        const password =
            document.getElementById("passwordRegistro").value;

        const confirmar =
            document.getElementById("confirmarPassword").value;

        if(password !== confirmar){

            alert("Las contraseñas no coinciden");

            return;
        }

        alert(
            "Registro listo para conectar con MongoDB."
        );

    });

}