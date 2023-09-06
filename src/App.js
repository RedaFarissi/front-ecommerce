import axios from 'axios';
import React , {Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { 
  Header , Home , ProductDetail ,  Login ,  CreateAccount  , 
  Cart , CategoryItems  , Order , CreatePost , PayPalPayment , ErrorPage , SuccessPage
} from './component/path.js';
import './App.css';
import { handleColor } from './component/function.js'


class App extends Component {
  constructor(props){
    super(props)
    this.clickProfileRef = React.createRef(); //useRef
    this.state = {
      url:"http://localhost:8000/",
      all_product :[], 
      all_category: [] , 
      category_first_name: "" , 
      best_discount: [] , 
      last_four_produit: [] ,
      deal_of_day: [] ,
      last_produit_after_four: [] ,
      top_4_products_has_liked:[], 
      detail_slug:"" , 
      language: "arabic" , 
      bg_black: localStorage.getItem("bg_color") !== null ,   
      cart_length:0 ,
    }
  }

  
  cart_length = async () =>{
      try{
        const response = await axios.get(`${this.state.url}cart/length/` , {withCredentials: true});
        this.setState( prevState => ({...prevState , cart_length : response.data.length }) )
      }catch(err){
        alert(err)
      }
  }
  
  cart_length_remove_1 =()=>{
    this.setState( prevState => ({...prevState , cart_length : prevState.cart_length - 1}) )
  }

  cart_length_add_1 =()=>{
    this.setState( prevState => ({...prevState , cart_length : prevState.cart_length + 1}) )
  }
  
  changeColor = (event) =>{
    this.setState( prevState => ({...prevState , bg_color : true }) );
    if (localStorage.bg_color === "black" || localStorage.bg_color === null) {
      localStorage.setItem("bg_color","white")
      window.document.body.style.backgroundColor = "white"
    }else{
      localStorage.setItem("bg_color","black")
      window.document.body.style.backgroundColor = "black"
    }
    event.stopPropagation();
  }

  clickProfile =(event)=>{
    const display = getComputedStyle(this.clickProfileRef.current).getPropertyValue('display');
    //check if profile is vissible or not , and save reverse result
    (display==="none")?
    this.clickProfileRef.current.style.display = "block":
    this.clickProfileRef.current.style.display = "none";
    event.stopPropagation()
   
  }


  removeProfile=(event)=>{
    this.clickProfileRef.current.style.display = "none";
    event.stopPropagation()
  }

  async componentDidMount(){
    
    (localStorage.bg_color === undefined||localStorage.bg_color === null||localStorage.bg_color === "white")?
    document.body.style.backgroundColor = "white" : document.body.style.backgroundColor = "black" 
    
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`, 
    };

    try {
       const response = await axios.get(`${this.state.url}produit_api/` , {headers});
       const responseData = response.data;
       this.setState({
         all_product: responseData.all_product || [],
         all_category : responseData.all_category || [],
         category_first_name: responseData.all_category[0].name ,
         best_discount: responseData.best_discount || [],
         last_four_produit: responseData.last_four_produit || [],
         deal_of_day: responseData.deal_of_day || [],
         last_produit_after_four: responseData.last_produit_after_four || [],
         top_4_products_has_liked: responseData.top_4_products_has_liked || [],
       });
     } catch (error) {
       console.log(error);
     }
    this.cart_length()
  }
  
  render(){
    return(
    <div onLoad={this.loading} style={handleColor(localStorage.bg_color)} >  
    <Router>
        <Header  
            changeColor={this.changeColor} 
            color={this.color}
            language={this.state.language}
            clickProfile={this.clickProfile}
            removeProfile={this.removeProfile}
            clickProfileRef={this.clickProfileRef}
            all_category={this.state.all_category}
            cart_length={this.state.cart_length}
        />
        <main  onClick={this.removeProfile}>
            <Routes>     
                       
                <Route path='/' element={<Home 
                    url={this.state.url}
                    all_product={this.state.all_product}
                    best_discount={this.state.best_discount} 
                    last_four_produit={this.state.last_four_produit}
                    top_4_products_has_liked={this.state.top_4_products_has_liked}
                    deal_of_day={this.state.deal_of_day}
                    last_produit_after_four={this.state.last_produit_after_four}
                    bg_black={this.state.bg_black}
                    changeColor={this.changeColor}
                  />} 
                />

                <Route path='/create_account' element={<CreateAccount url={this.state.url} />} 
                />    
                
                <Route path='/login' element={<Login url={this.state.url} />} />    
                
                <Route path="/product_detail/:slug" element={<ProductDetail 
                    url={this.state.url}
                    cart_length_add_1={this.cart_length_add_1} 
                  />} 
                />
                
                
                <Route path='/cart' element={<Cart 
                    url={this.state.url}
                    cart_products={this.state.cart_products}
                    cart_length_remove_1={this.cart_length_remove_1}
                  />} 
                />   

                <Route path='/create_post' element={<CreatePost 
                    url={this.state.url} 
                    all_category={this.state.all_category}
                    category_first_name={this.state.category_first_name}
                  />} 
                />    
                
                <Route path='/payment' element={<PayPalPayment
                    url={this.state.url} 
                  />} 
                /> 
                <Route path='/success_page' element={<SuccessPage />} /> 
                <Route path='/error_page' element={<ErrorPage />} /> 
                

                <Route path='/order' element={<Order 
                    url={this.state.url} 
                  />} 
                /> 

                {this.state.all_category.map(i=><Route path={i.slug} element={<CategoryItems url={this.state.url} name={i.name} slug={i.slug} />} />)}
            </Routes>  
        </main>
      </Router>
    </div> 
    )
  }
}

export default App;