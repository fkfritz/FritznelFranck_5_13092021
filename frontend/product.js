//récupération de l'id dans l'url
let queryString_url_id = window.location.search;
//console.log(queryString_url_id);

//suppression du "?"
//méthode 1
let articleId = queryString_url_id.slice(1);

//méthode 2
let params = new URLSearchParams(queryString_url_id);

for (let p of params) {
  // console.log(p);
}

// let search = params.has("?") === true;
// console.log(search);

fetch(`http://localhost:3000/api/teddies/${articleId}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    document.querySelector(
      ".listarticle"
    ).innerHTML += `<div class="col-12 col-md-6 mt-5">
        <div class="card article data-id=${value._id}">
            <div class="card-header ">
                <h5 class="card-title d-flex justify-content-between">${
                  value.name
                }</h5>
                <span>Prix : ${
                  value.price / 100
                } €</span>                                                                                
            </div>
            <img src="${value.imageUrl}" class="card-img-top">            
            <div class="card-body">
                <form>
                    <div class="form-group">
                        <label for="choixCouleur">Sélectionnez une couleur:</label>
                        <select class="form-control" id="choixCouleur">                        
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" data-id=${
                      value._id
                    } id="btn_submit">Ajouter au panier</button>
                </form>                
                <span>Description du produit: </span>
                <p class="card-text">${value.description}</p>                
            </div>            
        </div>
    </div>`;

    //récupération de la liste des couleurs dans la variable colorList
    let colorList = value.colors;
    // console.log(colorList);

    // ----------------------------------------------------------------------------
    //déclaration de la variable colorOption
    // let colorOption = [];

    // for ( let i=0; i < colorList.length; i++){
    //     colorOption += ` <option value="${i}">${colorList[i]}</option> `;
    // }

    // -------------------------------------------------------------------------------

    //définir chaque couleur comme une option et les affecter au formulaire
    for (let color of colorList) {
      let colorOption = ` <option >${color}</option> `;
      document.querySelector("#choixCouleur").innerHTML += colorOption;
    }

    const idForm = document.querySelector("#choixCouleur");
    //   console.log(idForm);

    const btnSubmit = document.querySelector("#btn_submit");
    // console.log(btnSubmit);

    // écouter le "click" sur le bouton "ajouter au panier" avec prise en compte de l'option qui a été choisie.
    btnSubmit.addEventListener("click", (event) => {
      event.preventDefault();

      let choixForm = idForm.value;
      // console.log(choixForm);

      let formValue = {
        id: value._id,
        nom: value.name,
        prix: value.price / 100 + "€",
        couleur: choixForm,
      };

      let listProduct = JSON.parse(localStorage.getItem("listArticle"));

      //   fonction qui permet d'ajouter les produits
      const addToLocalStorage = () => {
        listProduct.push(formValue);
        localStorage.setItem("listArticle", JSON.stringify(listProduct));
      };

      //   vérifier s'il y a des produits dans localStorage
      if (listProduct) {
        addToLocalStorage();
      }
      //   s'il n'y a pas de produits, créer un tableau et ajouter les produits
      else {
        listProduct = [];
        addToLocalStorage();
      }
    });
  })
  .catch(function (err) {
    //Une erreur est survenue
  });
