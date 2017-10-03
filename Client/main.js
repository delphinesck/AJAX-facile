var app = new App();

document.getElementById("suppr_expired").style.visibility = "hidden";

app.$add.click(function(){
    app.$sidebar.fadeIn(400);
});

app.$form.submit(function(event){
    event.preventDefault();
    var titre = app.$titre.val();
    var description = app.$description.val();
    var date_debut = app.$date_debut.datepicker("getDate");
    var date_fin = app.$date_fin.datepicker("getDate");

    var rappel = new Rappel(titre, description, date_debut, date_fin);
    // app.addRappel(rappel);
    app.saveRappels(rappel);
});

app.$section.click(function(){
    app.$sidebar.fadeOut(400);
});

$(document).on("click", ".rappel", function(){
    var index = $(".rappel").index($(this));
    var rappel = app.rappels[index];

    if(rappel.flag == true){
        rappel.$dom.children(".details").slideDown(400);
        rappel.$dom.css("width", "250px");
        rappel.flag = false;
    }

    else if(rappel.flag == false){
        rappel.$dom.children(".details").slideUp(400);
        rappel.$dom.css("width", "210px");
        rappel.flag = true;
    }
});

$(document).on("click", ".suppr", function(){
    var index = $(".suppr").index($(this));
    app.deleteRappel(index);
});

$(document).on("click", "#expired", function(){
    if($("#expired").is(":checked")){
        app.displayExpired();
        document.getElementById("suppr_expired").style.visibility = "visible";
    }

    else{
        app.displayAll();
    }
});

$(document).on("click", "#suppr_expired", function(){
    app.deleteAllExpired();
});