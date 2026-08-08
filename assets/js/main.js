/*==========================
    CONTADORES ANIMADOS
==========================*/

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let current = 0;
        const increment = target / 100;

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.innerText = Math.ceil(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target + "+";

            }

        };

        updateCounter();

        observer.unobserve(counter);

    });

}, {
    threshold: 0.5
});

counters.forEach(counter => observer.observe(counter));
/*=========================
        LOADER
==========================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        loader.classList.add("hide");

        document.body.classList.add("loaded");

        document.body.style.overflow = "";

        AOS.init({

            duration:1000,

            once:true,

            offset:120,

            easing:"ease-in-out"

        });

        AOS.refresh();

    },1200);

});

/*==========================
      NAVBAR SCROLL
==========================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 60){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});



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


/*==========================
      BACK TO TOP
==========================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==========================
      MODAL ORÇAMENTO
==========================*/

const quoteModal=document.getElementById("quoteModal");

const openButtons=document.querySelectorAll(".open-modal");

const closeModal=document.getElementById("closeModal");

openButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

quoteModal.classList.add("active");

document.body.style.overflow="hidden";

});

});

function fecharModal(){

quoteModal.classList.remove("active");

document.body.style.overflow="";

}

closeModal.addEventListener("click",fecharModal);

quoteModal.addEventListener("click",(e)=>{

if(e.target===quoteModal){

fecharModal();

}

});

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

fecharModal();

}

});


const form=document.getElementById("quoteForm");

form.addEventListener("submit",(e)=>{

e.preventDefault();

const nome=document.getElementById("nome").value;
const telefone=document.getElementById("telefone").value;
const email=document.getElementById("email").value;
const servico=document.getElementById("servico").value;
const mensagem=document.getElementById("mensagem").value;

const texto=`*PEDIDO DE ORÇAMENTO - KIKIAME*

👤 Nome: ${nome}

📞 Telefone: ${telefone}

📧 Email: ${email}

🛠 Serviço: ${servico}

📝 Mensagem:
${mensagem}`;

window.open(

`https://wa.me/244927121755?text=${encodeURIComponent(texto)}`,

"_blank"

);

fecharModal();

form.reset();

});

/*=========================
    MODAL CONTACTO
=========================*/

const openContact = document.getElementById("openContact");
const contactModal = document.getElementById("contactModal");
const closeContact = document.getElementById("closeContact");

if (openContact && contactModal && closeContact) {

    openContact.addEventListener("click", function () {

        contactModal.classList.add("active");
        document.body.style.overflow = "hidden";

    });

    closeContact.addEventListener("click", function () {

        contactModal.classList.remove("active");
        document.body.style.overflow = "";

    });

    contactModal.addEventListener("click", function (e) {

        if (e.target === contactModal) {

            contactModal.classList.remove("active");
            document.body.style.overflow = "";

        }

    });

}