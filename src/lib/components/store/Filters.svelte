<script>
  import { onMount } from "svelte";

  let categories = [];
  let selectedCategory = "all";
  let prices = [];
  let selectedMinPrice = null;
  let selectedMaxPrice = null;
  let sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];
  let selectedSortOption = sortOptions[0];

  onMount(async () => {
    const response = await fetch("https://your-api-endpoint.com/categories");
    categories = await response.json();
  });

  const handleCategorySelection = (event) => {
    selectedCategory = event.target.value;
  };

  const handlePriceSelection = (event) => {
    const { name, value } = event.target;
    if (name === "min-price") {
      selectedMinPrice = value;
    } else if (name === "max-price") {
      selectedMaxPrice = value;
    }
  };

  const handleSortOptionSelection = (event) => {
    selectedSortOption = event.target.value;
  };
</script>

<form>
  <div>
    <label for="category-select">Category:</label>
    <select id="category-select" on:change={handleCategorySelection}>
      <option value="all">All</option>
      {#each categories as category}
        <option value={category.id}>{category.name}</option>
      {/each}
    </select>
  </div>
  <div>
    <label for="min-price">Min Price:</label>
    <input
      type="number"
      id="min-price"
      name="min-price"
      on:change={handlePriceSelection}
    />
  </div>
  <div>
    <label for="max-price">Max Price:</label>
    <input
      type="number"
      id="max-price"
      name="max-price"
      on:change={handlePriceSelection}
    />
  </div>
  <div>
    <label for="sort-select">Sort by:</label>
    <select id="sort-select" on:change={handleSortOptionSelection}>
      {#each sortOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
  <button type="submit">Apply Filters</button>
</form>

<style>
  form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 0.5rem;
  }

  label,
  select,
  input[type="number"] {
    font-size: 1rem;
    margin-right: 1rem;
  }

  label {
    font-weight: bold;
  }

  select,
  input[type="number"] {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid gray;
  }

  button[type="submit"] {
    margin-left: auto;
    padding: 0.75rem 1.5rem;
    background-color: #28a745;
    color: white;
    border-radius: 0.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }

  @media (max-width: 720px) {
    form {
      flex-direction: column;
    }

    label,
    select,
    input[type="number"] {
      width: 100%;
      margin-bottom: 0.5rem;
    }

    button[type="submit"] {
      margin-top: 1rem;
      margin-left: 0;
    }
  }
</style>
