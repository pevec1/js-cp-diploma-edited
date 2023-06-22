class Interface{
    constructor()
    {

    }
    getIndexPage(){
       this.getNavDay() 
    }
    getHallPage(){

    }
    getPaymentPage(){

    }
    getTicketPage(){

    }

    getNavDay(){
        let navDay = Date.now();
        console.log(navDay);
        let pagesNav = document.querySelector(".page-nav");
if (pagesNav) {
  let movies = document.getElementsByTagName("main");
  let pages = document.querySelectorAll(".page-nav_day");

  for (let link of pages) {
    if (link.className == "") {
      link.setAttribute("data-size", "normal");
      link.classList.add("font-size_normal");
    }
    link.onclick = () => {
      let elem = Array.from(books);
      let i = 0;

      if (link.dataset.size === "small") {
        elem[i].className = "book";
        elem[i].classList.add("book_fs-small");
        link.classList.add("font-size_active");
        link.nextElementSibling.classList.remove("font-size_active");
        link.nextElementSibling.nextElementSibling.classList.remove(
          "font-size_active"
        );
      }
      if (link.dataset.size === "normal") {
        elem[i].className = "book";
        link.classList.add("font-size_active");
        link.nextElementSibling.classList.remove("font-size_active");
        link.previousElementSibling.classList.remove("font-size_active");
      }
      if (link.dataset.size === "big") {
        elem[i].className = "book";
        elem[i].classList.add("book_fs-big");
        link.classList.add("font-size_active");
        link.previousElementSibling.classList.remove("font-size_active");
        link.previousElementSibling.previousElementSibling.classList.remove(
          "font-size_active"
        );
      }
      i++;
      return false;
    };
  }
}

    }

}

let pageCreate = new Interface();
let page = window.location.href
if (page.includes('index.html')){
    pageCreate.getIndexPage();
} else if (page.includes('hall.html')){
    pageCreate.getHallPage();
} else if (page.includes('payment.html')){
    pageCreate.getPaymentPage();
} else if (page.includes('ticket.html')){
    pageCreate.getTicketPage();
}