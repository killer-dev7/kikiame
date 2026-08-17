
const SUPABASE_URL = "https://ftzvgmydvyobbwogxncw.supabase.co";

const SUPABASE_KEY = "sb_publishable_wl2zt3O62TUxtH2YYQ0fRQ_S_ejPowN";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================================
   OBTER ID DA NOTÍCIA
========================================= */

const parametros = new URLSearchParams(
    window.location.search
);

const noticiaId = parametros.get("id");

const container =
    document.getElementById("noticia-container");


/* =========================================
   CARREGAR NOTÍCIA
========================================= */

async function carregarNoticia() {

    if (!noticiaId) {

        container.innerHTML = `
            <div class="news-error">

                <h1>Notícia não encontrada</h1>

                <p>
                    Nenhuma notícia foi selecionada.
                </p>

                <a href="index.html">
                    Voltar ao blog
                </a>

            </div>
        `;

        return;
    }


    console.log(
        "Carregando notícia:",
        noticiaId
    );


    const { data: noticia, error } =
        await supabaseClient
            .from("noticias")
            .select("*")
            .eq("id", noticiaId)
            .single();


    if (error) {

        console.error(
            "Erro ao carregar notícia:",
            error
        );


        container.innerHTML = `
            <div class="news-error">

                <h1>Erro ao carregar notícia</h1>

                <p>
                    Não foi possível carregar esta notícia.
                </p>

                <a href="index.html">
                    Voltar ao blog
                </a>

            </div>
        `;

        return;
    }


    if (!noticia) {

        container.innerHTML = `
            <div class="news-error">

                <h1>Notícia não encontrada</h1>

                <a href="index.html">
                    Voltar ao blog
                </a>

            </div>
        `;

        return;
    }


    /* =========================================
       FORMATAR DATA
    ========================================= */

    let dataFormatada = "";

    if (noticia.data_publicacao) {

        dataFormatada =
            new Date(
                noticia.data_publicacao
            ).toLocaleDateString(
                "pt-PT",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            );
    }


    /* =========================================
       IMAGEM
    ========================================= */

    let imagemHTML = "";

    if (noticia.imagem_url) {

        imagemHTML = `
            <div class="single-news-image">

                <img
                    src="${noticia.imagem_url}"
                    alt="${noticia.titulo}"
                >

            </div>
        `;
    }


    /* =========================================
       CONTEÚDO
    ========================================= */

    container.innerHTML = `

        <article class="single-news-content">

            ${imagemHTML}


            <div class="single-news-info">

                <span class="news-category">

                    ${noticia.categoria || "Empresa"}

                </span>


                <span class="news-date">

                    ${dataFormatada}

                </span>

            </div>


            <h1>

                ${noticia.titulo}

            </h1>


            ${
                noticia.resumo
                    ? `
                        <p class="single-news-summary">

                            ${noticia.resumo}

                        </p>
                      `
                    : ""
            }


            <div class="single-news-text">

                ${noticia.conteudo}

            </div>


            <a
                href="index.html"
                class="back-news"
            >

                <i class="fa-solid fa-arrow-left"></i>

                Voltar às notícias

            </a>

        </article>

    `;


    /* =========================================
       TÍTULO DA ABA
    ========================================= */

    document.title =
        `${noticia.titulo} | KIKIAME`;

}


/* =========================================
   INICIAR
========================================= */

carregarNoticia();

/*==========================
        MOBILE MENU
==========================*/

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const menuClose = document.querySelector(".menu-close");

if(menuClose){

    menuClose.addEventListener("click", closeMenu);

}
function openMenu(){

    menuToggle.classList.add("active");
    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");

    document.body.style.overflow="hidden";

}

function closeMenu(){

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");

    document.body.style.overflow="";

}

menuToggle.addEventListener("click",()=>{

    if(mobileMenu.classList.contains("active")){

        closeMenu();

    }else{

        openMenu();

    }

});

if(menuOverlay){

    menuOverlay.addEventListener("click",closeMenu);

}

document.querySelectorAll(".mobile-menu a").forEach(link=>{

    link.addEventListener("click",closeMenu);

});

window.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeMenu();

    }

});
