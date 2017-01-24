function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(street, city, state, houseType) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.houseType = houseType;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

//UI logic
$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                  '<div class="panel panel-info">' +
                                    '<div class="panel-heading">'+
                                      '<h2 class="panel-title">Address</h2>'+
                                    '</div>'+
                                    '<div class="panel-body">' +
                                      '<div class="form-group">' +
                                        '<label for="address-type">Type</label>' +
                                        '<select class="form-control" id="address-type">' +
                                          '<option>Home</option>' +
                                          '<option>Work</option>' +
                                          '<option>Beach House</option>' +
                                          '<option>Ski Resort</option>' +
                                        '</select>' +
                                      '</div>' +
                                      '<div class="form-group">' +
                                        '<label for="new-street">Street</label>' +
                                        '<input type="text" class="form-control new-street">' +
                                      '</div>' +
                                      '<div class="form-group">' +
                                        '<label for="new-city">City</label>' +
                                        '<input type="text" class="form-control new-city">' +
                                      '</div>' +
                                      '<div class="form-group">' +
                                        '<label for="new-state">State</label>' +
                                        '<input type="text" class="form-control new-state">' +
                                      '</div>' +
                                    '</div>' +
                                  '</div>' +
                                '</div>');
  });




  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedHouseType = $(this).find("select#address-type").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedHouseType);
      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.houseType + ": " + address.street + ", " + address.city + " " + address.state + "</li>");
      });
    });

    $(".new-address").not(":first").remove();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");

  });
});
