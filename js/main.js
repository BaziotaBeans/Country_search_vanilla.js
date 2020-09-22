const urlAPI = 'https://restcountries.eu/rest/v2/all';
const element = {
    input: document.querySelector('.input-group input[type="text"]'),
    table: document.querySelector('table'),
    title: document.querySelector('.title'),
    lang_option: document.querySelector('.lang-mode'),
    toggle_lang_mode: document.querySelector('#chk'),
    footer: document.querySelector('footer'),
    thead: document.querySelector('table thead tr')
}
const lang_mode = {
    pt: {
        title_:'Países e capitais',
        lang_option: 'Língua',
        placeholder_input: 'Procure um país',
        thead_country: 'País',
        thead_capital: 'Capital',
        footer_text: 'Feito com 💜 usando Vanilla.js'
    },
    eng: {
        title_:'Countries and capitals',
        lang_option: 'Language',
        placeholder_input: 'Search an country',
        thead_country: 'Country',
        thead_capital: 'Capital',
        footer_text: 'Make with 💜 using Vanilla.js'
    },
    flag_lang: false
}

const tr = document.querySelectorAll('table tbody tr');

element.input.addEventListener('input',(e)=>{ 
    [...document.querySelectorAll('table tbody tr')].forEach((e)=>{e.style.display = 'none';});
    [...document.querySelectorAll('table tbody tr')].forEach((e)=>{
        if(validerChar(element.input.value,e.children[0].textContent)){
            e.style.display = '';
        } 
    });
});

function validerChar(str,str__){
    for(let i=0; (i < str__.length && i < str.length); i++){
        if(str.split('')[i].toUpperCase() != str__[i].toUpperCase()) return false;
    }
    if(str.length > str__.length) return false;
    return true;
}

element.toggle_lang_mode.addEventListener('click', ()=>{
    if(!element.toggle_lang_mode.checked){
        element.input.placeholder  = lang_mode.eng.placeholder_input;
        element.title.textContent = lang_mode.eng.title_;
        element.lang_option.textContent = lang_mode.eng.lang_option;
        element.thead.firstElementChild.textContent = lang_mode.eng.thead_country;
        element.thead.lastElementChild.textContent = lang_mode.eng.thead_capital;
        element.footer.firstElementChild.textContent = lang_mode.eng.footer_text;
    }else{
        element.input.placeholder  = lang_mode.pt.placeholder_input;
        element.title.textContent = lang_mode.pt.title_;
        element.lang_option.textContent = lang_mode.pt.lang_option;
        element.thead.firstElementChild.textContent = lang_mode.pt.thead_country;
        element.thead.lastElementChild.textContent = lang_mode.pt.thead_capital;
        element.footer.firstElementChild.textContent = lang_mode.pt.footer_text;
    }
    removeAllChildren();
    render();
});


async function getCountryAsync (url){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}


function render(){
    getCountryAsync(urlAPI)
          .then(data => {
            console.log(data.length);
            for(var i=0; i<data.length; i++){
                if(data[i].capital != ''){
                    let html = `
                    <tr>
                        <td>${(!element.toggle_lang_mode.checked) ? data[i].name : data[i].translations.pt}</td>
                        <td>${data[i].capital}</td>
                    </tr>`;
                    element.table.children[1].insertAdjacentHTML('beforeend',html);
                }
            }
    });
}

function removeAllChildren(){
    while(element.table.children[1].firstElementChild){
        element.table.children[1].removeChild(element.table.children[1].firstElementChild);
    }
}

window.addEventListener('load', render);
