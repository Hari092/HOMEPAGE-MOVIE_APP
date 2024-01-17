const apiKey="api_key=dd3911b4fead916aaa68ceb4385878ae";
const baseURL="https://api.themoviedb.org/3";
const api=baseURL+'/discover/movie?sort_by=popularity.desc&'+apiKey;
const img='https://image.tmdb.org/t/p/w500';
const main=document.getElementById("main");
const form=document.getElementById("form");

getMovies(api);

function getMovies(url){
    fetch(url)
    .then(res=>res.json())
    .then(info=>{
        console.log(info.results);
        getInfo(info.results);
    }) 
}

function getInfo(data){
    main.innerHTML='';
    data.forEach(movie => {
        const movieEl=document.createElement("div");
        let {title,vote_average,overview,poster_path}=movie;
        vote_average=Number.parseFloat(vote_average).toFixed(1);
        movieEl.classList.add('movie')
        movieEl.innerHTML=`
        <img src="${img+poster_path}" alt="${title}">

        <div class="movieinfo">
            <h3>${title}</h3>
            <span class="${getCol(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>overview</h3>
            ${overview}
        </div>
        `
        main.appendChild(movieEl);
    });
}

function getCol(a){
    if(a>=8){
        return 'green'
    }else if(a>=5 && a<8){
        return 'orange'
    }else{
        return "red"};
}
const search=document.getElementById("searchbar");

const searchURL=baseURL+'/search/movie?';
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const src=search.value;
    if(src){
        getMovies(searchURL+'query='+src+'&'+apiKey);
    }else{
        getMovies(api);
    }

})