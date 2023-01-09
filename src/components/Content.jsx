import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../pages/NotFound.jsx';
import Login from '../pages/Login.jsx';
import Hamburguer from '../pages/Hamburguer.jsx';
import Pizza from '../pages/Pizza.jsx';
import Drink from '../pages/Drinks.jsx';
import Carrinho from '../pages/Carrinho.jsx';
import Sandwiches from '../data/sandwiches';
import Pizzas from '../data/pizzas.js';
import '../App.css'
import Drinks from '../data/drinks.js';
import { setItem, getItem } from '../services/LocalStorageFunctions.jsx';


class Content extends React.Component {
  state = {
    product: '',
    cartCounter: 0,
    cartTotal: 0,
    itemPrice: 0,
    cartItem:[],
    compras:[],
  }

/*   componentDidMount(){
    const itens = getItem('compras');
     this.setState({
      compras:itens,
      cartCounter: getItem('compras').length,
      cartTotal:getItem('compras').reduce((acc,curr)=>acc +curr.price, 0)
    })
  } */

  handleChange= ({target}) =>{
    this.setState({
     product: target.value,
    })
   }

   addToCart = (preco, nome, img, ingredientes)=> {
    const {cartItem} = this.state;
    
    const obj =  {
      name: nome,
      img: img,
      ingredients: ingredientes,
      price: preco,
    }

    Sandwiches.map((sandwich)=> (
      sandwich.name === nome &&
      this.setState({
        cartItem: [...cartItem, {
          name: nome,
          img: img,
          ingredients: ingredientes,
          price: preco,
        }]
      },  setItem('compras', [...cartItem,obj]))
    ))

    Pizzas.map((pizza)=> (
      pizza.name === nome &&
      this.setState({
        cartItem: [...cartItem, {
          name: nome,
          img: img,
          ingredients: ingredientes,
          price: preco,
        }]
      },  setItem('compras', [...cartItem,obj]))
    ))

    Drinks.map((drink)=> (
      drink.name === nome &&
      this.setState({
        cartItem: [...cartItem, {
          name: nome,
          img: img,
          price: preco,
        }]
      },  setItem('compras', [...cartItem,obj]))
    ))
  
    this.setState ({
      compras: getItem('compras'),
      cartCounter: getItem('compras').length,
      cartTotal: getItem('compras').reduce((acc, curr) => acc + curr.price, 0),
    })  
  }
   removeToCart=(obj)=> {
    const {cartItem} = this.state
    const primeProduct = cartItem.find((e) => e.name === obj.name )
    const filter = cartItem.filter((e)=> e !== primeProduct)
    setItem('compras',filter)
    this.setState({
      cartItem: filter,
      cartCounter:filter.length,
      compras: getItem('compras'),
      cartTotal: getItem('compras').reduce((acc, curr) => acc + curr.price, 0)
    })
   }

   removeFromCartList=(obj)=>{
    const {cartItem} = this.state
    const primeProduct = cartItem.find((e) => e.name === obj.name )
    const filter = cartItem.filter((e)=> e !== primeProduct)
    setItem('compras',filter)
    this.setState({
      cartItem: filter,
      cartCounter:filter.length,
      compras: getItem('compras'),
      cartTotal: getItem('compras').reduce((acc, curr) => acc + curr.price, 0)
    })
   }

   removeAll = () => {
    localStorage.clear();
    this.setState({
      compras:[],
      cartCounter:0,
      cartTotal:0,
    })
  }
  
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/hamburguer"
          render={(props)=><Hamburguer {...props}
          handleChange={this.handleChange}
          addToCart={this.addToCart}
          removeToCart={this.removeToCart}
          product={this.state.product}
          cartCounter={this.state.cartCounter}
          cartTotal={this.state.cartTotal}
          />}  />
          <Route exact path="/pizza" 
          render={(props)=><Pizza {...props}
          handleChange={this.handleChange}
          addToCart={this.addToCart}
          removeToCart={this.removeToCart}
          product={this.state.product}
          cartCounter={this.state.cartCounter}
          cartTotal={this.state.cartTotal}
          />} />
          <Route exact path="/drink"
          render={(props)=><Drink {...props}
          handleChange={this.handleChange}
          addToCart={this.addToCart}
          removeToCart={this.removeToCart}
          product={this.state.product}
          cartCounter={this.state.cartCounter}
          cartTotal={this.state.cartTotal}
          />} />
          <Route exact path="/carrinho"
          render={(props)=><Carrinho {...props}
          
          removeFromCartList={this.removeFromCartList}
          cartCounter={this.state.cartCounter}
          cartTotal={this.state.cartTotal}
          compras={this.state.compras}
          removeAll={this.removeAll}
          />} />
          <Route path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default Content;
