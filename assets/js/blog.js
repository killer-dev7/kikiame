
const SUPABASE_URL = "https://ftzvgmydvyobbwogxncw.supabase.co";

const SUPABASE_KEY = "sb_publishable_wl2zt3O62TUxtH2YYQ0fRQ_S_ejPowN";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

let todasNoticias = [];


/* =================================
   CARREGAR NOTÍCIAS
================================= */

async function carregarNoticias() {

    const newsGrid = document.getElementById("news-grid");

    if (!newsGrid) {
        console.error("Elemento #news-grid não encontrado.");
        return;
    }

    const { data, error } = await supabaseClient
        .from("noticias")
        .select("*")
        .order("data_publicacao", { ascending: false });

    if (error) {
        console.error("Erro ao carregar notícias:", error);

        newsGrid.innerHTML = `
            <p class="news-error">
                Não foi possível carregar as notícias.
            </p>
        `;

        return;
    }

    todasNoticias = data || [];

    mostrarNoticias(todasNoticias);
}


/* =================================
   MOSTRAR NOTÍCIAS
================================= */

function mostrarNoticias(noticias) {

    const newsGrid = document.getElementById("news-grid");

    if (!newsGrid) return;


    if (noticias.length === 0) {

        newsGrid.innerHTML = `
            <p class="news-empty">
                Não existem notícias nesta categoria.
            </p>
        `;

        return;
    }


    newsGrid.innerHTML = noticias.map(noticia => {

        const dataPublicacao = noticia.data_publicacao
            ? new Date(noticia.data_publicacao).toLocaleDateString(
                "pt-PT",
                {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                }
            )
            : "";


        const imagem = noticia.imagem_url
            ? noticia.imagem_url
            : "assets/images/news1.jpg";


        const resumo = noticia.resumo
            ? noticia.resumo
            : noticia.conteudo;


        return `
            <article class="news-card">

                <div class="news-card-image">

                    <img
                        src="${imagem}"
                        alt="${noticia.titulo}"
                    >

                    <span class="news-category">
                        ${noticia.categoria || "Empresa"}
                    </span>

                </div>


                <div class="news-card-content">

                    <span class="news-date">
                        ${dataPublicacao}
                    </span>


                    <h3>
                        ${noticia.titulo}
                    </h3>


                    <p>
                        ${resumo}
                    </p>


                    <a href="noticia.html?id=${noticia.id}">
                        Ler notícia
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>

                </div>

            </article>
        `;

    }).join("");
}


/* =================================
   FILTROS
================================= */

const filtros = document.querySelectorAll(".category-filter");

filtros.forEach(botao => {

    botao.addEventListener("click", () => {

        filtros.forEach(item => {
            item.classList.remove("active");
        });

        botao.classList.add("active");


        const categoriaSelecionada =
            botao.textContent.trim();


        if (categoriaSelecionada === "Todas") {

            mostrarNoticias(todasNoticias);

            return;
        }


        const noticiasFiltradas = todasNoticias.filter(noticia => {

            return noticia.categoria === categoriaSelecionada;

        });


        mostrarNoticias(noticiasFiltradas);

    });

});


/* =================================
   INICIAR
================================= */

carregarNoticias();

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
