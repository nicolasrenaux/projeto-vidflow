const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos")
        const videos = await busca.json()
            videos.forEach((video)=> {
                containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>
                        <div class="descricao-video">
                            <img class="img-canal" src = "${video.imagem}" alt="Logo do Canal">
                            <h3 class="titulo-video">${video.titulo}</h3>
                                <p class="titulo-canal">${video.descricao}</p>
                                <p class="categoria" hidden>${video.categoria}</p>
                        </div>
                </li>
                `;
            
            })
    } catch (error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os videos: ${error}</p>`;
    }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector('.pesquisar__input');
barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll('.videos__item');

    if(barraDePesquisa.value != ""){
        for(let video of videos){
            let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
            let filtro = barraDePesquisa.value.toLowerCase();

            if(!titulo.includes(filtro)){
                video.style.display = "none";
            } else{
                video.style.display = "block";
            }
        }
    } else{
        video.style.display = "block";
    }
}

const botaoCategoria = document.querySelectorAll('.superior__item')
botaoCategoria.forEach((botao) => {
    const nomeCategoria = botao.getAttribute("name")
    botao.addEventListener("click", () => filtrarCategoria(nomeCategoria));
})

function filtrarCategoria(nomeCategoria){
    const videos= document.querySelectorAll('.videos__item');
    for(let video of videos){
        let categoriaVideo = video.querySelector('.categoria').textContent.toLowerCase();
        let filtro = nomeCategoria.toLowerCase();

        if(!categoriaVideo.includes(filtro) && filtro != "tudo"){
            video.style.display = "none";
        } else{
            video.style.display = "block";
        }
    }
}