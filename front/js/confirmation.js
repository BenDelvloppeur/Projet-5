const str = window.location;
(url = new URL(str)),
  (id = url.searchParams.get("id")),
  (orderId = document.getElementById("orderId")),
  (orderId.innerHTML = id);
