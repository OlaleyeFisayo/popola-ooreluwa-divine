const hamburger_menu = document.querySelector(".hamburger-menu");
const mobile_view = document.querySelector(".mobile-view");
const x_icon = document.querySelector(".x");
const moblie_view_navList = document.querySelectorAll(
  ".mobile-view_nav-list li"
);
const project_grid = document.querySelector(".project-grid");
const galleryContainer = document.querySelector(".gallery-container");
const galleryControlsContainer = document.querySelector(".gallery-controls");
const galleryControls = ["previous", "next"];
const galleryItems = document.querySelectorAll(".gallery-item");

// Carousel class
class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  updateGallery() {
    this.carouselArray.forEach((el) => {
      el.classList.remove("gallery-item-1");
      el.classList.remove("gallery-item-2");
      el.classList.remove("gallery-item-3");
      el.classList.remove("gallery-item-4");
      el.classList.remove("gallery-item-5");
      el.classList.remove("gallery-item-6");
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }

  setCurrentState(direction) {
    if (direction.className == "gallery-controls-previous") {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateGallery();
  }

  setControls() {
    this.carouselControls.forEach((control) => {
      galleryControlsContainer.appendChild(
        document.createElement("button")
      ).className = `gallery-controls-${control}`;
    //   document.querySelector(`.gallery-controls-${control}`).innerText =
    //     control;
    });
  }

  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach((control) => {
      control.addEventListener("click", (e) => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}
const exampleCarousel = new Carousel(
  galleryContainer,
  galleryItems,
  galleryControls
);

exampleCarousel.setControls();
exampleCarousel.useControls()

// functions
const showMobileMenu = () => {
  mobile_view.className = "mobile-view show";
};
const hideMobileMenu = () => {
  mobile_view.className = "mobile-view";
};

// Fetching data from json file
const getProjectData = async () => {
  const url = "data.json";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const projects = data.data;
    projects.map(({ imgUrl, description, header, stacks, links }) => {
      project_grid.innerHTML += `
        <div class="project">
        <div class="project-text">
          <h3>${header}</h3>
          <p class="description">
            ${description}
          </p>
          <div class="stacks">
            ${stacks.map((stack) => `<p>${stack}</p>`).join("")}
          </div>
          <div class="link">
            <a
              href="${links[0]}"
              target="_blank"
            >
              Code
              <img src="./assets/projects/svgs/github.svg" alt="github" />
            </a>
            ${
              links[1]
                ? `<a href="${links[1]}" target="_blank">Live Demo</a>`
                : ""
            }

          </div>
        </div>
        <div class="project-img">
          <img src="${imgUrl}" alt="${header}" />
        </div>
      </div>
        
        `;
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
getProjectData();

//Event Listeners
hamburger_menu.addEventListener("click", showMobileMenu);
x_icon.addEventListener("click", hideMobileMenu);
moblie_view_navList.forEach((li) => {
  li.addEventListener("click", hideMobileMenu);
});
