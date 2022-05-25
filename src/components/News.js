import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general',
  }
  
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  constructor(props){
        super(props);
        this.state={
            articles:[],
            loading: false,
            page:1,
            totalResults:0
        }
        let a=this.props.category[0];
        let b=this.props.category;
        document.title=a.toUpperCase()+b.slice(1);
    }

    async componentDidMount(){
            this.updateNews();
    }
    async updateNews(){
      this.props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data=await fetch(url);
      this.props.setProgress(50);
      let parsedData=await data.json();
      this.props.setProgress(70);
        this.setState({
            articles:parsedData.articles,
            loading:false,
            totalResults:parsedData.totalResults
        })
        this.props.setProgress(100);
    }
    handlePrevClick=async()=>{
      this.setState({page:this.state.page-1});
      this.updateNews();
    }
    
    handleNextClick=async()=>{
      this.setState({page:this.state.page+1});
      this.updateNews();
    }

    fetchMoreData = async() => {
      this.setState({page:this.state.page+1});
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            loading:false,
            totalResults:parsedData.totalResults
        })
    };

  render() {
    return (
      <div className='container my-3'>
        {!this.state.loading && <div className="container border border-dark bg-dark">
          <h1 className="text-center my-3" style={{color:'white'}}>{`${this.props.category.toUpperCase()}`}</h1>
        </div>}
          {/* {this.state.loading && <Spinner/>} */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={this.state.articles.length<this.state.totalResults && <Spinner/>}
        >
          <div className="container">
          <div className="row">
          {this.state.articles.map((element,index)=>{
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
}

export default News