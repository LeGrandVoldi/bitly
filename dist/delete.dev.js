"use strict";

function sup() {
  var confirmation, response;
  return regeneratorRuntime.async(function sup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          confirmation = confirm("Voulez-vous supprimer cet article");

          if (!confirmation) {
            _context.next = 12;
            break;
          }

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(fetch("/supprimer/".concat(id), {
            method: "DELETE"
          }));

        case 5:
          response = _context.sent;

          if (response.ok) {
            window.location.href = "/ajouterURL";
          } else {
            console.error("erreur de la suppression");
          }

          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          console.error("erreur reseaux:", _context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}