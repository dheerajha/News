import React, { useEffect, useState } from 'react'

import NewsItem from './NewsItem'
import Dipper from './Dipper';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([])
  // console.log(articles);
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
 

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  const updateNews = async () => {
    props.setProgress(10);
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    
    try {
      let data = await fetch(url);
      if (!data.ok) {
        throw new Error(`Error: ${data.status} - ${data.statusText}`);
      }
      
      props.setProgress(30);
      let parsedData = await data.json();
      
      props.setProgress(70);
      
      if (parsedData.articles) {
        setArticles(parsedData.articles);
        // console.log("Articles:", parsedData.articles);
      } else {
        // console.log("No articles found in response");
      }
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      // console.error("Fetching news failed", error);
    }
    
    setLoading(false);
    props.setProgress(100);
  };
  
  
  // first render will run then the compnentDidMount will rum 
  // the order is first the constructor will run then the render will run after that the componenteDidMount(cdm will run)
  useEffect(() => {
     document.title= `${capitalizeFirstLetter(props.category)} - News`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  const fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    // console.log(data);
    
    let parsedData = await data.json()
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false);

  }
  return (
    <>
      <h1 className='text-center' >
  Worlds - Top {capitalizeFirstLetter(props.category)} Headlines
</h1>


      {loading && <Dipper />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loading={<Dipper />}
      >

        <div className="contianer">


        <div className="row">
  {articles.map((element, index) => {
    // Check if element is defined
    if (element) {
      return (
        <div className="col-md-4" key={element.url || index}>
          <NewsItem 
            title={element.title || "No title available"}
            description={element.description || "No description available"}
            imageUrl={element.urlToImage || "default-image-url.jpg"} 
            newsUrl={element.url} 
            author={element.author || "Unknown author"} 
            date={element.publishedAt || "Unknown date"} 
            source={element.source.name || "Unknown source"} 
          />
        </div>
      );
    }
    return null; // Skip undefined elements
  })}
</div>


        </div>

      </InfiniteScroll>

    </>
  )

}

News.defaultProps = {
  country: 'uk',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
