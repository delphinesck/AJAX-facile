class Rappel {
    constructor(titre, description, date_debut, date_fin){
        this.id = 0; 
        this.titre = titre;
        this.description = description;
        this.date_debut = new Date(date_debut);
        this.date_fin = new Date(date_fin);
        this.flag = true;
        this.$dom = null;
    }

    display(){
        var day = this.date_debut.getDate();
        var monthIndex = this.date_debut.getMonth() +1;
        var year = this.date_debut.getFullYear();
        var dd = day + "/" + monthIndex + "/" + year;

        var day = this.date_fin.getDate();
        var monthIndex = this.date_fin.getMonth() +1;
        var year = this.date_fin.getFullYear();
        var df = day + "/" + monthIndex + "/" + year;

        var div = "<div class='rappel'>";
        div += "<h3>" + this.titre + "</h3>";
        div += "<div class='details'><p class='descri'>" + this.description + "</p></div>";
        div += "<p class='dates'>du " + dd + " au " + df + "</p>";
        div += "<button class='suppr'>Suppr</button>";
        div += "</div>";

        this.$dom = $(div);
        $("#rappels_box").append(this.$dom);
    }

    destroy(){
        this.$dom.remove();
    }
}