function addToBasket(articleId){
    let listArticle = getArticle();
    listArticle.push(articleId);
    saveArticle(listArticle);
}

function getArticle(){
    let listArticle = localStorage.getItem("listArticle");
        if(listArticle == null){
            return [];
        }else{
            return JSON.parse(listArticle);
        }
            
}

function saveArticle(listArticle){
    localStorage.setItem("listArticle",JSON.stringify(listArticle));
}

