import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";

import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";

import "../styles/all-foods.css";
import "../styles/pagination.css";

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortingOption, setSortingOption] = useState("default");
  const [pageNumber, setPageNumber] = useState(0); 

  const searchedProduct = products.filter((item) => {
    if (searchTerm === "") {
      return true;
    }
    if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  });

  const sortProducts = (products, sortingOption) => {
    switch (sortingOption) {
      case "ascending":
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case "descending":
        return [...products].sort((a, b) => b.title.localeCompare(a.title));
      case "high-price":
        return [...products].sort((a, b) => b.price - a.price);
      case "low-price":
        return [...products].sort((a, b) => a.price - b.price);
      default:
        return products;
    }
  };

  const sortedProduct = sortProducts(searchedProduct, sortingOption);

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = sortedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(sortedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleSortingChange = (e) => {
    const selectedOption = e.target.value;
    setSortingOption(selectedOption);
    setPageNumber(0);
  };

  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "100%" }}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="sorting__widget text-end">
                <select
                  className="w-50"
                  value={sortingOption}
                  onChange={handleSortingChange}
                >
                  <option value="default">Default</option>
                  <option value="ascending">Alphabetically, A-Z</option>
                  <option value="descending">Alphabetically, Z-A</option>
                  <option value="high-price">Price: High to Low</option>
                  <option value="low-price">Price: Low to High</option>
                </select>
              </div>
            </Col>

            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName="paginationBttns"
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
