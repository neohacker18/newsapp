import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News=(props)=> {

  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)  //or false
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)
  

    useEffect(() => {
      let a=props.category[0];
      let b=props.category;
      document.title=a.toUpperCase()+b.slice(1);
      updateNews();    
    }, [])
    

    const updateNews=async()=>{
      props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
      setLoading(true)
      let data=await fetch(url);
      props.setProgress(50);
      let parsedData=await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    }
    const handlePrevClick=async()=>{
      setPage(page-1);
      updateNews();
    }
    
    const handleNextClick=async()=>{
      setPage(page+1);
      updateNews();
    }

    const fetchMoreData = async() => {
      setPage(page+1);
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
      setLoading(true)
        let data=await fetch(url);
        let parsedData=await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    };

    return (
      <div className='container my-3'>
        {!loading && <div className="container border border-dark bg-dark" style={{margin:'70px 0px 0px 0px'}}>
          <h1 className="text-center my-3" style={{color:'white'}}>{`${props.category.toUpperCase()}`}</h1>
        </div>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={articles.length<totalResults && <Spinner/>}
        >
          <div className="container">
          <div className="row">
          {articles.map((element,index)=>{
            return <div className="col-md-4" key={index}>
                  <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage!=null?element.urlToImage:"https://i.pinimg.com/originals/11/b6/76/11b6769c8f2ea91b25fa0bb10bcaf4ab.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
              </div>
            })}
          </div>
            </div>
            </InfiniteScroll> 
      </div>
    )
}

News.defaultProps={
  country:'in',
  pageSize:8,
  category:'general',
}

News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string
}

export default News