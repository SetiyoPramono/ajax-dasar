$(function() {
    //CRUD Application

    var form = $(".form");
    var inputTitle = $("#judulkomentar");
    var inputDescription = $("#isikomentar");
    var list = $(".komen-list");
    var url = "http://localhost:3000";

    function loadMovies() {

        $.ajax({
                method: "GET",
                url: url + "/komentar",
                dataType: "json"
            }).done(function(response) {
                list.empty();
                insertMovies(response);

            })
            .fail(function(error) {
                console.log(error);
            })
    }

    loadMovies();


    function insertMovies(komentar) {
        komentar.forEach(function(e) {
            var li = $(`<li class="komen">
            <div class="isikomen">
            <h5 class="judulkomen"><p>Nama Wisata :</p> ${e.title}</h3>
            <p class="isikomen1"><a>Komentar :</a> ${e.description}</p>
            </div>
            <button class="btn-delete" data-id="${e.id}">Hapus</button>
        </li>`);
            list.append(li);
        })
    }


    function addMovie(title, description) {
        var film = {
            "title": title,
            "description": description
        };
        $.ajax({
                method: "POST",
                url: url + "/komentar",
                dataType: "json",
                data: film
            }).done(function(response) {
                loadMovies();
            })
            .fail(function(error) {
                console.log(error);
            })


    }


    form.on("submit", function(e) {
        e.preventDefault();
        addMovie(inputTitle.val(), inputDescription.val());
        inputTitle.val("");
        inputDescription.val("");
    });





    function removeMovie(id) {
        $.ajax({
                method: "DELETE",
                url: url + "/komentar/" + id,
                dataType: "json",
            }).done(function(response) {
                loadMovies();
            })
            .fail(function(error) {
                console.log(error);
            })

    }

    list.on("click", ".btn-delete", function() {
        var id = $(this).data("id");
        removeMovie(id);

    });


});