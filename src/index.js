console.log(data);

// WRITE YOUR CODE BELOW!
const handleOnAddDogFormSubmit = (event) => {
  event.preventDefault();
  let id = data.length;
  let name = event.target.elements["name"].value;
  let image = event.target.elements["image"].value;
  let bio = event.target.elements["bio"].value;
  let newDog = {
    id: id,
    name: name,
    bio: bio,
    isGoodDog: true,
    image: image,
  };
  data.unshift(newDog);
  render();
};

const setupAddDogForm = () => {
  const addDog = document.getElementsByClassName("dogs-list__button--add")[0];
  addDog.addEventListener("click", (event) => {
    const section = document.querySelector("section");
    section.innerHTML = `
    <h2>Add a new Dog</h2>
      <form class="form">

        <label for="name">Dog's name</label>
        <input type="text" id="name" name="name">

        <label for="image">Dog's picture</label>
        <input type="url" id="image" name="image">

        <label for="bio">Dog's bio</label>
        <textarea rows="5" id="bio" name="bio"></textarea>

        <input type="submit" id="submit" name="submit" value="Let's add a dog!" class="form__button">
      </form>`;

    const form = document.querySelector("form");
    form.addEventListener("submit", handleOnAddDogFormSubmit);
  });
};

const handleOnDogClick = (event) => {
  const id = event.target.id;
  const selected_dog = data.find((element) => element.id == id);

  const section = document.querySelector("section");
  section.innerHTML = `
        <h2>${selected_dog.name}</h2>
        <img
          src="${selected_dog.image}"
          alt=""
        />
        <div class="main__dog-section__desc">
          <h3>Bio</h3>
          <p>
            ${selected_dog.bio}
          </p>
        </div>
        <p><em>Is naughty?</em> <span style=display:${
          selected_dog.isGoodDog ? "contents" : "none"
        } id="isGoodDog">Yes!</span><span style=display:${
    selected_dog.isGoodDog ? "none" : "contents"
  } id="isBadDog">No!</span></p>
        <button onclick="toggleIsGoodDog()">Good dog!</button>`;
};

const toggleIsGoodDog = () => {
  let toggleBtn = document.querySelector("button");
  let isGoodDog = document.getElementById("isGoodDog");
  let isBadDog = document.getElementById("isBadDog");

  if (isGoodDog.style.display === "contents") {
    isGoodDog.style.display = "none";
    isBadDog.style.display = "contents";
    toggleBtn.innerText = "Good Dog";
  } else if (isBadDog.style.display === "contents") {
    isGoodDog.style.display = "contents";
    isBadDog.style.display = "none";
    toggleBtn.innerText = "Bad Dog";
  }
};

const render = () => {
  const list = document.querySelector("ul");
  list.innerHTML =
    '<li class="dogs-list__button dogs-list__button--add">+</li>';
  setupAddDogForm();
  data.forEach((element) => {
    let dog = document.createElement("li");
    dog.id = element.id;
    dog.className = "dogs-list__button";
    dog.innerHTML = element.name;
    dog.addEventListener("click", handleOnDogClick);
    list.append(dog);
  });
};

render();
