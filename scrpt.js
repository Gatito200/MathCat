// ======== RUTAS PROTEGIDAS ========
const rutasProtegidas = [
    "/index.html",
    "/sumas.html",
    "/restas.html",
    "/multiplicaciones.html",
    "/divisiones.html"
];

const token = localStorage.getItem("token");
// ======== ESTILO DE LA HOME ========
const paginaActual = window.location.pathname;

if (
    rutasProtegidas.some(ruta =>
        paginaActual.includes(ruta)
    )
) {

    if (!token) {

        window.location.href =
            "login.html";
    }
}
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

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                document.getElementById("emailLogin").value;

            const password =
                document.getElementById("passwordLogin").value;

            try {

                const respuesta =
                    await fetch(
                        "http://localhost:3000/api/auth/login",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                email,
                                password
                            })
                        }
                    );

                const datos =
                    await respuesta.json();

                if (!respuesta.ok) {

                    alert(datos.mensaje);
                    return;
                }

                localStorage.setItem(
                    "token",
                    datos.token
                );

                alert("Login exitoso");

                window.location.href =
                    "index.html";

            } catch (error) {

                console.error(error);

                alert(
                    "Error al conectar con el servidor"
                );
            }
        }
    );
}

// ===== REGISTRO =====

const registroForm =
    document.getElementById("registroForm");

if (registroForm) {

    registroForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const nombre =
                document.getElementById("nombre").value;

            const email =
                document.getElementById("emailRegistro").value;

            const password =
                document.getElementById("passwordRegistro").value;

            const confirmar =
                document.getElementById("confirmarPassword").value;

            if (password !== confirmar) {

                alert("Las contraseñas no coinciden");
                return;
            }

            try {

                const respuesta =
                    await fetch(
                        "http://localhost:3000/api/auth/register",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                nombre,
                                email,
                                password
                            })
                        }
                    );

                const datos =
                    await respuesta.json();

                alert(datos.mensaje);

                if (respuesta.ok) {

                    window.location.href =
                        "login.html";
                }

            } catch (error) {

                console.error(error);

                alert(
                    "Error al conectar con el servidor"
                );
            }
        }
    );
}

// ===== CERRAR SESIÓN  =====

 function cerrarSesion() {

    localStorage.removeItem("token");

    alert("Sesión cerrada correctamente");

    window.location.href = "login.html";
}