function sendMail() {
    // Obtenemos los valores del formulario
    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    // Llamamos a EmailJS para enviar el correo
    emailjs
        .send("service_04gq0nv", "template_vae6qn7", parms)
        .then(function (response) {
            console.log("Success!", response.status, response.text);
            alert("Email sent successfully!");
            setTimeout(() => {
                window.location.href = "./home.html"; // Redirige a home.html después de 1 segundo
            }, 1000); // Retraso de 1 segundo para dar tiempo al mensaje de alerta
        })
        .catch(function (error) {
            console.error("Failed...", error);
            alert("Failed to send email. Please try again.");
        });
}
