// Melbourne Waste Guide: Render items and implement search filter
const wasteCardTemplate = document.querySelector("[data-waste-template]");
const wasteCardContainer = document.querySelector("[data-waste-cards-container]");
const searchInput = document.querySelector("[data-search]");

let items = [];

// Filter items on search input
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  items.forEach(item => {
    const isVisible =
      item.name.toLowerCase().includes(value) ||
      item.category.toLowerCase().includes(value) ||
      item.instructions.toLowerCase().includes(value);
    item.element.classList.toggle("hide", !isVisible);
  });
});

// Fetch data from GitHub Pages static JSON
fetch("https://dandom2019.github.io/MelbRubbishSort/db.json")
  .then(res => res.json())
  .then(data => {
    items = data.waste.map(itemData => {
      const card = wasteCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = itemData.name;
      body.innerHTML = `
        <p><strong>Bin:</strong> ${itemData.bin_key}</p>
        <p><strong>Category:</strong> ${itemData.category}</p>
        <p><strong>Instructions:</strong> ${itemData.instructions}</p>
      `;
      wasteCardContainer.append(card);
      return {
        name: itemData.name,
        category: itemData.category,
        instructions: itemData.instructions,
        element: card
      };
    });
  })
  .catch(error => console.error('Error loading waste data:', error));