const SUPABASE_URL = "https://ftzvgmydvyobbwogxncw.supabase.co";

const SUPABASE_KEY = "sb_publishable_wl2zt3O62TUxtH2YYQ0fRQ_S_ejPowN";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


const formulario = document.getElementById("form-login");
const mensagem = document.getElementById("mensagem");


formulario.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;


    mensagem.textContent = "A entrar...";
    mensagem.style.color = "";


    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });


    if (error) {

        console.error("Erro de login:", error);

        mensagem.textContent =
            "Email ou palavra-passe incorretos.";

        return;
    }


    console.log("Login realizado:", data.user);


    window.location.href = "admin.html";

});
