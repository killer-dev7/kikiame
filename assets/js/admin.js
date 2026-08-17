const SUPABASE_URL = "https://ftzvgmydvyobbwogxncw.supabase.co";
const SUPABASE_KEY = "sb_publishable_wl2zt3O62TUxtH2YYQ0fRQ_S_ejPowN";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("admin.js carregado");


document.addEventListener("DOMContentLoaded", async () => {

    const formulario = document.getElementById("form-noticia");
    const mensagem = document.getElementById("mensagem");

    if (!formulario) {
        console.error("ERRO: form-noticia não encontrado.");
        return;
    }

    console.log("Formulário encontrado");


    /* ================================
       VERIFICAR LOGIN
    ================================ */

    const { data: usuarioData, error: usuarioError } =
        await supabaseClient.auth.getUser();

    if (usuarioError || !usuarioData.user) {

        console.log("Utilizador não autenticado.");

        window.location.href = "login.html";

        return;
    }

    console.log(
        "Administrador autenticado:",
        usuarioData.user.email
    );


    /* ================================
       PUBLICAR
    ================================ */

    formulario.addEventListener("submit", async (event) => {

        event.preventDefault();

        console.log("Botão publicar pressionado");


        const titulo =
            document.getElementById("titulo").value.trim();

        const resumo =
            document.getElementById("resumo").value.trim();

        const conteudo =
            document.getElementById("conteudo").value.trim();

        const categoria =
            document.getElementById("categoria").value;

        const imagemInput =
            document.getElementById("imagem");


        if (!titulo || !conteudo) {

            mensagem.textContent =
                "Preencha o título e o conteúdo.";

            return;
        }


        mensagem.textContent =
            "A publicar...";


        try {

            let imagemUrl = null;


            /* ================================
               IMAGEM
            ================================ */

            if (imagemInput.files.length > 0) {

                const arquivo =
                    imagemInput.files[0];

                const extensao =
                    arquivo.name.split(".").pop();

                const nomeArquivo =
                    `${Date.now()}.${extensao}`;


                console.log(
                    "Enviando imagem:",
                    nomeArquivo
                );


                const { error: uploadError } =
                    await supabaseClient.storage
                        .from("noticias")
                        .upload(
                            nomeArquivo,
                            arquivo,
                            {
                                cacheControl: "3600",
                                upsert: false
                            }
                        );


                if (uploadError) {

                    console.error(
                        "Erro no upload:",
                        uploadError
                    );

                    mensagem.textContent =
                        "Erro ao enviar a imagem.";

                    return;
                }


                const { data: urlData } =
                    supabaseClient.storage
                        .from("noticias")
                        .getPublicUrl(nomeArquivo);


                imagemUrl =
                    urlData.publicUrl;


                console.log(
                    "Imagem enviada:",
                    imagemUrl
                );
            }


            /* ================================
               INSERIR NOTÍCIA
            ================================ */

            console.log(
                "Enviando notícia para Supabase..."
            );


            const { data, error } =
                await supabaseClient
                    .from("noticias")
                    .insert({
                        titulo: titulo,
                        resumo: resumo || null,
                        conteudo: conteudo,
                        categoria: categoria,
                        imagem_url: imagemUrl,
                        data_publicacao:
                            new Date().toISOString()
                    })
                    .select();


            if (error) {

                console.error(
                    "Erro Supabase:",
                    error
                );

                mensagem.textContent =
                    "Erro ao guardar a notícia.";

                return;
            }


            console.log(
                "NOTÍCIA PUBLICADA:",
                data
            );


            mensagem.textContent =
                "Notícia publicada com sucesso! ✅";


            formulario.reset();

        }

        catch (erro) {

            console.error(
                "Erro inesperado:",
                erro
            );

            mensagem.textContent =
                "Ocorreu um erro inesperado.";
        }

    });

});