import axios from 'axios';
import React , {Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { 
  Header , Search , Home , ProductDetail ,  Login ,  CreateAccount  , 
  Cart , CategoryItems  , Order , CreatePost ,  
  ErrorPage , SuccessPage , AdminButton
} from './component/path.js';

import Payment from './component/payments/Payment.js';
import './App.css';
import { handleColor } from './component/function.js'

const headers = {
  Authorization: `Token ${localStorage.getItem('auth_token')}`, 
};

class App extends Component {
  
  constructor(props){
    super(props)
    this.clickProfileRef = React.createRef(); //useRef
    this.state = {
      url:"http://localhost:8000/",
      all_product :[], 
      all_category: [] , 
      best_discount: [] , 
      last_four_produit: [] ,
      deal_of_day: [] ,
      last_produit_after_four: [] ,
      top_4_products_has_liked:[], 
      detail_slug:"" , 
      language: localStorage.getItem('language') || "english" , 
      bg_black: localStorage.getItem("bg_color") !== null ,   
      cart_length:0 ,
      isAdmin:false ,
    };
  }

  cart_length_to_zero =()=>{
    this.setState( prevState => ({...prevState , cart_length : 0 }) );
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

  handleLanguage=()=>{
    if (localStorage.getItem('language') === "english" || !localStorage.getItem('language')){
      localStorage.setItem('language',"arabic")
      this.setState(prevState=>({...prevState , language : "arabic"}))
    }else{
      localStorage.setItem('language',"english")
      this.setState(prevState=>({...prevState , language : "english"}))
    }
    window.location.reload()
  }

  async componentDidMount(){
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`, 
    };
    
    (localStorage.bg_color === undefined||localStorage.bg_color === null||localStorage.bg_color === "white")?
    document.body.style.backgroundColor = "white" : 
    document.body.style.backgroundColor = "black" ;
    
    try {
      const response = await axios.get(`${this.state.url}produit_api/` , {headers});
      const responseData = response.data;
      this.setState({
        all_product: responseData.all_product || [],
        all_category : responseData.all_category || [],
        best_discount: responseData.best_discount || [],
        last_four_produit: responseData.last_four_produit || [],
        deal_of_day: responseData.deal_of_day || [],
        last_produit_after_four: responseData.last_produit_after_four || [],
        top_4_products_has_liked: responseData.top_4_products_has_liked || [],
      });
    }catch (error) {
      console.log(error);
    };

    this.cart_length(); 
    this.is_admin();
  }
  
  
  cart_length = async () =>{
    try{
      const response = await axios.get(`${this.state.url}cart/length/` , {withCredentials: true});
      this.setState( prevState => ({...prevState , cart_length : response.data.length }) )
    }catch(err){
      alert(err)
    }
  }

   async is_admin(){
     try{
       const response = await axios.get(`${this.state.url}test_api/check_if_admin/` , {headers});
       this.setState( prevState => ({...prevState , isAdmin : response.data.is_admin}));
      }catch(err){
        this.setState( prevState => ({...prevState , isAdmin:false}));
     } 
   }

  async testingApi(){
    try {
      const response = await axios.get(`http://localhost:8000/test_api/`,{headers});
      console.log(response.data);
      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }
  
  render(){
  return(
  <div style={handleColor(localStorage.bg_color)} >  
    <Router>
        <Header  
            url={this.state.url}
            language={this.state.language}
            changeColor={this.changeColor} 
            color={this.color}
            clickProfile={this.clickProfile}
            clickProfileRef={this.clickProfileRef}
            all_category={this.state.all_category}
            cart_length={this.state.cart_length}
            removeProfile={this.removeProfile}
            handleLanguage={this.handleLanguage}
        />

        <AdminButton 
          language={this.state.language}
          isAdmin={this.state.isAdmin} 
          testingApi={this.testingApi} 
        />
        
        <main id="main" dir={(this.state.language==="english")?"ltr":"rtl"} onClick={this.removeProfile}>
            <Routes>
                <Route path='/' element={<Home 
                    language={this.state.language}
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

             

                <Route path='/create_account' element={<CreateAccount 
                    url={this.state.url} 
                    language={this.state.language}
                  />} 
                />    
                
                <Route path='/login' element={<Login 
                    url={this.state.url}
                    language={this.state.language}
                  />} 
                />    
                
                <Route path="/product_detail/:slug" element={<ProductDetail 
                    url={this.state.url}
                    language={this.state.language}
                    cart_length_add_1={this.cart_length_add_1} 
                  />} 
                />
                
                <Route path='/cart' element={<Cart 
                    url={this.state.url}
                    language={this.state.language}
                    cart_products={this.state.cart_products}
                    cart_length_remove_1={this.cart_length_remove_1}
                  />} 
                />   

                <Route path='/create_post' element={<CreatePost 
                    url={this.state.url} 
                    language={this.state.language}
                    all_category={this.state.all_category}
                  />} 
                />    
                
                <Route path='/success_page' element={<SuccessPage
                    url={this.state.url} 
                    language={this.state.language}
                  />}
                />
                <Route path='/error_page' element={<ErrorPage
                  language={this.state.language}
                  />} 
                /> 
                <Route path='/order' element={<Order 
                    url={this.state.url} 
                    language={this.state.language}
                    cart_length_to_zero={this.cart_length_to_zero}
                  />} 
                />
                <Route path='/payment' element={<Payment
                    url={this.state.url} 
                    language={this.state.language}
                    orderLastItems={this.state.orderLastItems}
                    totalPrice={this.state.totalPrice}
                  />} 
                /> 

                <Route path='/search' element={<Search 
                    url={this.state.url} 
                    language={this.state.language}
                    />} 
                />

                {
                  this.state.all_category.map(i=><Route key={i.id} path={i.slug} element={<CategoryItems 
                    url={this.state.url} 
                    language={this.state.language}
                    name={i.name} 
                    slug={i.slug} 
                  />
                  } />)
                }
            </Routes>  
         </main>
        
      </Router>
    </div> 
    )
  }
}

export default App;