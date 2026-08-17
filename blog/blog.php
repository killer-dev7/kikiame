<?php

$arquivo = 'noticias.json';

$noticias = [];

if (file_exists($arquivo)) {

    $conteudo = file_get_contents($arquivo);

    $noticias = json_decode($conteudo, true);

    if (!is_array($noticias)) {
        $noticias = [];
    }
}

?>

<!DOCTYPE html>
<html lang="pt">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Blog | KIKIAME</title>

    <link rel="stylesheet" href="assets/style.css">

</head>

<body>

<header class="header">

    <div class="container">

        <a href="../index.html" class="logo">
            <img src="../assets/images/logo.png" alt="KIKIAME">
        </a>

        <h1>Blog KIKIAME</h1>

        <p>Notícias, novidades e informações</p>

    </div>

</header>


<main class="container">

    <section class="blog-header">

        <span>NOTÍCIAS</span>

        <h2>Últimas notícias</h2>

        <p>
            Acompanhe as novidades, projetos e informações da KIKIAME.
        </p>

    </section>


    <section class="news-grid">

        <?php if (empty($noticias)): ?>

            <div class="empty">

                <h3>Nenhuma notícia publicada</h3>

                <p>
                    Em breve teremos novidades.
                </p>

            </div>

        <?php else: ?>


            <?php foreach ($noticias as $noticia): ?>

                <article class="news-card">

                    <?php if (!empty($noticia['imagem'])): ?>

                        <img
                            src="<?= htmlspecialchars($noticia['imagem']) ?>"
                            alt="<?= htmlspecialchars($noticia['titulo']) ?>"
                        >

                    <?php endif; ?>


                    <div class="news-content">

                        <span class="news-date">

                            <?= htmlspecialchars($noticia['data']) ?>

                        </span>


                        <h3>

                            <?= htmlspecialchars($noticia['titulo']) ?>

                        </h3>


                        <p>

                            <?= htmlspecialchars($noticia['resumo']) ?>

                        </p>


                        <a
                            href="noticia.php?id=<?= $noticia['id'] ?>"
                            class="read-more"
                        >

                            Ler notícia →

                        </a>

                    </div>

                </article>

            <?php endforeach; ?>


        <?php endif; ?>

    </section>

</main>


<footer>

    <p>
        © 2026 KIKIAME Comércio Geral e Prestação de Serviço, Lda.
    </p>

</footer>

</body>

</html>