$(document).ready(function() {
    $.ajax("/burgers", {
        type: "GET",

    }).then(data => {
        let burgersMenu = $("#burgersMenu");
        let burgersDevour = $("#burgersDevour");

        let burgers = data.burgers;
        let len = burgers.length;

        for (let i = 0; i < len; i++) {

            let devourBtn =
                "<li><div class='button-flex'>" + burgers[i].burger_name + "<button class='devour-burger btn btn-secondary' data-id='" + burgers[i].id +
                "' data-devour='" + !burgers[i].devoured + "'>Devour";

            if (!burgers[i].devoured) {
                burgersMenu.append(devourBtn);
            }

            devourBtn += "</button></div></li>";

            let deleteBtn =
                "<li><div class='button-flex'>" + burgers[i].burger_name + "<button class='delete btn btn-danger' data-id='" + burgers[i].id + "'>Delete"

            if (burgers[i].devoured) {
                burgersDevour.append(deleteBtn);
            }

            "</button></div</li>";
        }
    });

    // Sending a request to the server to create a new burger
    $("#addBurger").on("submit", function(event) {
        event.preventDefault();

        let newBurger = {
            burger: $("#burger_name").val().trim(),
            devoured: false
        }

        $.ajax("/burgers", {
            type: "POST",
            data: JSON.stringify(newBurger),
            dataType: "json",
            contentType: "application/json",
        }).then(function() {
            console.log("Created a new burger!");
            location.reload();
        });
    });

    // Sending a request to the sever to change a burger to true (devoured)
    $(document).on("click", ".devour-burger", function(event) {
        event.preventDefault();

        // This is going to target the selected ID
        let burgerId = $(this).data("id");
        let devourBurger = $(this).data("devour") === true;

        let newDevoured = {
            devoured: devourBurger
        };

        // Send the PUT request.
        $.ajax("/burgers/" + burgerId, {
            type: "PUT",
            data: JSON.stringify(newDevoured),
            dataType: 'json',
            contentType: 'application/json'
        }).then(function() {
            console.log("changed burger to", devourBurger);
            // Reload the page to get the updated list
            location.reload();
        });
    });

    // Sending a request to the sever to delete a burger
    $(document).on("click", ".delete", function(event) {
        event.preventDefault();

        // This is going to target the selected ID
        let burgerId = $(this).data("id");

        $.ajax("/burgers/" + burgerId, {
            type: "DELETE",

        }).then(function() {
            console.log("Deleted burger ", burgerId);
            location.reload();
        });
    });

});