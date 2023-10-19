// document.addEventListener("DOMContentLoaded", function () {
//     const paths = document.querySelectorAll(".map path");

//     let cityName;

//     paths.forEach(path => {
//         path.addEventListener("click", function (e) {
//            cityName = e.currentTarget.getAttribute("data-name");

//            const pokemon = document.querySelector("#pokemon");
           
//            changePokemon(cityName, pokemon)


//         });
//     });
// });

function changePokemon(cityName, pokemon){
    const pokemonWelcome = document.querySelector("#pokemon-welcome");

    const bodyWrapper = document.querySelector("body div"); 

    const weatherText = document.querySelector("#Wx").textContent;

    console.log(pokemonWelcome, bodyWrapper, weatherText);

    let pokemonKing = "";
    if (weatherText.includes("晴天")) {
      pokemon.src = `https://static.tumblr.com/6d5fad2410cb092840ad58aa00051d01/ozvqtky/N7Onxn9yb/tumblr_static_1orkl5uzm4n40w444k88gssso.gif`
      pokemonKing = "小火龍";
      bodyWrapper.style.backgroundColor = "rgba(255, 10, 10, 0.5)";
      bodyWrapper.style.transition = "background-color 1s";
    //   pokemon.a.href="https://pokemonrevolution.net/forum/topic/54823-i-miss-my-old-pokemon/";
    // }else if (weatherText.includes("雨天")) {

    }else if (weatherText.includes("多雲")) {
        pokemon.src = `https://media.tenor.com/Pwn9ZYb7C2QAAAAi/gengar-pokemon.gif`;
        pokemonKing = "梗鬼";
        bodyWrapper.style.backgroundColor = "rgba(128, 0, 128, 0.5)";
        bodyWrapper.style.transition = "background-color 0.5s";
    };

    pokemonWelcome.textContent = `我們是來自 ${cityName} 的團隊 ！ 去吧，${pokemonKing}! `;
};