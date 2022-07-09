//API KEY: a8e54f7c11bd4459a797dfa6ebde6368 &category=business &country=us

const searchBtn = document.getElementsByClassName("search-btn")[0]
const sortByDropDown = document.getElementsByClassName("sortBy-dropdown")[0]
const categoryDropDown = document.getElementsByClassName("category-dropdown")[0]

const fetchNews = async(URL)=>{
    const request = await fetch(URL)
    const response = await request.json()
    return response
}
const getNews = (URL)=>{
    const newsContainer = document.getElementsByClassName("news-list")[0]
    newsContainer.innerHTML = ""
        fetchNews(URL).then((data)=>{
        return data
        }).then((data)=>{
            return data.articles
        }).then((articles)=>{
            for (eachArticle of articles){
                const title =  eachArticle.title
                const url = eachArticle.url
                const imageUrl = eachArticle.urlToImage
                let news = document.createElement('li')
                news.classList.add('news')
                news.innerHTML += `<div class="image-container"><img class="news-image"
                            src="${imageUrl}"
                            alt=""></div>
                    <div class="headline-container">
                        <a class="news-content" target="_blank"
                            href="${url}">${title}</a>
                    </div>`
                news.addEventListener('click',function(){
                    console.log('clicked')
                    const newsUrl = this.children[1].children[0].getAttribute('href')
                    console.log(newsUrl);
                    window.open(newsUrl)
                    
                })
                newsContainer.append(news)
            }
        })
        }
const getUrl = (event=undefined,search=undefined,sortBy=undefined,category=undefined)=>{
    const sortByDropDown = document.getElementsByClassName("sortBy-dropdown")[0]
    const sortByValue = sortByDropDown.options[sortByDropDown.selectedIndex].label
    const categoryDropDown = document.getElementsByClassName("category-dropdown")[0]
    const categoryValue = categoryDropDown.options[categoryDropDown.selectedIndex].label
    const searchQuery = document.getElementsByClassName("search-input")[0]
    const searchItem = searchQuery.value
    if (category==undefined){
        if (search == undefined){
            const URL = `https://newsapi.org/v2/everything?q=${searchItem}&pageSize=12&sortBy=${sortByValue}&apiKey=a8e54f7c11bd4459a797dfa6ebde6368`
            getNews(URL)
        }else if (search!=undefined){
            const URL = `https://newsapi.org/v2/everything?q=${search}&pageSize=12&sortBy=${sortBy}&apiKey=a8e54f7c11bd4459a797dfa6ebde6368`
            getNews(URL)
        }        
    }else{
        const URL = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=a8e54f7c11bd4459a797dfa6ebde6368`
        getNews(URL)
    }
}
searchBtn.addEventListener('click',getUrl)
sortByDropDown.addEventListener('change',(event)=>{
    const categoryDropDown = document.getElementsByClassName("category-dropdown")[0]
    const categoryValue = categoryDropDown.options[categoryDropDown.selectedIndex].label
    const searchQuery = document.getElementsByClassName("search-input")[0]
    const searchItem = searchQuery.value
    const allOptions = event.srcElement.options
    const selectedOption = allOptions[allOptions.selectedIndex].label
    if (categoryValue == "Category") {
        getUrl(undefined,searchItem,selectedOption,undefined)
    }else{
        getUrl(undefined,searchItem,selectedOption,categoryValue)
    }
})
categoryDropDown.addEventListener('change',(event)=>{
    const sortByDropDown = document.getElementsByClassName("sortBy-dropdown")[0]
    const sortByValue = sortByDropDown.options[sortByDropDown.selectedIndex].label
    const allOptions = event.srcElement.options
    const selectedOption = allOptions[allOptions.selectedIndex].label
    const searchQuery = document.getElementsByClassName("search-input")[0]
    searchQuery.value = ""
    
    getUrl(undefined,undefined,sortByValue,selectedOption)
})
getNews(`https://newsapi.org/v2/top-headlines?country=in&apiKey=a8e54f7c11bd4459a797dfa6ebde6368`)