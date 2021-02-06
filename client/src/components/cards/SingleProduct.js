import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../images/laptop-pic-1.jpg";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";

const { TabPane } = Tabs;

// this is children component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;
  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <img alt={title} src={image.url} key={image.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={<img alt={title} src={laptop} className="mb-3 card-image" />}
          ></Card>
        )}

        <Tabs type="card" defaultActiveKey="1">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on xxxx-xxx-xxx to learn more about the product
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" />
              <br />
              Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRatings
                name={product._id}
                numberOfStar={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
