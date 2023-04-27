import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  )
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>{product.name}</span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = []
  let lastCategory = null

  products.forEach(product => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return
    }
    if (inStockOnly && !product.stocked) {
      return
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        ></ProductCategoryRow>
      )
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      ></ProductRow>
    )
    lastCategory = product.category
  });

  return (
    <table className="product-table">
      <thead>
        <tr className="product-table-title">
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody className="product-table-text">
        {rows}
      </tbody>
    </table>
  )
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form className="search-bar">
      <input type="text" placeholder="Search..." className="search-bar-input" value={filterText} onChange={(e) => onFilterTextChange(e.target.value)}></input>
      <label className="search-bar-table">
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)}></input>
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
    <div className="filterable-product-table">
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onInStockOnlyChange={setInStockOnly}></SearchBar>
      <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}></ProductTable>
    </div>
  )
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function App() {
  return (
    <div className="App">
      <FilterableProductTable products={PRODUCTS}></FilterableProductTable>
    </div>
  );
}

export default App;
