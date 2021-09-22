fetch("http://localhost:3000/api/teddies")
  .then((data) => data.json())
  .then((jsonListArticle) => {
    for (let jsonArticle of jsonListArticle) {
      let article = new Article(jsonArticle);

      document.querySelector(".list-group").innerHTML += `
                                                                        <li class="list-group-item mt-4 ml-4" data-id=${article._id}><a href="./product.html?${article._id}"><img src="${article.imageUrl}" class="card-img-top"></a></li>                                                                        
                                                                      
                                                                    <!--<div class="col-12 mt-5">
                                                                        <div class="card article">
                                                                            <div class="card-header ">
                                                                                <h5 class="card-title d-flex justify-content-between">${article.name}</h5>                                                                                
                                                                            </div>
                                                                            <img src="${article.imageUrl}" class="card-img-top">
                                                                            <span class="fa-stack fa-2x addFavorite" data-id=${article._id}>
                                                                                Ajouter au panier!
                                                                            </span>
                                                                            <div class="card-body">
                                                                                <p class="card-text">${article.description}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>-->`;
    }
  });
