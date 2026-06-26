import React, { useState } from "react";
import { Link } from "react-router-dom";
import blog1 from "../images/BlogPost/blog-1.jpg";
import blog2 from "../images/BlogPost/blog-2.jpg";
import blog3 from "../images/BlogPost/blog-3.jpg";
import blog4 from "../images/BlogPost/blog-4.jpg";
import blog5 from "../images/BlogPost/blog-5.jpg";

const blogData = [
  {
    imgSrc: blog1,
    title: "Opening of new offices of the company",
    date: "2024-01-14",
    comments: 114,
    link: "/blog/opening-of-new-offices",
  },
  {
    imgSrc: blog2,
    title: "What cars are most vulnerable",
    date: "2024-01-14",
    comments: 114,
    link: "/blog/most-vulnerable-cars",
  },
  {
    imgSrc: blog3,
    title: "Statistics showed which average age",
    date: "2024-01-14",
    comments: 114,
    link: "/blog/average-age-statistics",
  },
  {
    imgSrc: blog4,
    title: "What´s required when renting a car?",
    date: "2024-01-14",
    comments: 114,
    link: "/blog/renting-requirements",
  },
  {
    imgSrc: blog5,
    title: "New rules for handling our cars",
    date: "2024-01-14",
    comments: 114,
    link: "/blog/new-rules-handling-cars",
  },
  {
    imgSrc: blog3,
    title: "1111",
    date: "2024-01-14",
    comments: 114,
    link: "/blog/1111",
  },
  {
    imgSrc: blog4,
    title: "22g a car?",
    date: "2024-01-14",
    comments: 114,
    link: "/blog/22g-a-car",
  },
  {
    imgSrc: blog5,
    title: "33andling our cars",
    date: "2024-01-14",
    comments: 114,
    link: "/blog/33handling-our-cars",
  },
];

function BlogsPart() {
  const [scrollRef, setScrollRef] = useState(null);

  const prevSlide = () => {
    if (scrollRef) {
      scrollRef.scrollBy({
        left: -scrollRef.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const nextSlide = () => {
    if (scrollRef) {
      scrollRef.scrollBy({
        left: scrollRef.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="blog-container">
      <h1 style={{fontSize:35 , textAlign:"center"}}>Our Blog</h1>
      <div className="blog" ref={(ref) => setScrollRef(ref)}>
        {blogData.map((blog, index) => (
          <Link to={blog.link} key={index} className="blog-card">
            <img src={blog.imgSrc} alt={blog.title} />
            <div className="card-content">
              <h3 className="card-title">{blog.title}</h3>
              <div className="card-meta">
                <span>
                  <i className="far fa-calendar-alt"></i> {blog.date}
                </span>
                <span>
                  <i className="far fa-comment"></i> {blog.comments}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="blog-controls">
        <button onClick={prevSlide}>
          <i className="fa-solid fa-angle-left" />
        </button>
        <button onClick={nextSlide}>
          <i className="fa-solid fa-angle-right" />
        </button>
      </div>
    </div>
  );
}

export default BlogsPart;
