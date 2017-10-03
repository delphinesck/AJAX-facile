class App {
    constructor(){
        this.$add = $("#add");
        this.$section = $("section");
        this.$details = $(".details");

        this.$sidebar = $("#sidebar");
        this.$form = $("form");
        this.$titre = $("#titre");
        this.$description = $("#description");
        this.$date_debut = $("#date_debut");
        this.$date_fin = $("#date_fin");

        this.rappels = [];

        this.initPickers();
        this.readRappels();
        this.displayAllRappels();
        this.reinit();
        this.alertsAll();
    };

    reinit(){
        this.$titre.val("");
        this.$description.val("");
        this.$date_debut.val("");
        this.$date_fin.val("");
    }

    initPickers(){
        var options = {
            dayNames : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
            dayNamesMin : ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
            monthNames : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
            monthNamesShort : ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
            firstDay : 1,
            beforeShowDay : $.proxy(this.closedDay, this),
            dateFormat: "dd/mm/yy",
            numberOfMonths : 1
        };

        this.$date_debut.datepicker(options);
        this.$date_fin.datepicker(options);
    };

    addRappel(rappel){
        this.rappels.push(rappel);
    }

    saveRappels(rappel){
        var that = this;
        $.ajax({
            url : "http://localhost:8888/JAVASCRIPT_ORIENTE_OBJET/TP_facile_ajax/API/rappel",
            method : "POST",
            data : {
                titre : rappel.titre,
                description : rappel.description,
                date_debut : rappel.date_debut,
                date_fin : rappel.date_fin
            },
            dataType : "json",
            success : function(data){
                if(data.success == true){
                    rappel.id = data.id;
                    that.addRappel(rappel);
                    rappel.display();
                    app.alerts(rappel);
                }
                else{
                    alert("Une erreur est survenue lors de l'enregistrement.");
                }
            },
            error : function(error){
                console.log(error);
            }
        })
    }

    readRappels(){
        var that = this;
        $.ajax({
            url : "http://localhost:8888/JAVASCRIPT_ORIENTE_OBJET/TP_facile_ajax/API/rappels",
            method : "GET",
            dataType : "json",
            success : function(data){
                for(var data_rappel of data){
                    var rappel = new Rappel(data_rappel.titre, data_rappel.description, data_rappel.date_debut, data_rappel.date_fin);
                    rappel.id = data_rappel.id;
                    that.addRappel(rappel);
                    rappel.display();
                    app.alerts(rappel);
                }
            },
            error : function(error){
                console.log(error);
            }
        });
    }

    displayAllRappels(){
        for(var rappel of this.rappels){
            rappel.displayRappel();
            this.alerts(rappel);
        }
    }

    alertsAll(){
        var todayDate = new Date();

        for(var rappel of this.rappels){
            if(rappel.date_fin.getTime() + 86400000 < todayDate.getTime()){
                var element = rappel.$dom;
                element.css("background-color", "#ffb3ba");
                // PERIME
            }

            if(rappel.date_debut.getTime() <= (todayDate.getTime() + 259200000) && rappel.date_debut.getTime() > todayDate.getTime()){
                var element = rappel.$dom;
                element.css("background-color", "#bae1ff");

                if(rappel.date_debut.getTime() <= (todayDate.getTime() + 86400000)){
                    alert("ATTENTION ! Il vous reste 1 jour avant \"" + rappel.titre + "\"");
                    var div1 = "<div class='warning'>";
                    div1 += "ATTENTION ! Il vous reste 1 jour avant \"" + rappel.titre + "\"";
                    div1 += "</div>";
                }

                else if(rappel.date_debut.getTime() <= (todayDate.getTime() + 172800000)){
                    alert("ATTENTION ! Il vous reste 2 jours avant \"" + rappel.titre + "\"");
                    var div2 = "<div class='warning'>";
                    div2 += "ATTENTION ! Il vous reste 2 jours avant \"" + rappel.titre + "\"";
                    div2 += "</div>";
                }

                else if(rappel.date_debut.getTime() <= (todayDate.getTime() + 259200000)){
                    alert("ATTENTION ! Il vous reste 3 jours avant \"" + rappel.titre + "\"");
                    var div3 = "<div class='warning'>";
                    div3 += "ATTENTION ! Il vous reste 3 jours avant \"" + rappel.titre + "\"";
                    div3 += "</div>";
                }
                // J-X
            }

            else if(rappel.date_debut.getTime() <= todayDate.getTime() && (rappel.date_fin.getTime() + 86400000) >= todayDate.getTime()){
                var element = rappel.$dom;
                element.css("background-color", "#baffc9");
                alert("Événement aujourd'hui : " + rappel.titre);
                // ACTIF
            }
        }
    }

    alerts(rappel){
        var todayDate = new Date();

        if(rappel.date_fin.getTime() + 86400000 < todayDate.getTime()){
            var element = rappel.$dom;
            element.css("background-color", "#ffb3ba");
            // PERIME
        }

        if(rappel.date_debut.getTime() <= (todayDate.getTime() + 259200000) && rappel.date_debut.getTime() > todayDate.getTime()){
            var element = rappel.$dom;
            element.css("background-color", "#bae1ff");
            // J-X
        }

        if(rappel.date_debut.getTime() <= todayDate.getTime() && (rappel.date_fin.getTime() + 86400000) >= todayDate.getTime()){
            var element = rappel.$dom;
            element.css("background-color", "#baffc9");
            // ACTIF
        }
    }

    deleteRappel(index){
        var rappel = this.rappels[index];
        var that = this;
        $.ajax({
            url : "http://localhost:8888/JAVASCRIPT_ORIENTE_OBJET/TP_facile_ajax/API/rappel/" + rappel.id,
            method : "DELETE",
            dataType : "json",
            success : function(data){
                if(data.success == true){
                    rappel.destroy();
                    that.rappels.splice(index, 1);
                }
                else{
                    alert("Un problème est survenu lors de la suppression.");
                }
            },
            error : function(error){
                console.log(error);
            }
        });
    }

    displayExpired(){
        var todayDate = new Date();
        for(var rappel of this.rappels){
            if(rappel.date_fin.getTime() + 86400000 < todayDate.getTime()){
                var element = rappel.$dom;
                rappel.expired = true;
                element.css("background-color", "#ffb3ba");
            }

            else{
                var element = rappel.$dom;
                element.css("display", "none");
            }
        }
    }

    displayAll(){
        for(var rappel of this.rappels){
            rappel.$dom.css("display", "block");
        }
    }

    deleteAllExpired(){
        for(var index in this.rappels){
            var rappel = this.rappels[index];
            var that = this;

            if(rappel.expired == true){
                $.ajax({
                    url : "http://localhost:8888/JAVASCRIPT_ORIENTE_OBJET/TP_facile_ajax/API/rappel/" + rappel.id,
                    method : "DELETE",
                    dataType : "json",
                    success : function(data){
                        if(data.success == true){
                            rappel.destroy();
                            that.displayAll();
                            that.destroyRappel(data.id);
                        }
                        else{
                            alert("Un problème est survenu lors de la suppression.");
                        }
                    },
                    error : function(error){
                        console.log(error);
                    }
                });
            }
        }
    }

    destroyRappel(id){ console.log(id);
        for(var index in this.rappels){
            if(this.rappels[index].id == id){
                this.rappels[index].destroy();
                this.rappels.splice(index, 1);
            }
        }
    }
    
    detail(rappel){
        $.ajax({
            url : "http://localhost:8888/JAVASCRIPT_ORIENTE_OBJET/TP_facile_ajax/API/rappel/" + rappel.id,
            method : "GET",
            dataType : "json",
            success : function(data){
                if(data.success == true){
                    console.log(data.rappel);
                }
                else{
                    alert("Une erreur est survenue lors de la récupération");
                }
            },
            error : function(error){
                console.loge(error);
            }
        })
    }
}